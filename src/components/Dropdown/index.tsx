import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classnames from 'classnames'
import React, { useImperativeHandle, useState } from 'react'
import "taro-ui/dist/style/components/icon.scss";
import styles from './index.module.scss'

// forwardRef 组件增添属性 来自 antd-mobile
export function attachPropertiesToComponent<C, P extends Record<string, any>>(
  component: C,
  properties: P,
): C & P {
  const ret = component as any
  for (const key in properties) {
    if (properties.hasOwnProperty(key)) {
      ret[key] = properties[key]
    }
  }
  return ret
}

interface ItemProps {
  key: string | number
  title: string | React.ReactElement
  activeKey?: string | number
  children: React.ReactElement
}

/**
 * @param key
 * @param title 标题
 * @param activeKey
 */
function Item(props: ItemProps) {
  return props.children
}

interface DropDownProps {
  children: React.ReactElement[]
}

/**
 * @param close 关闭下拉框事件
 */
const DropDown = React.forwardRef((props: DropDownProps, ref: any) => {
  const [activeKey, setActiveKey] = useState('')

  useImperativeHandle(ref, () => ({
    close: () => {
      setActiveKey('')
    },
  }))

  const handleClick = (itemKey) => {
    setActiveKey(itemKey !== activeKey ? itemKey : '')
  }
  
  const navs = React.Children.map(props.children, (child) => {
    return (
      <View
        className={classnames(styles.navItem, {
          [styles.open]: child.key == activeKey,
          [styles.selected]: child.props.activeKey,
        })}
        onClick={() => {
          handleClick(child.key)
        }}
      >
        {child.props.title}
        <View className={classnames('at-icon at-icon-chevron-down', styles.icon)}></View>
      </View>
    )
  })

  return (
    <View className={classnames(styles.wrapper)}>
      <View className={styles.nav}>{navs}</View>
      <View
        className={classnames(styles.popup, {
          [styles.show]: !!activeKey,
          [styles.hide]: !activeKey,
        })}
      >
        {props.children.map((item) => item.key == activeKey && item.props.children)}
      </View>
      {activeKey && (
        <View
          className={styles.mask}
          onClick={() => {
            ref.current.close()
          }}
          catchMove
        ></View>
      )}
    </View>
  )
})

export default attachPropertiesToComponent(DropDown, {
  Item,
})
