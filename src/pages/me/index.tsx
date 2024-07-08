/**
 * @Owners linrui
 * @Title user helper
 */
import { Text, View } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import './index.scss';

export default function Me() {
    useLoad(() => {
        console.log('Page loaded.');
    });

    return (
        <View className='index'>
            <Text>个人中心</Text>
        </View>
    );
}
