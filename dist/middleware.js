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
exports.default = authenticateEmployee;
const getCookie_1 = require("./utils/getCookie");
const pool_1 = require("./pool");
const constant_1 = require("./constant");
function authenticateEmployee(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionID = yield (0, getCookie_1.getCookie)(req, "EmployeeSessionID");
        if (!sessionID || !(yield (0, pool_1.authenticate)(sessionID, constant_1.EMPLOYEE))) {
            const error = new Error("Unauthorized Access!");
            return next(error);
        }
        return next();
    });
}
