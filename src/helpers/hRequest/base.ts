/**
 * @Owners jiangzm
 * @Title hService helper
 */
import Taro from '@tarojs/taro';
import { uString, uUrl, uUuid } from '@/utils/index';
import _ from 'lodash-es';

import dRequest = Service.dRequest;
import StatusCode = Service.eFetch.StatusCode;
import AnyObject = Service.dRequest.AnyObject;
import AnyFunc = Service.dRequest.AnyFunc;
import MethodType = Service.eHttp.MethodType;
import ContentType = Service.eHttp.ContentType;

type ResponseCache = {
    data: dRequest.ResponseData,
    expired: number,
};

export abstract class HService<TApis extends AnyObject<AnyObject<AnyFunc>>> {
    protected constructor(protected readonly options: {
        baseUrl: string,
        timeout?: number,
        retryTimes?: number,
        services: {
            [S in keyof TApis]: {
                [A in keyof TApis[S]]: dRequest.ApiConfig
            }
        },
    }) { }

    private readonly cacheData: Map<string, ResponseCache> = new Map();

    protected abstract readonly onRequest?: (req: dRequest.RawRequest, ctx: dRequest.Context) => dRequest.RawRequest;
    protected abstract readonly onResponse?: (res: dRequest.RawResponse, ctx: dRequest.Context) => dRequest.RawResponse;
    protected abstract readonly onError?: (error: dRequest.AnyObject<string>, ctx: dRequest.Context) => void;

    /**
     * service apis
     *
     * @example
     * hRequest.api.service.api();              // 不带参数，返回`data`数据
     * hRequest.api.service.api(true);          // 不带参数，返回原始数据
     * hRequest.api.service.api({ id });        // 带参数，返回`data`数据
     * hRequest.api.service.api({ id }, true);  // 带参数，返回原始数据
     * hRequest.api.service.api({cache: true}); // 不带参数，请求接口缓存数据
     * hRequest.api.service.api({               // `data`: 参数，`withRaw`: 原始数据
     *    data: { id },
     *    withRaw: true,
     *    timeout: 3000,
     *    retryTimes: 3,
     *    ...
     * });
     */
    public readonly api = new Proxy<Record<string, unknown>>({}, {
        get: (svcs, service: string) => svcs[service] || (
            svcs[service] = new Proxy<Record<string, unknown>>({}, {
                get: (apis, api: string) => apis[api] || (
                    apis[api] = (
                        req?: dRequest.RequestData,
                        opt?: dRequest.RequestOptions,
                    ) => this.handleApi(service, api, req, opt)
                ),
            })
        ),
    }) as dRequest.ServiceApis<TApis>;

    /**
     * handleApi
     */
    private readonly handleApi = (
        service: string,
        api: string,
        req?: dRequest.RequestData,
        opt?: dRequest.RequestOptions,
    ) => {
        let opts: dRequest.RequestOptions = { withRaw: false };

        if (!opt && typeof req === 'boolean') {
            opts.withRaw = !!req;
        } else if (req && typeof opt === 'boolean') {
            opts.withRaw = !!opt;
            opts.data = req;
        } else if (
            typeof (req as AnyObject)?.withRaw === 'boolean' ||
            typeof (req as AnyObject)?.cache === 'boolean'
        ) {
            opts = {
                ...opts,
                ...(req as dRequest.RequestOptions),
            };
        } else {
            opts.data = req;
        }

        const apiOptions = _.omit(this.options, 'services');
        const apiConfig = this.options.services[service][api];

        opts = { ...apiOptions, ...apiConfig, ...opts };

        if (!opts.traceId) {
            opts.traceId = uUuid.newUUID();
        }

        if (opts.monitor || opts.monitorId) {
            opts.monitorId = opts.monitorId || `${service}.${api}`;
        }

        const { retryTimes = 0 } = opts;
        let currentTimes = 0;

        const retry = async (): Promise<unknown> => {
            try {
                return this.execute(opts)
                    .catch(e => { throw e; });
            } catch (e: unknown) {
                if (currentTimes >= retryTimes) {
                    throw e;
                }

                currentTimes++;

                return retry();
            }
        };

        return retryTimes ? retry() : this.execute(opts);
    };

