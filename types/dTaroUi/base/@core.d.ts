/**
 * @Owners linrui
 * @Title taro-ui 扩展
 */
import { CSSProperties } from 'react';

export interface AtComponent {
    className?: string,
    customStyle?: CSSProperties | string,
}

export interface AtIconBaseProps2 extends AtComponent {
    value: string,

    color?: string,
}

export interface AtIconBaseProps extends AtComponent {
    value: string,

    color?: string,

    prefixClass?: string,

    size?: number | string,
}

export default AtComponent;
