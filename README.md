# 小程序模板开箱即用
## 版本介绍
本版本使用Taro3.6.32版本


## 小程序 
1. 启动小程序
`npm run dev:weapp`

2. 构建小程序
`npm run build:weapp`

##  H5
1. 启动H5
`npm run dev:h5`

2. 构建H5
`npm run build:h5`

## 代码规范与检查Eslint、Typescript限制
1. 全面启动和构建的时候，启时、运行时、构建时eslint进行代码规范性检测

## 全局别名
1. 工具类 `@/helpers` 
2. 枚举 `@/enums`
3. 常量 `@consts`
4. 组件 `@component`
5. 工具方法 `@/utils`


## 单测
Jest

## Lodash-es 
只支持使用lodash-es版本，并使用解构方式引入，按需要引入，不要全量引入

`import { omit } from 'lodash-es';` 


## 环境变量命名
.env.development
.env.production
.env.test

自定义命名需要写TARO_APP

TARO_APP_XXX 



