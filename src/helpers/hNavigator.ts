/**
 * @Owners linrui
 * @Title navigator helper
 */
import Taro from '@tarojs/taro';
import { cIcon, cRoutes } from '@/consts/index';
import { uObject } from '@/utils';

import { tabBarConfig } from '../routerPath';

interface ParamsObject<T> {
    [key: string]: T,
}

type OpenType = 'back' | 'push' | 'reload' | 'replace';
type RouteChange = { type: OpenType, path: string, params?: Service.dp.Obj};
type RouteChangeCallback = (route: RouteChange) => void;

export abstract class HNavigatorBase {
    protected constructor(protected readonly options: {
        homePath?: string,
        loginPath?: string,
        tabPaths?: string[],
    } = {}) {
        this.HOME_PATH = options.homePath || '/';
        this.LOGIN_PATH = options.loginPath || '/';
        this.TAB_PATHS = options.tabPaths || [];
    }

    private routeChange: RouteChangeCallback | null = null;

    protected readonly HOME_PATH: string;
    protected readonly LOGIN_PATH: string;
    protected readonly TAB_PATHS: string[];

    private readonly isCurrentPath = url => Taro.getCurrentInstance()?.router?.path === url;

    private readonly navigateTo = (path: string) => {
        if (this.TAB_PATHS.includes(path)) return 'switchTab';
        const len = Taro.getCurrentPages().length;
        return len > 9 ? 'redirectTo' : 'navigateTo';
    };

    public readonly setRouteChange = (handle: RouteChangeCallback): boolean => {
        if (!handle) return false;
        if (this.routeChange) console.error('routeChange被覆盖！', handle);

        this.routeChange = handle;

        return true;
    };

    public readonly transformObject = (params?: Service.dp.Obj, encode = false): string => {
        if (!params || !uObject.check(params)) {
            return '';
        }
        let urlParams = '?';
        urlParams += Object.keys(params).map(item =>
            `${item}=${encode ? encodeURIComponent(params[item] as string) : params[item]}`,
        ).join('&');

        return urlParams;
    };

    public readonly transformParams = <T, >(url: string): ParamsObject<T> => {
        const queryString = url.split('?')[1];
        if (!queryString) {
            return {}; // 如果没有查询参数，返回一个空对象
        }

        const paramsArray = queryString.split('&');
        const paramsObject: ParamsObject<T> = {};

        // 将参数数组转换为键值对对象
        paramsArray.forEach(param => {
            const [key, value] = param.split('=');
            // 使用泛型类型转换参数的值
            paramsObject[key] = decodeURIComponent(value) as unknown as T;
        });

        return paramsObject;
    };

    public readonly push = (path: string, params?: Service.dp.Obj, unCheck = false) => {
        if (!unCheck && this.isCurrentPath(path)) return;
        this.routeChange?.({ type: 'push', path, params });
        Taro[this.navigateTo(path)]({
            url: path + this.transformObject(params),
        });
    };

    public readonly refresh = () => {
        const router = Taro.getCurrentInstance()?.router;
        if (router?.path) {
            this.routeChange?.({ type: 'replace', path: router.path, params: router.params });
            Taro.redirectTo({
                url: router.path + this.transformObject({
                    ...router.params || {},
                    $taroTimestamp: Date.now(),
                }),
            });
        }
    };

    public readonly replace = (path: string, params?: Service.dp.Obj) => {
        this.routeChange?.({ type: 'replace', path, params });
        Taro.redirectTo({
            url: path + this.transformObject(params),
        });
    };

    public readonly back = (options: {
        delta: number,
    } = { delta: 1 }) => {
        Taro.navigateBack(options);
    };

    public readonly reload = (url?: string) => {
        const router = Taro.getCurrentInstance()?.router;
        Taro.reLaunch({
            url: url || (router?.path + this.transformObject({
                ...router?.params || {},
                $taroTimestamp: Date.now(),
            })),
        });
    };

    public readonly goHome = () => this.push(this.HOME_PATH);

    public readonly goLogin = () => this.push(this.LOGIN_PATH);

    public readonly reloadHome = () => this.reload(this.HOME_PATH);

    public readonly reloadMyCenter = () => this.reload(cRoutes.ME_PATH);
}

class HNavigator extends HNavigatorBase {
    public static readonly instance = new HNavigator();
    private constructor() {
        super({
            homePath: cRoutes.HOME_PATH,
            tabPaths: tabBarConfig.map(item => item.pagePath),
        });
    }

    // 返回上一页，如果没有上一页则返回首页
    public readonly safeBack = (safePath?: string) => {
        const len = Taro.getCurrentPages().length;
        if (len <= 1) {
            this.push(safePath || cRoutes.HOME_PATH);
        } else {
            this.back();
        }
    };

    // 获取返回上一页图片，如果没有上一页则获取返回首页图标
    public readonly getSafeBackIcon = (backIcon?: string, safeIcon?: string) => {
        const len = Taro.getCurrentPages().length;
        if (len <= 1) {
            return backIcon || cIcon.PAGE_HOME_ICON;
        }
        return safeIcon || cIcon.PAGE_BACK_ICON;
    };
}

export const hNavigator = HNavigator.instance;
