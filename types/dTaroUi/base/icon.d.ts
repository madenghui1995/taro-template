/**
 * @Owners jiangzm
 * @Title taro-ui 扩展
 */
import { CommonEventFunction } from '@tarojs/components/types/common';

import { AtComponent } from './@core';

export interface AtIconBaseProps extends AtComponent {
    value: string,
    color?: string,
    prefixClass?: string,
    size?: number | string,
}

export interface AtIconProps extends AtComponent, AtIconBaseProps {
    onClick?: CommonEventFunction,
}
