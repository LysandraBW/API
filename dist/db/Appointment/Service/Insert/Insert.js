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
exports.InsertService = exports.TestInsertService = void 0;
exports.ExecuteInsertService = ExecuteInsertService;
const zod_1 = require("zod");
const mssql_1 = __importDefault(require("mssql"));
const Procedure_1 = require("../../../../db/Procedure");
const pool_1 = require("../../../../pool");
const constant_1 = require("../../../../constant");
const validate_1 = require("../../../../validate");
function ExecuteInsertService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getEmployeePool)(data.sessionID);
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            const output = yield pool.request()
                .input('SessionID', mssql_1.default.Char(36), data.sessionID)
                .input('AppointmentID', mssql_1.default.UniqueIdentifier, data.appointmentID)
                .input('Service', mssql_1.default.VarChar(50), data.service)
                .input('Division', mssql_1.default.VarChar(50), data.division)
                .input('Class', mssql_1.default.VarChar(50), data.class)
                .execute('Appointment.InsertService');
            return output.recordset[0].ServiceID;
        }
        catch (err) {
            console.error(err);
            return constant_1.FAILED_INSERT;
        }
    });
}
exports.TestInsertService = zod_1.z.object(Object.assign(Object.assign({}, validate_1.appointmentTest), { service: zod_1.z.string().max(50), division: zod_1.z.string().max(50), class: zod_1.z.string().max(50) }));
exports.InsertService = (0, Procedure_1.buildProcedure)(exports.TestInsertService, ExecuteInsertService);
