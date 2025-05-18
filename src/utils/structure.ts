export function structure<Element>(elements: Array<Element>, sortKey: keyof Element) {
    const sorted: {[sortKey: string|number]: Element} = {};
    for (const element of elements) {
        const key = <string|number> element[sortKey];
        sorted[key] = element;
    }
    return sorted;
}

export function structureTwo<Element>(elements: Array<Element>, sortKey1: keyof Element, sortKey2: keyof Element) {
    const sorted: {[sortKey1: string|number]: {[sortKey2: string|number]: Element}} = {};
    for (const element of elements) {
        const key1 = <string|number> element[sortKey1];
        if (!sorted[key1])
            sorted[key1] = {};
        const key2 = <string|number> element[sortKey2];
        sorted[key1][key2] = element;
    }
    return sorted;
}