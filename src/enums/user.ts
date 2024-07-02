/**
 * @Owners cmZhou
 * @Title User
 */
export enum ModuleLevel {
    OnlyDeveloper = 0,
    OnlySuperAdmin = 1,
    OnlyAdmin = 2,
    AllowAll = 3,
}

/**
 * 与 UserCheck 一致，
 * 暂时手动同步
 */
export enum PermissionCheck {
    NoCheck = 0,
    CheckAdmin = 1,
    OnlyCheckLogin = 2,
    OnlySuperAdmin = 3,
    OnlyDeveloper = 4,
    OnlyDeveloperOrSuperAdmin = 5,
}

/**
 * 与 PermissionCheck 一致，
 * 暂时手动同步
 */
export enum UserCheck {
    NoCheck = 0,
    CheckAdmin = 1,
    OnlyCheckLogin = 2,
    OnlySuperAdmin = 3,
    OnlyDeveloper = 4,
    OnlyDeveloperOrSuperAdmin = 5,
}

export enum RoleLevel {
    Developer = 0,
    SuperAdmin = 1,
    Admin = 2,
    Guest = 3,
}

export enum LoginErrorState {
    NoLogin = 0,
    LoginInvalid = 1,
    LoginExpired = 2,
    IllegalLoginUser = 3,
}
