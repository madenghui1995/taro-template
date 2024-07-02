/**
 * @Owners Jeannette
 * @Title 主包路由常量
 */
namespace _cRoutes {
    export const HOME_PATH = '/pages/index/index';

    export const ME_PATH = '/pages/me/index';

}

export const cRoutes: Service.dp.DeepReadonly<typeof _cRoutes> = {
    ..._cRoutes,
};
