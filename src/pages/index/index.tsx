import { useRef } from 'react'
import { View, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import Dropdown from '@/components/Dropdown'
import './index.scss'

export default function Index() {
  const ref = useRef<any>()
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Dropdown ref={ref}>
        <Dropdown.Item title='标题1' key={1}>
          <View>111</View>
        </Dropdown.Item>
        <Dropdown.Item title='标题2' key={2}>
          <>
            <View>222</View>
            <Button onClick={() => ref.current.close()}>close dropdown</Button>
          </>
        </Dropdown.Item>
      </Dropdown>
    </View>
  )
}
