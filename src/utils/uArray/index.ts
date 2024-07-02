/**
 * @Owners cmZhou,zzh
 * @Title public array工具
 */
import { check } from './check';
import { deleteAndGetNew } from './deleteAndGetNew';
import { insertAndGetNew } from './insertAndGetNew';
import { jsonParse } from './jsonParse';

export const uArray = {
    check,
    jsonParse,
    deleteAndGetNew,
    insertAndGetNew,
};
