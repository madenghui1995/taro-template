/**
 * @Owners cmZhou,zzh
 * @Title public url工具
 */

import { cIcon } from '@/consts/cIcon';
import { ossImg } from './ossImg';

export const WXAVATAR_HOST = 'https://thirdwx.qlogo.cn';

export const wxAvatar = (origin?: string) => {
    if (origin && origin.startsWith(WXAVATAR_HOST)) {
        if (process.env.NODE_ENV === 'production') {
            return origin.replace(WXAVATAR_HOST, `${cIcon.OSS_DOMAIN}/new-fengqun/avatar-img`);
        }
        return origin.replace(WXAVATAR_HOST, `${cIcon.OSS_DOMAIN}/new-fengqun/avatar-img-test`);
    }

    return origin || cIcon.LOGO;
};

const serializeParams = (params: Record<string, unknown> | string) => {
    if (Object.prototype.toString.call(params) === '[object Object]') {
        const keys = Object.keys(params).sort();
        return keys.reduce<string[]>((res, key) => {
            res.push(`${key}=${params[key]}`);
            return res;
        }, []).join('&');
    }

    return '';
};

export const serializeUrl = (method: string, url: string, params?: Record<string, unknown> | string) => {
    const paramsStr = params ? serializeParams(params) : '';
    return `${method} ${url}?${paramsStr}`;
};

/**
 * 转换绝对路径
 * @Param path
 */
export const absolutePath = (path?: string, defaultVal?: string) => !path ? (defaultVal ?? '/') : path.startsWith('/') ? path : `/${path}`;

export const uUrl = {
    ossImg,
    serializeUrl
};
