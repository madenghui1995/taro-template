/**
 * @Owners cmZhou
 * @Title dError
 */
import { ePrompt } from '../enums';

export namespace dError {
    type Options = {
        key: string,
        msg?: string,
        showPrompt?: ePrompt.Type | false,
        promptStyleType?: ePrompt.StyleType,
        onOk?: Service.dp.Func<[], void>,
        onCancel?: Service.dp.Func<[], void>,
        onEnd?: Service.dp.Func<[], void>,
    };
}
