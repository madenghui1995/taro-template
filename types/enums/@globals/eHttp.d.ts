/**
 * @Owners cmZhou
 * @Title http常用枚举
 */
declare namespace Service.eHttp {
    const enum StatusCode {
        Ok = 200,
        TemporarilyMoved = 302,
        NoLogin = 401,
        PermissionDenied = 403,
        NotFound = 404,
        ServerError = 500,
    }

    const enum BackEndStatusCode {
        /** 请求成功 */
        SUCCESS = '0',
        /** 远方忙碌中! */
        SYSTEM_ERROR = '05000',
        /** 系统繁忙,请稍后重试 */
        SYSTEM_BUSY = '05001',
        /** 未知错误（空指针） */
        UNKNOW_ERROR = '05004',
        /** 获取连接异常 */
        CONNECTION_LOST = '05005',
        /** 服务超时 */
        TIMEOUT = '05006',
        /** 无服务可用 */
        NO_SERVICE = '05007',
        /** 参数验证失败 */
        PARAMETER_INVALID = '05008',
        /** 重复提交 */
        REPEAT_SUBMIT = '05009',
        /** 服务禁用 */
        SERVICE_FORBBID = '05010',
        /** 需要登录 */
        NOT_LOGIN = '05011',
        /** 降级处理 */
        FLOW_DEGRADE = '05012',
        /** 未找到资源/锁超时 */
        NOT_FOUND = '05013',
        /** limit类型错误 */
        LIMITTYPE_ERROR = '05014',
        /** 服务调用被拒绝啦！ */
        SERVICE_DENIED = '05015',
        /** 服务调用失败啦！ */
        SERVICE_FAILURE = '05016',
        /** 用户身份变更! */
        IDENTITY_CHANGE = '05017',
        /** 商品已下架 */
        GOODS_STATUS_DOWN_ERROR = '05018',
        /** 商品不支持换货售后服务 */
        GOODS_STATUS_EXCHANGE_ERROR = '05019',
        /** 越权访问 */
        UNAUTHORIZED = '010000',
    }

    const enum MethodType {
        POST = 'POST',
        GET = 'GET',
        PUT = 'PUT',
        DELETE = 'DELETE',
        OPTION = 'OPTIONS',
    }
    const enum ContentDispositionType {
        Inline = 'inline',
        Attachment = 'attachment',
    }
    const enum ContentType {
        TEXT = 'text/plain;charset=utf-8',
        JSON = 'application/json',
        FORM = 'application/x-www-form-urlencoded',
        XML = 'application/xml',
        MULTIPART = 'multipart/form-data',
    }
    const enum RequestedWith {
        XMLHttpRequest = 'XMLHttpRequest',
    }
}
