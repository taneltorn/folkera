export const isEmpty = (object: any) => {
    return !object || Object.keys(object).length === 0 || object.length === 0;
}

export const hex2rgba = (hex: string, alpha: number = 1) => {
    const [r, g, b] = hex.match(/\w\w/g)!.map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
};

export const range = (start: number, end: number): number[] => {
    const range: number[] = [];
    for (let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
}