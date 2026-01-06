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
exports.SelectPayments = exports.TestSelectPayments = void 0;
exports.ExecuteSelectPayments = ExecuteSelectPayments;
const zod_1 = require("zod");
const mssql_1 = __importDefault(require("mssql"));
const pool_1 = require("../../../../../pool");
const constant_1 = require("../../../../../constant");
const validate_1 = require("../../../../../validate");
const Procedure_1 = require("../../../../../db/Procedure");
function ExecuteSelectPayments(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getEmployeePool)(data.sessionID);
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            const output = yield pool.request()
                .input('SessionID', mssql_1.default.Char(36), data.sessionID)
                .input('AppointmentID', mssql_1.default.UniqueIdentifier, data.appointmentID)
                .execute('Appointment.GetPayments');
            return output.recordset;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    });
}
exports.TestSelectPayments = zod_1.z.object(validate_1.appointmentTest);
exports.SelectPayments = (0, Procedure_1.buildProcedure)(exports.TestSelectPayments, ExecuteSelectPayments);
