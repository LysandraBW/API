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
exports.SelectProtectedAppointment = exports.TestSelectProtectedAppointment = void 0;
exports.ExecuteSelectProtectedAppointment = ExecuteSelectProtectedAppointment;
const zod_1 = require("zod");
const mssql_1 = __importDefault(require("mssql"));
const constant_1 = require("../../../../../constant");
const Procedure_1 = require("../../../../../db/Procedure");
const validate_1 = require("../../../../../validate");
const pool_1 = require("../../../../../pool");
function ExecuteSelectProtectedAppointment(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getPool)(data.sessionID, data.role);
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            const output = yield pool.request()
                .input("SessionID", data.sessionID)
                .input("AppointmentID", mssql_1.default.UniqueIdentifier, data.appointmentID)
                .execute("Appointment.GetProtected");
            return Object.assign(Object.assign({}, output.recordsets[0][0]), { Services: output.recordsets[1], Diagnoses: output.recordsets[2], Repairs: output.recordsets[3], Notes: output.recordsets[4] });
        }
        catch (err) {
            console.error(err);
            return null;
        }
    });
}
exports.TestSelectProtectedAppointment = zod_1.z.object(Object.assign(Object.assign({}, validate_1.appointmentTest), { role: zod_1.z.string().refine(s => [constant_1.APPOINTMENT_HOLDER, constant_1.EMPLOYEE].indexOf(s) !== -1) }));
exports.SelectProtectedAppointment = (0, Procedure_1.buildProcedure)(exports.TestSelectProtectedAppointment, ExecuteSelectProtectedAppointment);
