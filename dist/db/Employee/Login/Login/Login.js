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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeLogin = exports.TestLogin = void 0;
exports.ExecuteLogin = ExecuteLogin;
const zod_1 = require("zod");
const mssql_1 = __importDefault(require("mssql"));
const Procedure_1 = require("../../../../db/Procedure");
const pool_1 = require("../../../../pool");
const constant_1 = require("../../../../constant");
function ExecuteLogin(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getStandardPool)();
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            const output = yield pool.request()
                .input("Username", mssql_1.default.VarChar(50), data.username)
                .input("Password", mssql_1.default.VarChar(50), data.password)
                .output("SessionID", mssql_1.default.Char(36))
                .execute("Employee.LoginEmployee");
            return output.output.SessionID;
        }
        catch (err) {
            console.error(err);
            return "";
        }
    });
}
exports.TestLogin = zod_1.z.object({ username: zod_1.z.string().max(50), password: zod_1.z.string().max(50) });
exports.EmployeeLogin = (0, Procedure_1.buildProcedure)(exports.TestLogin, ExecuteLogin);
