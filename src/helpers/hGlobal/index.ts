/**
 * @Owners penghaoyang
 * @Title 维护一个冷启动周期内的全局变量模块
 */
import Taro from '@tarojs/taro';
import { cConfig } from '@/public/cConfig'

const ratioKey = 'ratio';
const statusBarHeightKey = 'statusBarHeight';
const windowWidth = 'windowWidth';
const menuButtonHeightKey = 'menuButtonHeight';
const navigationBarHeightKey = 'navigationBarHeight';
const brandKey = 'brand';
const systemKey = 'system';
const globalUserInfo = 'userInfo'


export const openIdKey = 'openId';

export const uuidKey = 'uuid';

/*
 * 全局变量模块
 * @description 维护一个冷启动周期内的全局变量
 */
class HGlobal {
    /** 单例 */
    public static readonly instance = new HGlobal();
    private constructor() { }

    private _ratio = Taro.getStorageSync<number>(ratioKey) || 2;
    private _statusBarHeight = Taro.getStorageSync<number>(statusBarHeightKey);
    private _windowWidth = Taro.getStorageSync<number>(windowWidth);
    private _menuButtonHeight = Taro.getStorageSync<number>(menuButtonHeightKey);
    private _navigationBarHeight = Taro.getStorageSync<number>(navigationBarHeightKey);
    private _scene = 0;
    private _brand = Taro.getStorageSync<string>(brandKey);
    private _system = Taro.getStorageSync<string>(systemKey);

    private _uuid = Taro.getStorageSync<string>(uuidKey) || '';
    private _openId = Taro.getStorageSync<string>(openIdKey) || '';
    private _userInfo = Taro.getStorageSync<UserInfo | null>(globalUserInfo) || null;

    private _apiEnv = '';
    //#region [应用信息]

    //#region [用户信息]

    /** 用户信息 */
    public get user() {
        return this._userInfo;
    }

    public set user(user: UserInfo | null) {
        if (user) {
            this._userInfo = user;
            Taro.setStorageSync(globalUserInfo, user);
        } else {
            this._userInfo = null;
            Taro.removeStorageSync(globalUserInfo);
        }
    }


    /** openId */
    public get openId() {
        return this._openId || this._userInfo?.openId || '';
    }

    public set openId(openId: string) {
        if (openId) {
            this._openId = openId;
            Taro.setStorageSync(openIdKey, openId);
        }
    }

    /** 设备设备系统 */
    public get system() {
        return this._system;
    }

    public set system(system: string) {
        this._system = system;
        Taro.setStorageSync(systemKey, system);
    }


    /** 设备设备品牌 */
    public get brand() {
        return this._brand;
    }

    public set brand(brand: string) {
        this._brand = brand;
        Taro.setStorageSync(brandKey, brand);
    }

    /** 设备场景值 */
    public get scene() {
        return this._scene;
    }

    public set scene(scene: number) {
        this._scene = scene;
    }

    /** 导航栏高度(px) */
    public get navigationBarHeight() {
        return this._navigationBarHeight;
    }

    public set navigationBarHeight(height: number) {
        this._navigationBarHeight = height;
        Taro.setStorageSync(navigationBarHeightKey, height);
    }

    /** 菜单按钮（右上角胶囊按钮）高度(px) */
    public get menuButtonHeight() {
        return this._menuButtonHeight;
    }

    public set menuButtonHeight(height: number) {
        this._menuButtonHeight = height;
        Taro.setStorageSync(menuButtonHeightKey, height);
    }

    /** 屏幕高度(px) */
    public get windowWidth() {
        return this._windowWidth;
    }

    public set windowWidth(height: number) {
        this._windowWidth = height;
        Taro.setStorageSync(windowWidth, height);
    }

    /** 状态条高度(px) */
    public get statusBarHeight() {
        return this._statusBarHeight;
    }

    public set statusBarHeight(height: number) {
        this._statusBarHeight = height;
        Taro.setStorageSync(statusBarHeightKey, height);
    }

    /** 设备像素比 */
    public get ratio() {
        return this._ratio;
    }

    public set ratio(ratio: number) {
        this._ratio = ratio;
        Taro.setStorageSync(ratioKey, ratio);
    }

    /** 接口环境 */
    public get defaultApiEnv() {
        const { miniProgram: mini } = Taro.getAccountInfoSync();
        return process.env.NODE_ENV === 'production' ? mini.envVersion === 'trial' ? 'gray' : 'prod' : 'test';
    }

    public get apiEnv() {
        if (!this._apiEnv) {
            // const { environ = '' } = Taro.getExtConfigSync?.() || {};
            const { miniProgram: mini } = Taro.getAccountInfoSync();
            const apiEnvKey = `${cConfig.API_ENV}_${mini.envVersion}`;
            const env = Taro.getStorageSync<string>(apiEnvKey);

            this._apiEnv = env || this.defaultApiEnv;
        }

        return this._apiEnv;
    }

    public set apiEnv(env: string) {
        const { miniProgram: mini } = Taro.getAccountInfoSync();
        const apiEnvKey = `${cConfig.API_ENV}_${mini.envVersion}`;
        this._apiEnv = env;
        Taro.setStorageSync(apiEnvKey, env);
    }

    //#endregion
}

export const hGlobal = HGlobal.instance;
