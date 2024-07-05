/**
 * @Owners jiangzm
 * @Title  图标组件
 */
import AtIcon from './Icon';

import './index.scss';

export class Icon extends AtIcon {
    public static defaultProps = {
        customStyle: '',
        className: '',
        prefixClass: 'fq-icon',
        value: '',
        color: '',
        size: 24,
    };

    public static IconTypes = {
        1: 0,
    };
}

export const IconTypes = Icon.IconTypes;
