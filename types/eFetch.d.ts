/**
 * @Owners penghaoyang
 * @Title 通信常用枚举
 */
declare namespace Service.eFetch {
    /**
     * 请求的场景环境
     * @desc 后端根据场景，会对返回的数据做筛选
     */
    const enum Scene {
        DEFAULT = 0, // 普通场景
        GIFT = 1, // 送礼场景
        GROUP_PUCHASE = 4, // 团购场景
        CONTENT = 5, // 内容场景
        ORIGIN = 8, // 溯源商品场景
        SHOPFEED = 9, // 商家号场景
    }

    const enum JsonErrorCode {
        IdentityChange = 1101, // 身份变更
        Unauthorized = 1102, // 非法访问
    }

    /**
     * 后端接口响应状态码
     */
    const enum StatusCode {
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

    const enum BussinessCode {
        /** 订单不存在 */
        ORDER_NOT_EXISTED = '20000',
        /** 订单状态异常 */
        ORDER_STATUS_ERROR = '20001',
        /** 订单地址有不支持商品配送区域 */
        ORDER_ADDRESS_ERROR = '20003',
        /** 组合商品不支持送礼订单 */
        GROUP_ISNOT_GIFT = '20004',
        /** 订单不是白名单用户，测试环境不支持下单 */
        USER_NOT_INVALID = '20004',
        /** 用户异常 */
        USER_NOT_MATCH = '20004',
        /** 跨境订单必须身份认证! */
        ORDER_KJ_IDCARD_NO_EXIST = '20005',
        /** 流量控制 */
        FLOWS_CONTROL = '20006',
        /** 店铺已打烊 */
        SHOP_CLOSE_ERROR = '20006',
        /** 可用积分不足 */
        INTEGRAL_INSUFFICIENT_ERROR = '20007',
        /** 积分抵扣规则有变动，请重新下单 */
        INTEGRAL_RULE_CHANGE_ERROR = '20008',
        /** 当前有活动结束或商品售罄/下架，请重新确认商品！ */
        GOODS_STATUS_ERROR = '20010',
        /** 您是本店助理无法下单，请联系店长解绑助理身份后即可下单 */
        SHOP_CLERK_PAY_ORDER_ERROR = '20011',
        /** 需解除店长助理身份才能开通店铺 */
        SHOP_CLERK_OPEN_SHOP_ERROR = '20012',

        /** 获取ComponentVerifyTicket失败 */
        // GET_COMPONENT_VERIFY_TICKET_ERROR = '20000',
        /** 获取ComponentAccessToken失败 */
        // GET_COMPONENT_ACCESS_TOKEN_ERROR = '20001',
        /** 刷新ComponentAccessToken失败 */
        // REFRESH_COMPONENT_ACCESS_TOKEN_ERROR = '20002',
        /** 获取PreAuthCode失败 */
        // GET_PRE_AUTH_CODE_ERROR = '20003',
        /** 刷新PreAuthCode失败 */
        // REFRESH_PRE_AUTH_CODE_ERROR = '20004',
        /** 绑定小程序授权信息到店铺失败 */
        // BIND_COMPONENT_ERROR = '20005',
        /** 刷新店铺的accessToken失败 */
        // REFRESH_AUTHORIZER_ACCESS_TOKEN_ERROR = '20006',
        /** 快速创建小程序失败 */
        // FAST_REGISTER_WEBAPP_ERROR = '20007',
        /** 获取店铺小程序码失败 */
        // GET_WEBAPP_CODE_ERROR = '20008',
        /** 获取代码模板列表失败 */
        // GET_CODE_TEMPLATE_LIST_ERROR = '20009',
        /** 刷新店铺助手的accessToken失败 */
        // REFRESH_ASSISTANT_ACCESS_TOKEN_ERROR = '20010',

        /** 店铺已关店,停止营业 */
        SHOP_STATE_ERROR = '20098',
        /** 创建店铺失败, 请重试 */
        OPEN_SHOP_ERROR = '20099',
        /** 店铺不存在 */
        SHOP_NOT_EXISTED_ERROR = '20100',
        /** 商家店铺校验失败 */
        SHOP_DEALER_NOT_MATCH_ERROR = '20101',
        /** 商家信息错误 */
        DEALER_ERROR = '20102',
        /** 该店铺名称已被占用,请更换店铺名称 */
        SHOP_NAME_EXISTED_ERROR = '20103',
        /** 您的店铺已入驻,请勿重复申请 */
        SHOP_NUM_LIMITED_ERROR = '20104',
        /** 认证中/认证通过的企业信息不允许修改 */
        SHOP_COMPANY_INFO_STATE_ERROR = '20105',
        /** 认证中/认证通过的经营信息不允许修改 */
        SHOP_BUSINESS_INFO_STATE_ERROR = '20106',
        /** 请填写业务办理授权函 */
        SHOP_BUSINESS_AUTHORIZATION_LETTER = '201067',
        /** 主体类型为企业时，需要填写身份居住地 */
        SHOP_BUSINESS_AID_CARD_ADDRESS_LETTER = '201068',
        /** 店铺未通过认证 */
        SHOP_AUTH_STATE_ERROR = '20107',
        /** 店铺名称包含非法字符 */
        SHOP_NAME_ILLEGAL_ERROR = '20108',
        /** 店铺简介包含非法字符 */
        SHOP_BRIEF_ILLEGAL_ERROR = '20109',
        /** 端口号错误 */
        SHOP_INVITE_CODE_ERROR = '20110',
        /** 有未使用的端口号 */
        INVITE_CODE_UNUSED_ERROR = '20111',
        /** 店铺审核中, 暂不能正常营业 */
        SHOP_AUDIT_STATE_ERROR = '20112',
        /** 店铺类型错误 */
        SHOP_TYPE_ERROR = '20113',
        /** 店铺获取锁失败，重入队列 */
        SHOP_GETLOCK_ERROR = '20114',
        /** 营销公司不存在 */
        OPEN_SHOP_MARKETING_ERROR = '20115',
        /** 营销公司未开户 */
        OPEN_SHOP_MARKETING_STATUS_ERROR = '20116',

        /** 店铺商品查询中 */
        SHOP_GOODS_CACHE_BUILDING_ERROR = '20200',
        /** 当前有商品已下架/售罄,请重新确认商品 */
        SHOP_GOODS_ERRO = '20201',
        /** 商品已下架,无法查看 */
        SHOP_GOODS_OFF_SHELF = '20202',
        /** 该手机号不在店铺白名单中，请联系远方好物工作人员! */
        NOT_IN_SHOP_WHITE_LIST = '20203',
        /** 店铺名或简介包含敏感词汇! */
        CONTAINS_SENSITIVE_WORD = '20204',
        /** 兑换失败, 额度不足 */
        EXCHANGE_INVITE_CODE_SHORTAGE_ERROR = '20205',
        /** 兑换失败, 请重试 */
        EXCHANGE_INVITE_CODE_ERROR = '20206',
        /** 端口号不存在 */
        INVITE_CODE_ID_NOT_EXIST = '20207',
        /** 无有效模板 */
        DECORATE_TEMPLATE_ERROR = '20208',
        /** 无有效开店活动 */
        QUERY_ACTIVITY_FAILED = '20209',
        /** 没有匹配的开店活动 */
        NO_SUITABLE_ACTIVITY = '20210',

        /** 店铺未缴纳保证金,暂时无法正常经营 */
        SHOP_DEPOSIT_UNPAID_ERROR = '20222',
        /** 店铺暂时未能正常经营,请联系店主 */
        DEPOSIT_UNPAID_ERROR = '20223',
        /** 店铺申请关店退保中,暂时无法正常经营 */
        SHOP_DEPOSIT_REFUND_ERROR = '20224',
        /** 店铺已暂停营业 */
        DEPOSIT_REFUND_ERROR = '20225',
        /** 无法再次开店 */
        OPEN_SHOP_CLOSE_ERROR = '20226',
        /** 抱歉,您的账户已经开过店了,无法再次开店 */
        OPEN_SHOP_REPEAT_ERROR = '20227',
        /** 您已创建店铺,请继续进行店铺实名认证 */
        OPEN_SHOP_GO_AUTH_ERROR = '20228',
        /** 您已创建店铺,去缴纳保证金 */
        OPEN_SHOP_DEPOSIT_ERROR = '20229',

        /** 用户信息错误 */
        // USER_ERROR = '20102',
        /** 端口号已使用过，请重新更换 */
        // SHOP_USED_CODE_ERROR = '20208',
        /** 端口号已过期，请重新更换 */
        // SHOP_EXPIRE_CODE_ERROR = '20207',
        /** 端口号没有绑定等级 */
        // SHOP_GRADE_CODE_ERROR = '20209',

        /** 微信回滚版本查询有误 */
        REVERT_VERSION_ERROR = '30050',
        /** 微信灰色发布查询错误,请查询微信文档 */
        REVERT_VERSION_ERROR_0 = '30051',
        /** 系统错误 */
        REVERT_VERSION_ERROR_1 = '30052',
        /** 现网已经在灰度发布，不能进行版本回退 */
        REVERT_VERSION_ERROR_2 = '30053',
        /**
         * 该版本不能回退，可能的原因：
         * 1:无上一个线上版用于回退
         * 2:此版本为已回退版本，不能回退
         * 3:此版本为回退功能上线之前的版本，不能回退
         */
        REVERT_VERSION_ERROR_3 = '30054',
        /** 回滚其他错误,请查看微信文档 */
        REVERT_VERSION_ERROR_4 = '30055',
        /** 店铺已认证成功，不能驳回 */
        SHOP_AUDIT_STATE_SUCCESS = '30056',
        /** 微信灰色发布错误,请查询微信文档 */
        REVERT_VERSION_ERROR_5 = '30057',
        /** 请填写身份证有效期 */
        IDCARDVALIDTIME_NOTNULL = '30059',
        /** 该店铺结算卡未绑定 */
        SHOP_BLAK_NOTEXISTED_ERROR = '30060',
        /** 结算卡信息不能为空 */
        SHOP_BLAK_INFO_NOT_NULL = '30061',
    }
}
