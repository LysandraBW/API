"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectInfoMakes = SelectInfoMakes;
const constant_1 = require("../../../constant");
const pool_1 = require("../../../pool");
function SelectInfoMakes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getStandardPool)();
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            const output = yield pool.request().execute("Info.Makes");
            return output.recordset;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    });
}
