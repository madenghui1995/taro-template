/**
 * @Owners jiangzm
 * @Title  图标组件
 */
import { ITouchEvent, Text } from '@tarojs/components';
import classNames from 'classnames';
import React from 'react';

import { dTaroUi } from '../../../../types/dTaroUi';
import { mergeStyle, pxTransform } from './utils';

export default class AtIcon extends React.Component<dTaroUi.AtIconProps> {
    public static defaultProps: dTaroUi.AtIconProps;

    private handleClick(event: ITouchEvent): void {
        this.props.onClick && this.props.onClick(event);
    }

    public render(): JSX.Element {
        const {
            customStyle,
            className,
            prefixClass,
            value,
            size,
            color,
        } = this.props;

        const rootStyle = {
            fontSize: `${pxTransform(parseInt(String(size)) * 2)}`,
            color,
        };

        const iconName = value ? `${prefixClass}-${value}` : '';
        return (
            <Text
                className={classNames(prefixClass, iconName, className)}
                style={mergeStyle(rootStyle, customStyle as Service.dp.Obj)}
                onClick={e => this.handleClick(e)}
            />
        );
    }
}

AtIcon.defaultProps = {
    customStyle: '',
    className: '',
    prefixClass: 'at-icon',
    value: '',
    color: '',
    size: 24,
};
