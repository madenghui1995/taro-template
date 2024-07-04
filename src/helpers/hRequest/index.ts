/**
 * @Owners jiangzm
 * @Title hService helper
 */

import Taro from '@tarojs/taro';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import MD5 from 'crypto-js/md5';
import Pkcs7 from 'crypto-js/pad-pkcs7';
import { cConfig, cSubRoutes } from '../../consts/';
import { hGlobal, hNavigator } from '../../helpers/index';
import { FQHttpEnums } from '@/enums';
// import { uUuid } from '../../utils/uUuid';


import { uAsync } from '../../utils/uAsync';

import { HService as base } from './base';
import { HttpApis, httpServices as services } from '@/helpers/hRequest/services';

import StatusCode = FQHttpEnums.BackEndStatusCode;
import { hUser } from '../hUser';

type Checker = (
    data: Service.dRequest.ResponseData,
    ctx?: Service.dRequest.Context
) => void;

type OpenType = 'back' | 'launch' | 'push' | 'reload' | 'replace';
type RouteChange = { type: OpenType, path: string, params?: Service.dp.Obj};
type PagePreLoad = (route: RouteChange) => void;

class HService extends base<HttpApis> {
    public static readonly instance = new HService();
    private constructor() {
        super({
            services,
            timeout: 20000,
            baseUrl: cConfig.DOMAIN,
        });
    }

    private readonly checkLogin = uAsync.asyncDebounce(() => hUser.login());

    private readonly apiCheckers: Record<string, Checker> = {

    };

    private readonly pagePreloads: Record<string, PagePreLoad> = {
        // [cSubRoutes.GOODS_DETAIL_PATH]: route => {
        //     if (route.params) {
        //         const shopId = hGlobal.shopId;
        //         Taro.preload('goods.detail', this.api.goods.detail({
        //             shopId: Number(shopId || route.params.shopId),
        //             spuId: Number(route.params.spuId),
        //         }));
        //         console.log('set preload', route);
        //     }
        // },
    };

    private readonly reportPerf = (
        // ctx: dRequest.Context,
        // error?: Service.dp.Obj,
    ) => {
        try {
            // const response = ctx?.response;
            // const data = response?.data as dRequest.ResponseData;
            // const state = ctx?.state;

            // // 接口性能上报
            // if (state && state.monitorId) {
            //     if (ctx.timing.rtt > 30000) {
            //         hLogger.error(`${state.monitorId}, time: ${ctx.timing.rtt}ms`, ctx.state?.done, ctx.timing);
            //         return;
            //     }

            //     const performance = {
            //         wxdata_perf_monitor_id: state.monitorId,
            //         wxdata_perf_monitor_level: 0,
            //         wxdata_perf_error_code: Number(response?.errno || data?.code || error?.errno || 0),
            //         wxdata_perf_error_msg: String(response?.errMsg || data?.msg || error?.errMsg || ''),
            //         wxdata_perf_cost_time: ctx.timing.rtt || 0,
            //     };

            //     hReport.reportEvent(cReportEvents.PERF_BASIC_MONITOR, performance);
            //     // hLogger.debug(state.monitorId, ctx.timing.rtt, ctx.timing.profile?.rtt);

            //     if (state.moduleId) {
            //         hReport.reportEvent(cReportEvents.PERF_MODULE_MONITOR, {
            //             ...performance,
            //             wxdata_perf_module_id: String(state.moduleId),
            //         });
            //     } else if (state.serviceId) {
            //         // const pageProps = hReport.getPageProps();
            //         hReport.reportEvent(cReportEvents.PERF_SERVICE_MONITOR, {
            //             ...performance,
            //             wxdata_perf_monitor_level: 1,
            //             wxdata_perf_service_id: String(state.serviceId),
            //             wxdata_perf_step_type: 0,
            //             wxdata_perf_step_id: String(state.serviceStepId),
            //         });
            //     }
            // }

            // // 接口异常上报
            // if (error || !ctx.state?.success) {
            //     const status = response?.statusCode || 0;
            //     const errno = `${error?.errMsg || response?.errMsg}[${error?.errno || response?.errno}]`;
            //     const errCode = data?.code ? `${data.msg}[${data.code}]` : '';
            //     hLogger.warn(`${ctx.path}, status:${status}, ${errno} ${errCode}`, {
            //         request: ctx.request.data,
            //         response: ctx.response?.data,
            //         traceId: ctx.options?.traceId,
            //         // timing: ctx.timing,
            //         rtt: ctx.timing?.rtt,
            //     }, error || '');
            // }
        } catch (ex) {
            // hLogger.error('hService.reportPerf', ex);
        }
    };

