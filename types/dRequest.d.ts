/**
 * @Owners jiangzm
 * @Title dRequest
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Service.dRequest {
    type Overwrite<T, U> = Omit<T, keyof U> & U;

    type AnyObject<V = any> = Record<string, V>;

    type AnyFunc = (...args: any) => any;

    type NoArgsFunc = () => any;

    type HttpMethod = 'DELETE' | 'GET' | 'OPTIONS' | 'POST' | 'PUT';

    /**
     * 请求选项类型
     */
    type RequestOptions<
        TData extends AnyObject = RequestData,
        TResult extends ResponseData = ResponseData,
        TRaw extends boolean = boolean,
    > = {
        baseUrl?: string,
        path?: string,
        isMock?: boolean,
        data?: TData,
        method?: HttpMethod,
        contentType?: eHttp.ContentType,
        /** 接口60s缓存 */
        cache?: boolean,
        timeout?: number,
        withRaw?: TRaw,
        monitor?: boolean,
        monitorId?: string,
        retryTimes?: number,
        traceId?: string,
        headers?: AnyObject<string>,
        debug?: boolean,
        enableChunked?: boolean,
        onSuccess?: AnyFunc,
        onFail?: AnyFunc,
        onComplete?: AnyFunc,
        useRequestId?(data: RequestTask): RequestTask,
        /**
         * 接口可监测项
         * @example
         * monitorId: 接口名 ${controller.action}
         * monitorLevel: 重要等级 (0为普通，非0为重要，数字越大越重要）
         * moduleId: 功能/模块名
         * serviceId: 服务ID
         * stepType: 步骤类型 (0代表服务步骤，1代表服务开始，2代表服务成功结束)
         * stepId: 步骤ID
         */
        // monitor?: AnyObject,
    };

    /**
     * 接口请求内容类型
     */
    type RawRequest = {
        url: string,
        method: HttpMethod,
        data?: RequestData,
        contentType?: string,
        dataType?: string,
        headers?: Record<string, string>,
    };

    /**
     * 响应原始内容类型
     */
    type RawResponse<T = any> = {
        data: T,
        header: Record<string, string>,
        cookies: string[],
        statusCode: number,
        errMsg?: string,
        errno?: number,
        /**
         * 网络请求过程中时延信息
         */
        profile?: RequestProfile,
    };

    /**
     * 接口请求数据类型
     */
    type RequestData = AnyObject | ArrayBuffer | FormData | string;

    /**
     * 后端接口响应内容
     */
    type ResponseData<T = any> = {
        code: string,
        data: T,
        timestamp: number,
        msg?: string,
        trace?: string,
    };

    /**
     * 请求上下文
     */
    type Context = {
        url: string,
        path: string,
        request: RawRequest,
        response?: RawResponse,
        options?: RequestOptions,
        state: AnyObject,
        timing: {
            start?: number,
            end?: number,
            rtt: number,
            profile?: AnyObject,
        },
    };

    type ApiConfig<
        T1 extends RequestData = RequestData,
        T2 extends ResponseData = ResponseData,
    > = {
        baseUrl?: string,
        path: string,
        isMock?: boolean,
        method: HttpMethod,
        contentType?: eHttp.ContentType,
        timeout?: number,
        cache?: boolean,
        monitor?: boolean,
        retryTimes?: number,
        headers?: AnyObject<string>,
        useReuqest?(req: T1): T1,
        useResponse?(res: T2): T2,
    };

    type ApiConfigs<T extends string> = Record<T, ApiConfig>;

    interface ServiceApi<F extends AnyFunc> {
        (...args: Parameters<F>): Promise<ReturnType<F>>,
        (...args: [...Parameters<F>, true]): Promise<ResponseData<ReturnType<F>>>,
        (opts: RequestOptions<Parameters<F>[0], ReturnType<F>, false>): Promise<ReturnType<F>>,
        (opts: RequestOptions<Parameters<F>[0], ReturnType<F>, true>): Promise<ResponseData<ReturnType<F>>>,
    }

    type ServiceApis<T extends AnyObject<AnyObject<AnyFunc>>> = {
        [S in keyof T]: {
            [A in keyof T[S]]: T[S][A] extends AnyFunc ? ServiceApi<T[S][A]> : never;
        };
    };

    interface RequestProfile {
        /** SSL建立完成的时间,如果不是安全连接,则值为 0 */
        SSLconnectionEnd: number
        /** SSL建立连接的时间,如果不是安全连接,则值为 0 */
        SSLconnectionStart: number
        /** HTTP（TCP） 完成建立连接的时间（完成握手），如果是持久连接，则与 fetchStart 值相等。注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接完成的时间。注意这里握手结束，包括安全连接建立完成、SOCKS 授权通过 */
        connectEnd: number
        /** HTTP（TCP） 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等。注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接开始的时间 */
        connectStart: number
        /** DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等 */
        domainLookUpEnd: number
        /** DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等 */
        domainLookUpStart: number
        /** 评估当前网络下载的kbps */
        downstreamThroughputKbpsEstimate: number
        /** 评估的网络状态 unknown, offline, slow 2g, 2g, 3g, 4g, last/0, 1, 2, 3, 4, 5, 6 */
        estimate_nettype: number
        /** 组件准备好使用 HTTP 请求抓取资源的时间，这发生在检查本地缓存之前 */
        fetchStart: number
        /** 协议层根据多个请求评估当前网络的 rtt（仅供参考） */
        httpRttEstimate: number
        /** 当前请求的IP */
        peerIP: string
        /** 当前请求的端口 */
        port: number
        /** 使用协议类型，有效值：http1.1, h2, quic, unknown */
        protocol: string
        /** 收到字节数 */
        receivedBytedCount: number
        /** 最后一个 HTTP 重定向完成时的时间。有跳转且是同域名内部的重定向才算，否则值为 0 */
        redirectEnd: number
        /** 第一个 HTTP 重定向发生时的时间。有跳转且是同域名内的重定向才算，否则值为 0 */
        redirectStart: number
        /** HTTP请求读取真实文档结束的时间 */
        requestEnd: number
        /** HTTP请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存。连接错误重连时，这里显示的也是新建立连接的时间 */
        requestStart: number
        /** HTTP 响应全部接收完成的时间（获取到最后一个字节），包括从本地读取缓存 */
        responseEnd: number
        /** HTTP 开始接收响应的时间（获取到第一个字节），包括从本地读取缓存 */
        responseStart: number
        /** 当次请求连接过程中实时 rtt */
        rtt: number
        /** 发送的字节数 */
        sendBytesCount: number
        /** 是否复用连接 */
        socketReused: boolean
        /** 当前网络的实际下载kbps */
        throughputKbps: number
        /** 传输层根据多个请求评估的当前网络的 rtt（仅供参考） */
        transportRttEstimate: number
    }

    interface RequestTask {
    /** [RequestTask.abort()](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/RequestTask.abort.html)
     *
     * 需要基础库： `1.4.0`
     *
     * 在插件中使用：支持
     *
     * 中断请求任务 */
    abort(): void
}

}
