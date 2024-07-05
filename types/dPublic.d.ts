/**
 * @Owners cmZhou
 * @Title 公共的常用类型
 */
declare namespace Service.dp {
    type Nullable<T> = T | null | undefined;

    type NullableProps<T extends Obj> = {
        [P in keyof T]?: T[P] | null;
    };

    type UrlParams = Nullable<boolean | number | string>;

    type Keys = number | string;

    type Obj<T = unknown> = {
        [K in Keys]: T;
    };

    type StrictObj<K extends number | string, T = unknown> = {
        [k in K]: T;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type Func<P extends any[] = any[], T = unknown> = (...p: P) => T;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type Class<P extends any[] = any[], T = unknown> = new (...p: P) => T;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type PromiseFunc<P extends any[] = any[], T = unknown> = (...p: P) => Promise<T>;

    type PromiseOrSelf<T> = Promise<T> | T;

    type AllowKeys<T extends { [p in Exclude<keyof T, K>]: never }, K extends string> = T;

    type NeedKeys<T extends Record<K, unknown>, K extends string> = T;

    type StrictKeys<T extends Record<K, unknown> & { [p in Exclude<keyof T, K>]: never }, K extends string> = T;

    type PartialExcludeArr<T> = T extends unknown[] ? T : Partial<T>;

    type DeepReadonly<T> =
        T extends Func ? T :
        T extends Map<infer K, infer V> ? ReadonlyMap<K, DeepReadonly<V>> :
        T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepReadonly<V>> :
        T extends Set<infer V> ? ReadonlySet<DeepReadonly<V>> :
        T extends ReadonlySet<infer V> ? ReadonlySet<DeepReadonly<V>> :
        T extends unknown[] ? readonly DeepReadonly<T[number]>[] :
        T extends readonly (infer V)[] ? readonly DeepReadonly<V>[] :
        T extends Obj ? { readonly [P in keyof T]: DeepReadonly<T[P]>; } : T;

    type DeepWritable<T> =
        T extends Func ? T :
        T extends Map<infer K, infer V> ? Map<K, DeepWritable<V>> :
        T extends ReadonlyMap<infer K, infer V> ? Map<K, DeepWritable<V>> :
        T extends Set<infer V> ? Set<DeepWritable<V>> :
        T extends ReadonlySet<infer V> ? Set<DeepWritable<V>> :
        T extends unknown[] ? DeepWritable<T[number]>[] :
        T extends readonly (infer V)[] ? DeepWritable<V>[] :
        T extends Obj ? { -readonly [P in keyof T]: DeepWritable<T[P]>; } : T;

    type DeepPartial<T> =
        T extends Func ? T :
        T extends Map<infer K, infer V> ? Map<K, DeepPartial<V>> :
        T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPartial<V>> :
        T extends Set<infer V> ? Set<DeepPartial<V>> :
        T extends ReadonlySet<infer V> ? ReadonlySet<DeepPartial<V>> :
        T extends unknown[] ? DeepPartial<T[number]>[] :
        T extends readonly (infer V)[] ? readonly DeepPartial<V>[] :
        T extends Obj ? { [P in keyof T]?: DeepPartial<T[P]>; } : T;

    type NonFuncProp<T> = Pick<T, NonFuncPropNames<T>>;
    type NonFuncPropNames<T> = { [K in keyof T]: T[K] extends Func ? never : K }[keyof T];

    type PromiseFuncProp<T> = Pick<T, PromiseFuncPropNames<T>>;
    type PromiseFuncPropNames<T> = { [K in keyof T]: T[K] extends PromiseFunc ? K : never }[keyof T];

    interface CustomProcessEnv {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _CAIBIRD_RUN_ENV: any,

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _CAIBIRD_BABEL_TRANSFORM_ALL: any,

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _CAIBIRD_HOST: any,

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _CAIBIRD_PORT: any,

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _CAIBIRD_PROJECT_VERSION: any,
    }

    interface Env {
        RUN_ENV: string,

        PROJECT_VERSION: string,
        PROJECT_NAME: string,

        NODE_ENV_VALUE: string,

        HOST: string,
        PORT: number,

        IS_PRODUCTION: boolean,
        IS_EXP_PRODUCTION: boolean,

        IS_TEST: boolean,
        IS_DEV_TEST: boolean,
        IS_LOCAL_TEST: boolean,
        IS_SUB_TEST: boolean,
    }
}

// declare namespace Caibird {
//     const env: dp.Env;
// }

// interface Window {
//     __REDUX_DEVTOOLS_EXTENSION__?(): import('redux').StoreEnhancer,
// }