    protected readonly execute = async <T>(
        opts?: dRequest.RequestOptions,
    ): Promise<dRequest.ResponseData<T> | T> => {
        const start = Date.now();
        const {
            data,
            cache,
            withRaw,
            path = '',
            baseUrl = '',
            headers = {},
            method = 'POST',
        } = opts || {};

        const url = `${baseUrl}${path}`;
        const monitorId = opts?.monitorId || '';
        const cacheKey = uUrl.serializeUrl(method, url, data as unknown as AnyObject);

        if (cache && this.cacheData.has(cacheKey)) {
            const cacheItem = this.cacheData.get(cacheKey);
            if (cacheItem && cacheItem.expired >= Date.now()) {
                return withRaw ? cacheItem.data : (cacheItem.data.data as T);
            }
        }

        const ctx: dRequest.Context = {
            url,
            path,
            options: opts,
            request: { url, method, data, headers },
            state: {
                monitorId,
                done: false,
            },
            timing: {
                start,
                rtt: 0,
            },
        };

        // let raw: dRequest.RawResponse; // 响应内容
        // let res: dRequest.ResponseData<T>; // 接口数据

        try {
            ctx.request = this.onRequest?.(ctx.request, ctx) ?? ctx.request;
            ctx.response = await this.request(ctx.request, opts);
            ctx.timing = {
                ...ctx.timing,
                end: Date.now(),
                rtt: Date.now() - start,
                profile: ctx.response?.profile,
            };

            ctx.response = this.onResponse?.(ctx.response, ctx) ?? ctx.response;
            const res = ctx.response.data as dRequest.ResponseData<T>;

            if (cache || this.cacheData.has(cacheKey)) {
                this.cacheData.set(cacheKey, {
                    data: res,
                    expired: Date.now() + 60000,
                });
            } else {
                this.cacheData.delete(cacheKey);
            }

            if (withRaw) return res;
            else if (ctx.state.success) return res?.data;

            throw new Error(res?.msg || '请求失败');
        } catch (ex: unknown) {
            const error = ex as Record<string, string>;
            const end = ctx.timing?.end || Date.now();
            ctx.timing = { ...ctx.timing, end, rtt: end - start };

            this.onError?.(error, ctx);
            throw ex;
        } finally {
            ctx.state.done = true;
        }
    };

    protected readonly request = (
        req: dRequest.RawRequest,
        opts?: dRequest.RequestOptions,
    ): Promise<dRequest.RawResponse> => {
        const { url, method, data, contentType, headers: header = {} } = req;
        let { timeout = 20000 } = opts || {};
        const { enableChunked = false } = opts || {};

        if (!uString.equalIC(method, MethodType.GET)) {
            if (contentType === ContentType.JSON) {
                header['content-Type'] = ContentType.JSON;
            } else if (contentType === ContentType.FORM) {
                header['content-Type'] = ContentType.FORM;
            }
        }

        timeout = Math.min(timeout, 180000);
        return new Promise((resolve, reject) => {
            const task = Taro.request({
                url,
                data,
                method,
                header,
                timeout,
                enableChunked,
                success: (res) => {
                    opts?.onSuccess?.(res);
                    resolve(res);
                },
                fail: res => {
                    Taro.hideLoading();
                    opts?.onFail?.(res);
                    reject({
                        ...res,
                        errno: res.errno || 9999,
                        errMsg: res.errMsg || 'request:reject',
                    });
                },
                complete: res => {
                    clearTimeout(timeoutId);
                    opts?.onComplete?.(res);
                },
            });

            opts?.useRequestId?.(task);
            const timeoutId = setTimeout(() => {
                Taro.hideLoading();
                task?.abort();
                clearTimeout(timeoutId);
                reject({ errMsg: 'request:timeout', errno: 10000 });
            }, Number(timeout) + 200) as unknown as number;
        });
    };

    public readonly fetch = async <T>(
        method: Service.eHttp.MethodType,
        url: string,
        data?: dRequest.RequestData,
        opt: dRequest.RequestOptions = { withRaw: false },
    ): Promise<T> => {
        const res = await this.request({ method, url, data, headers: opt.headers }, opt);
        return res?.data as T;
    };

    public readonly downloadFile = (url: string, header?: Service.dp.Obj<string>): Promise<Taro.downloadFile.FileSuccessCallbackResult> => new Promise((resolve, reject) => {
        const successCode = 200;
        Taro.downloadFile({
            url,
            header: header || {},
            success: res => {
                if (res.statusCode === successCode) {
                    resolve(res);
                } else {
                    reject(res);
                }
            },
            fail: (err: unknown) => {
                reject(err);
            },
        });
    });
}
