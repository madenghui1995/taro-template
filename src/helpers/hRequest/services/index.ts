

import { home } from './home';

export type HttpApis = {
    home: home,
};

export const httpServices = {
    home,
};


declare global {
    namespace Caibird {
        type dResTypes = {
            [S in keyof HttpApis]: {
                [A in keyof HttpApis[S]]: HttpApis[S][A] extends Service.dRequest.AnyFunc ? ReturnType<HttpApis[S][A]> : never;
            };
        };
        type dReqTypes = {
            [S in keyof HttpApis]: {
                [A in keyof HttpApis[S]]: HttpApis[S][A] extends Service.dRequest.AnyFunc ? Parameters<HttpApis[S][A]>[0] : never;
            };
        };
    }
}
