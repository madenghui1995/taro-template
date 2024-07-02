/**
 * @Owners Jeannette
 * @Title 路由定义
 */

import { cRoutes } from './consts/cRoutes';
import {
    cSubRoutes,
} from './consts/cSubRoutes';

const tabBarConfig: {
    pagePath: string,
    text: string,
    key: string,
    iconPath: string,
    selectedIconPath: string,
}[] = [
    {
        pagePath: cRoutes.HOME_PATH,
        text: '首页',
        key: 'home_nav',
        iconPath: 'assets/tabbar/home.png',
        selectedIconPath: 'assets/tabbar/sHome.png',
    },
    {
        pagePath: cRoutes.ME_PATH,
        text: '个人中心',
        key: 'personal_nav',
        iconPath: 'assets/tabbar/me.png',
        selectedIconPath: 'assets/tabbar/sMe.png',
    },
];

const handleStr = (str: string) => str.replace(/^\//, '');

const getRoutes = () => {
    const keys = Object.keys(cRoutes);
    return keys.map(item => handleStr(cRoutes[item as keyof typeof cRoutes]));
};

const subRoutes: string[] = Object.values(cSubRoutes);
const getSubRoutes = (prefix: string) => {
    const subprefix = `${prefix}/`;
    return subRoutes.filter(item => item.startsWith(subprefix))
        .map((item: string) => item.replace(subprefix, ''));
};

const subPackages: {
    name: string,
    root: string,
    pages: string[],
    moduleId: number,
}[] = [
    
];

const tabBar = {
    // custom: true,
    color: '#000000',
    selectedColor: '#00B690',
    borderStyle: 'white',
    list: tabBarConfig.map((item: {
        readonly pagePath: string,
        readonly text: string,
        readonly key: string,
        readonly iconPath: string,
        readonly selectedIconPath: string,
    }) => ({
        ...item,
        key: undefined,
        pagePath: handleStr(item.pagePath),
    })),
};

const pages = [
    ...getRoutes(),
];

const preloadRule = {
   
};
console.log('pages', pages);


export {
    subPackages,
    pages,
    tabBar,
    preloadRule,
    tabBarConfig,
};
