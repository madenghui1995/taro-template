/**
 * @Owners jiangzm
 * @Title uuid util
 */

const newUUID = () => {
    const randomId = 'xxxxxxxx-xxxx-4xxx-fxxx-xxxxxxxxxxxx'.split('-')
        .map(str => {
            const random = Math.random().toString(16);
            return str[0] === '4' ? `4${random.substring(2, 5)}` :
                str[0] === 'f' ? `${(parseInt(random[2], 16) & 0x3 | 0x8).toString(16)}${random.substring(2, 5)}` :
                random.substring(2, str.length + 2);
        }).join('-');
    return randomId;
};

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const newId = (length = 32) => {
    const chars: string[] = [];
    for (let i = 0; i < length; i++) {
        chars.push(characters.charAt(Math.floor(Math.random() * characters.length)));
    }
    return chars.join('');
};

function generateUUIDWithTimestamp() {
    const chars = '0123456789abcdef';
    let uuid = '';

    const timestamp = new Date().getTime().toString(16);

    for (let i = 0; i < 32; i++) {
        if (i === 12) {
            uuid += '4';
        } else if (i === 16) {
            uuid += chars[(Math.random() * 4 | 8)];
        } else {
            if (i < timestamp.length) {
                uuid += timestamp[i];
            } else {
                uuid += chars[(Math.random() * 16 | 0)];
            }
        }
    }

    return uuid;
}

const shortId = (prefix?: string) => (prefix ? `${prefix}-` : '') + Math.random().toString(36).substring(2);

export const uUuid = {
    newId,
    newUUID,
    shortId,
    generateUUIDWithTimestamp,
};
