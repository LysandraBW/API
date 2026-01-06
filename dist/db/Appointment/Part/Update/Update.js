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
exports.UpdatePart = exports.TestUpdatePart = void 0;
exports.ExecuteUpdatePart = ExecuteUpdatePart;
const zod_1 = require("zod");
const mssql_1 = __importDefault(require("mssql"));
const Procedure_1 = require("../../../../db/Procedure");
const pool_1 = require("../../../../pool");
const constant_1 = require("../../../../constant");
const validate_1 = require("../../../../validate");
const validate_2 = require("../../../../validate");
function ExecuteUpdatePart(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getEmployeePool)(data.sessionID);
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            yield pool.request()
                .input('SessionID', mssql_1.default.Char(36), data.sessionID)
                .input('AppointmentID', mssql_1.default.UniqueIdentifier, data.appointmentID)
                .input('PartID', mssql_1.default.Int, data.partID)
                .input('PartName', mssql_1.default.VarChar(50), data.partName)
                .input('PartNumber', mssql_1.default.VarChar(50), data.partNumber)
                .input('Quantity', mssql_1.default.Int, data.quantity)
                .input('UnitCost', mssql_1.default.Money, data.unitCost)
                .execute('Appointment.UpdatePart');
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    });
}
exports.TestUpdatePart = zod_1.z.object(Object.assign(Object.assign({}, validate_1.appointmentTest), { partID: zod_1.z.string(), partName: zod_1.z.string().max(50).or(zod_1.z.null()).optional(), partNumber: zod_1.z.string().max(50).or(zod_1.z.null()).optional(), quantity: validate_2.isInteger.or(zod_1.z.null()).optional(), unitCost: validate_2.isMoney.or(zod_1.z.null()).optional() }));
exports.UpdatePart = (0, Procedure_1.buildProcedure)(exports.TestUpdatePart, ExecuteUpdatePart);
