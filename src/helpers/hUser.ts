/**
 * @Owners linrui
 * @Title user helper
 */
// import Taro, { eventCenter } from '@tarojs/taro';
// import { cConfig, cEvents, cIcon } from 'fq-mall-taro-consts';
import { hGlobal } from '@/helpers/index';
// import _ from 'lodash-es';

class HUser {
    public static readonly instance = new HUser();
    private constructor() { }

    private readonly refreshTimerId: number | null = null;

    public readonly getCurrentOrNull = () => hGlobal.user;

    // 获取当前登录
    public readonly getCurrent = (): NonNullable<UserInfo> => {
        const userInfo = hGlobal.user;
        if (!userInfo) {
            this.clearCurrent();
            this.login();
        }
        return userInfo as unknown as NonNullable<UserInfo>;
    };

    // 设置登录态
    public readonly setCurrent = () => {

    };

    // 清除登录态
    public readonly clearCurrent = () => {
        hGlobal.user = null;
    };

    // 登录
    public readonly login = async () => {

    };

    // 注册
    public readonly register = async () => {

    };

    // 登出
    public readonly logout = async (

    ) => {

    };

    // 获取最新用户信息
    public readonly getLatest = async () => {
        console.log('test');
        return;
    };

    // 刷新用户状态
    public readonly refreshCurrent = async () => {

    };
}

export const hUser = HUser.instance;
