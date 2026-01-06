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
exports.TemporarilyDeleteAppointments = exports.TestTemporarilyDeleteAppointments = void 0;
exports.ExecuteTemporarilyDeleteAppointments = ExecuteTemporarilyDeleteAppointments;
const zod_1 = require("zod");
const mssql_1 = __importDefault(require("mssql"));
const Procedure_1 = require("../../../../../../db/Procedure");
const validate_1 = require("../../../../../../validate");
const constant_1 = require("../../../../../../constant");
const pool_1 = require("../../../../../../pool");
function ExecuteTemporarilyDeleteAppointments(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getEmployeePool)(data.sessionID);
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            yield pool.request()
                .input("SessionID", mssql_1.default.Char(36), data.sessionID)
                .input("AppointmentIDs", mssql_1.default.VarChar(1000), data.appointmentIDs.join(","))
                .execute("Appointment.TDeleteMultiple");
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    });
}
exports.TestTemporarilyDeleteAppointments = zod_1.z.object({
    sessionID: validate_1.isUUID,
    appointmentIDs: validate_1.isUUIDArray
});
exports.TemporarilyDeleteAppointments = (0, Procedure_1.buildProcedure)(exports.TestTemporarilyDeleteAppointments, ExecuteTemporarilyDeleteAppointments);
