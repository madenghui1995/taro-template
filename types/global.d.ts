/// <reference types="@tarojs/taro" />
declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    /** NODE 内置环境变量, 会影响到最终构建生成产物 */
    NODE_ENV: 'development' | 'production',
    /** 当前构建的平台 */
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
    /**
     * 当前构建的小程序 appid
     * @description 若不同环境有不同的小程序，可通过在 env 文件中配置环境变量`TARO_APP_ID`来方便快速切换 appid， 而不必手动去修改 dist/project.config.json 文件
     * @see https://taro-docs.jd.com/docs/next/env-mode-config#特殊环境变量-taro_app_id
     */
    TARO_APP_ID: string
  }
}


// declare namespace Service.dp {
//     type Keys = number | string;

//     type Obj<T = unknown> = {
//         [K in Keys]: T;
//     };
// }



// declare namespace global {
//     namespace Caibird {
//         type dResTypes = {
//             [S in keyof HttpApis]: {
//                 [A in keyof HttpApis[S]]: HttpApis[S][A] extends dRequest.AnyFunc ? ReturnType<HttpApis[S][A]> : never;
//             };
//         };
//         type dReqTypes = {
//             [S in keyof HttpApis]: {
//                 [A in keyof HttpApis[S]]: HttpApis[S][A] extends dRequest.AnyFunc ? Parameters<HttpApis[S][A]>[0] : never;
//             };
//         };
//     }
// }


declare namespace WechatMiniprogram {
    interface Wx {
        /**
         * 监听路由变化
         */
        onAppRoute(callback: (route: {
            openType: 'appLaunch' | 'autoRelaunch' | 'navigateBack' | 'navigateTo' | 'switchTab',
            path: string,
            query: Record<string, string | undefined>,
            webviewId: number,
            scene: number,
        }) => void): void,

        onAppUnhang(callback: () => void): void,
    }

    interface SystemInfo {
        /**
         * 客户端平台
         *
         * 可选值：
         * - 'ios': iOS微信（包含 iPhone、iPad）;
         * - 'android': Android微信;
         * - 'windows': Windows微信;
         * - 'mac': macOS微信;
         * - 'devtools': 开发者工具
         */
        platform: 'android' | 'devtools' | 'ios' | 'mac' | 'windows',
    }
}

