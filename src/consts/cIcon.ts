/**
 * @Owners cmZhou
 * @Title 常用icon
 */

// import { sort } from './cSubIcon/sort';

namespace _cIcon {
    export const OSS_DOMAIN = 'https://stantic.ifengqun.com';
    const IMAGE_URL_PREFIX = process.env.NODE_ENV === 'production' ? `${OSS_DOMAIN}/new-fengqun/fq-mall/` : `${OSS_DOMAIN}/new-fengqun/fq-mall-test/`;
    export const PAGE_BACK_ICON = `${IMAGE_URL_PREFIX}goods-detail/page-back-icon.png`;
    export const PAGE_HOME_ICON = `${IMAGE_URL_PREFIX}goods-detail/swiper_home_icon.png`;
    export const LOGO = `${IMAGE_URL_PREFIX}me/logo.png`;
}

export const cIcon: Service.dp.DeepReadonly<
typeof _cIcon
> = {
    ..._cIcon,
};
