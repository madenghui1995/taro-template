/**
 * @Owners Jeannette
 * @Title home
 */
import { FQHttpEnums } from '@/enums'

export const home: Service.dRequest.ApiConfigs<keyof home> = {
    getTemplateComponentList: {
        method: FQHttpEnums.MethodType.POST,
        path: '/mall/shop/decorate/template/getTemplateComponentList',
    },
   
};

export type home = {
    getTemplateComponentList(params: {
        templateId?: string,
        shopId?: number,
        status?: number,
    }): {}
};
