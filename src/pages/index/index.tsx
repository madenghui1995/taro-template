/**
 * @Owners JJ
 * @Title 初始化
 */
import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { hRequest } from '@/helpers';
import './index.scss';

export default function Index() {
    useLoad(() => {
        console.log('Page loaded.');
        hRequest.api.home.getTemplateComponentList({});
    });

    return (<View className='index' >
        <Text>111171123123771123123213、</Text>2313213
    </View>);
}
