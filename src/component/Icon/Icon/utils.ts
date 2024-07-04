/**
 * @Owners Jeannette
 * @Title  图标工具
 */

function pxTransform(size: number): string {
    if (!size) return '';
    const designWidth = 750;
    const deviceRatio = {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
    };
    return `${size / deviceRatio[designWidth]}rpx`;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function objectToString(style: Service.dp.Obj<any> | string): string {
    if (style && typeof style === 'object') {
        let styleStr = '';
        Object.keys(style).forEach(key => {
            const lowerCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            styleStr += `${lowerCaseKey}:${style[key as keyof typeof style]};`;
        });
        return styleStr;
    } else if (style && typeof style === 'string') {
        return style;
    }
    return '';
}


function mergeStyle(
    style1: React.CSSProperties | string,
    style2: React.CSSProperties | string,
): React.CSSProperties | string {
    if (
        style1 && typeof style1 === 'object' &&
        style2 && typeof style2 === 'object'
    ) {
        return {
            ...style1,
            ...style2,
        };
    }

    if (!!style1 !== !!style2) return style1 || style2;
    return objectToString(style1) + objectToString(style2);
}

export {
    pxTransform,
    objectToString,
    mergeStyle
}