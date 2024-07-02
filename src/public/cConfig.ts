/**
 * @Owners cmZhou
 * @Title 通用常量
 */
// eslint-disable-next-line no-restricted-imports
// import config from '../../_config';

const common = {
    REQUEST_URL_PREFIX: '',
    CDN_DOMAIN: 'https://stantic.ifengqun.com',
    OSS_REGION: 'oss-cn-shenzhen',
    OSS_CDN_BUCKET: 'ifengqun',
    ASSETS_PATH: '/assets',
    BUNDLE_PATH: '/assets/bundle',
    JS_BUNDLE_PATH: '/assets/bundle/js',
    ROOT_DOM_ID: 'caibird-react-root-container',
}

const PROJECT_NAME = 'fq-service-weapp';
// const PROJECT_TITLE = '服务商小程序';
// const props = {
//     isTaro: true,
//     noWebpack: true,
//     port: 5053,
// };

  // 当前接口测试环境
  



const CDN_JS_BUNDLE_DIR = `${PROJECT_NAME}/jsbundle`;
const CDN_JS_BUNDLE_PATH = `${common.CDN_DOMAIN}/${CDN_JS_BUNDLE_DIR}`;

namespace _cConfig {
    export const PUBLIC_JS_BUNDLE_PATH = process.env.NODE_ENV === 'production' ?
        CDN_JS_BUNDLE_PATH :
        `${common.REQUEST_URL_PREFIX}${common.JS_BUNDLE_PATH}`;

    // 生产环境 'https://prod.ifengqun.com'
    // 测试环境 'https://test.ifengqun.com'
    export const DOMAIN = process.env.NODE_ENV === 'production' ? 'https://newprod.ifengqun.com' :
    process.env.NODE_ENV === 'development' ? 'https://new-dev.ifengqun.com' : 'https://new-test.ifengqun.com';
    // 线上本地调试开关注释
    // export const DOMAIN = Caibird.env.IS_PRODUCTION ? 'https://newprod.ifengqun.com' :
    //     Caibird.env.IS_DEV_TEST ? 'https://newprod.ifengqun.com' : 'https://newprod.ifengqun.com';

    export const ossConfig = {
        host: 'https://stantic.ifengqun.com',
        dir: 'fq-shop/upload/', // 图片存储地址
    };

    // mock 地址
    export const apiMockInfo = {
        baseUrl: 'https://mock.apipark.cn/m1/4715498-4367780-default',
    };

    export const API_ENV = 'apiEnv';
}

export const cConfig: Service.dp.DeepReadonly<typeof _cConfig> = {
    ..._cConfig,
};
