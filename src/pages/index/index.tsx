import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { hRequest } from '@/helpers';
import './index.scss'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
    hRequest.api.home.getTemplateComponentList({});
  })

  return (
      <View className='index'>
        <Text>11117771</Text>
      </View>
  )
}
