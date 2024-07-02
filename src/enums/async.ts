/**
 * @Owners PGee
 * @Title Async
 */
export enum Action {
    Break = 0, // 中断其它
    Hide = 1, // 隐藏其它
    Parallel = 2, // 并行
}

export enum Status {
    BeBreaked = 0,
    BeHided = 1,
    Running = 2,
}
