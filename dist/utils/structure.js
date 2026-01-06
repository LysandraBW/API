"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.structure = structure;
exports.structureTwo = structureTwo;
function structure(elements, sortKey) {
    const sorted = {};
    for (const element of elements) {
        const key = element[sortKey];
        sorted[key] = element;
    }
    return sorted;
}
function structureTwo(elements, sortKey1, sortKey2) {
    const sorted = {};
    for (const element of elements) {
        const key1 = element[sortKey1];
        if (!sorted[key1])
            sorted[key1] = {};
        const key2 = element[sortKey2];
        sorted[key1][key2] = element;
    }
    return sorted;
}
