"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProcedure = void 0;
const buildProcedure = (Test, Execute) => {
    return {
        "Test": (data) => Test.safeParse(data),
        "Execute": Execute
    };
};
exports.buildProcedure = buildProcedure;
