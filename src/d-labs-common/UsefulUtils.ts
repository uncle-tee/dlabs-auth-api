export function zeroFills(numberVal, width) {
    width = width -= numberVal.toString().length;

    if (width > 0) {
        return new Array(width + (/\./.test(numberVal) ? 2 : 1)).join('0') + numberVal;
    }

    return numberVal + '';
}

