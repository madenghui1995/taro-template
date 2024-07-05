/**
 * @Owners cmZhou
 * @Title taro通用常量
 */

import { cConfig as base } from '../public/cConfig';

// import { cIcon } from './cIcon';
// import { cRoutes } from './cRoutes';

// namespace _cConfig {
//   const a = '1';
// }

export const cConfig: Service.dp.DeepReadonly<typeof base> = {
    ...base,
    // ..._cConfig,
};