    protected readonly onRequest = (
        req: Service.dRequest.RawRequest,
        ctx: Service.dRequest.Context,
    ) => {
        const headers = req.headers || {};
        try {
            const { openId, apiEnv } = hGlobal;
            const { platform, enableDebug } = Taro.getSystemInfoSync();
            const { miniProgram: mini } = Taro.getAccountInfoSync();
            const { version: extVersion } = Taro.getExtConfigSync?.() || {};

            if (process.env.NODE_ENV === 'production') {
                // if (apiEnv && /^test\d?/.test(apiEnv)) {
                //     headers.grayReleaseTag = apiEnv;
                // }
            } else if (
                enableDebug ?
                apiEnv === 'gray' :
                mini.envVersion === 'trial'
            ) {
                headers.grayReleaseTag = 'gray';
            }

            // headers.uuid = uuid || '-';
            // headers.openId = openId || '-';
            // headers.platform = platform || '-';
            // headers.envVersion = mini.envVersion || '-';
            // headers.appVersion = mini.version || String(extVersion || '-');
            // headers.fqTraceId = ctx.options?.traceId || uUuid.newUUID();

            // headers.shopId = String(hGlobal.shopId || '-');

            // if (hRedux.State.root.inviteUserId) {
            //     headers.inviterUserId = String(hRedux.State.root.inviteUserId);
            // }

            if (hGlobal.user) {
            //     headers.userId = String(hGlobal.userId);
            //     headers.isClerk = String(hGlobal.user.isClerk);
            //     headers.dealerId = String(hGlobal.userShop?.dealerId || '');
            //     headers.userType = String(hGlobal.userShop?.shopState === 3 ? 2 : 1);
                Object.assign(headers, this.cryptoToken(hGlobal.user.token));
            }
            // if (hGlobal?.visitorUser) {
            //     headers.visitorId = hGlobal.visitorUser.visitorId;
            // }
            req.headers = headers;
        } catch (ex) {
            console.log('hService.onRequest:', ex);
        }

        return req;
    };

    protected readonly onResponse = (
        res: Service.dRequest.RawResponse,
        ctx: Service.dRequest.Context,
    ) => {
        const data = res.data as Service.dRequest.ResponseData;

        // 登录成功
        if (String(data?.code) === StatusCode.SUCCESS) {
            ctx.state.success = true;
        // 没有登录
        } else if (data?.code === StatusCode.NOT_LOGIN) {
            hUser.clearCurrent();
            this.checkLogin();
        // 身份变更
        } else if (data?.code === StatusCode.IDENTITY_CHANGE) {
            // hRedux.dispatch(hRedux.action.showLoginDialog(false));
            // hUser.logout();
            // setTimeout(() => {
            //     if (hRedux.State.root.identityChangeModalShow) return;
            //     hRedux.dispatch(hRedux.action.showIdentityChangeModal(true));
            //     Taro.showModal({
            //         title: '提示',
            //         content: '检测到身份发生变化，请重新登录',
            //         showCancel: false,
            //         success: result => {
            //             if (result.confirm) {
            //                 hRedux.dispatch(hRedux.action.showIdentityChangeModal(false));
            //                 hUser.getCurrent();
            //             }
            //         },
            //     });
            // }, 2000);
        // 授权
        } else if (data?.code === StatusCode.UNAUTHORIZED) {
            if (hUser.getCurrentOrNull()) {
                // hNavigator.replace(cSubRoutes.UNAUTHORIZED);
            }
        } else {
            const checker = this.apiCheckers[ctx.path];

            if (checker) checker(data, ctx);
            else if (!ctx.options?.withRaw) {
                const defaultMsg = '请求异常，请稍后再试！';
                Taro.showToast({
                    icon: 'none',
                    duration: 2000,
                    title: data?.msg || defaultMsg,
                });
            }
        }

        // if (res.data) {
        //     this.reportPerf(ctx);
        // }

        return res;
    };

    protected readonly onError = (
        error: Service.dp.Obj,
        ctx: Service.dRequest.Context,
    ) => {

        // const data = ctx.response?.data as dRequest.ResponseData;
        // if (!data) {
        //     this.reportPerf(ctx, error);
        // }
    };

    public readonly cryptoToken = (token: string) => {
        const timestamp = Date.now();
        const nonce = MD5(Math.random().toString()).toString();
        const aeskey = MD5(timestamp + nonce).toString().substring(0, 16);
        const vtoken = AES.encrypt(Utf8.parse(token), Utf8.parse(aeskey), {
            iv: Utf8.parse('1020304050607080'),
            padding: Pkcs7,
        }).toString();

        return { nonce, timestamp, token: vtoken };
    };

    public readonly preload = (route: RouteChange) => {
        this.pagePreloads[route.path]?.(route);
    };
}

export const hRequest = HService.instance;
