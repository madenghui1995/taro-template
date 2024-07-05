/**
 * @Owners jiangzm
 * @Title uAsync
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
namespace _uAsync {
    type AsyncFunc<T,> = (...args: any[]) => Promise<T>;

    /**
     * 异步防抖
     */
    export const asyncDebounce = <T,>(func: AsyncFunc<T>, wait = 2000) => {
        let timer = 0;
        let task: Promise<T> | null = null;

        return (...args: any[]): Promise<T> => {
            if (timer) clearTimeout(timer);

            task = task ?? (task = func(...args));

            timer = setTimeout(() => {
                task = null;
                clearTimeout(timer);
            }, wait) as unknown as number;

            return task;
        };
    };
}

export const uAsync: Service.dp.DeepReadonly<typeof _uAsync> = {
    ..._uAsync,
};
