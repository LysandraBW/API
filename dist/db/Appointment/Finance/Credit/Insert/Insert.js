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
exports.InsertCreditCard = exports.TestInsertCreditCard = void 0;
exports.ExecuteInsertCreditCard = ExecuteInsertCreditCard;
const zod_1 = require("zod");
const mssql_1 = __importDefault(require("mssql"));
const Procedure_1 = require("../../../../../db/Procedure");
const pool_1 = require("../../../../../pool");
const constant_1 = require("../../../../../constant");
const validate_1 = require("../../../../../validate");
const validate_2 = require("../../../../../validate");
function ExecuteInsertCreditCard(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getEmployeePool)(data.sessionID);
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            yield pool.request()
                .input('SessionID', mssql_1.default.Char(36), data.sessionID)
                .input('AppointmentID', mssql_1.default.UniqueIdentifier, data.appointmentID)
                .input('PaymentID', mssql_1.default.Int, data.paymentID)
                .input('Name', mssql_1.default.VarChar(100), data.name)
                .input('Type', mssql_1.default.VarChar(10), data.type)
                .input('CCN', mssql_1.default.VarChar(16), data.ccn)
                .input('EXP', mssql_1.default.Char(4), data.exp)
                .execute('Appointment.InsertCreditCard');
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    });
}
exports.TestInsertCreditCard = zod_1.z.object(Object.assign(Object.assign({}, validate_1.appointmentTest), { paymentID: validate_2.isInteger, name: zod_1.z.string().max(100), type: zod_1.z.string().max(10), ccn: zod_1.z.string().min(15).max(16), exp: zod_1.z.string().length(4) }));
exports.InsertCreditCard = (0, Procedure_1.buildProcedure)(exports.TestInsertCreditCard, ExecuteInsertCreditCard);
