import { pages, preloadRule, subPackages, tabBar } from './routerPath';

export default defineAppConfig({
    pages,
    subPackages,
    tabBar,
    preloadRule,
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
    }
})
