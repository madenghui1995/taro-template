/**
 * @Owners Jeannette
 * @Title 首页
 */
import './index.scss';
import { Text, View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { hRequest } from '@/helpers';

export default function Index() {
    useLoad(() => {
        hRequest.api.home.getTemplateComponentList({});
    });

    return (<View className='index'>
        <Text>1</Text>
        <Text>2</Text>
    </View>);
}
