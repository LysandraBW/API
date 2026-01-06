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
exports.SelectAllAppointments = exports.TestSelectAllAppointments = void 0;
exports.ExecuteSelectAllAppointments = ExecuteSelectAllAppointments;
const zod_1 = require("zod");
const mssql_1 = __importDefault(require("mssql"));
const pool_1 = require("../../../../../pool");
const constant_1 = require("../../../../../constant");
const validate_1 = require("../../../../../validate");
const structure_1 = require("../../../../../utils/structure");
const Procedure_1 = require("../../../../../db/Procedure");
function ExecuteSelectAllAppointments(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getEmployeePool)(data.sessionID);
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            const output = yield pool.request()
                .input("SessionID", mssql_1.default.Char(36), data.sessionID)
                // .input("PageNumber", sql.Int, data.pageNumber)
                // .input("PageSize", sql.Int, data.pageSize)
                // .input("LookAhead", sql.Int, data.lookAhead)
                .input("Search", mssql_1.default.VarChar(320), data.search)
                .input("Deleted", mssql_1.default.Bit, parseInt(data.deleted))
                .input("LabelID", mssql_1.default.Int, data.labelID)
                .input("StatusID", mssql_1.default.Int, data.statusID)
                .execute("Appointment.GetAll");
            const recordsets = output.recordsets;
            // The labels are organized in an unhelpful way.
            // So, we're going to organize them by apt ID and
            // label name, so that we can easily find a label
            // for a given appointment. This is alike to what
            // we did in selectAppointment, but on the scale
            // of thousands of appointments.
            const labels = recordsets[2];
            const sortedLabels = (0, structure_1.structureTwo)(labels, "AppointmentID", "Label");
            for (const appointment of recordsets[0])
                appointment.Labels = sortedLabels[appointment.AppointmentID];
            return {
                Appointments: recordsets[0],
                Count: recordsets[1][0].Count
            };
        }
        catch (err) {
            console.error(err);
            return {
                Appointments: [],
                Count: 0
            };
        }
    });
}
exports.TestSelectAllAppointments = zod_1.z.object({
    sessionID: validate_1.isUUID,
    pageNumber: validate_1.isInteger.optional(),
    pageSize: validate_1.isInteger.optional(),
    lookAhead: validate_1.isInteger.optional(),
    search: zod_1.z.string().max(320).optional(),
    deleted: validate_1.isBit.optional(),
    labelID: validate_1.isInteger.optional().or(zod_1.z.string().transform(s => null)),
    statusID: validate_1.isInteger.optional().or(zod_1.z.string().transform(s => null)),
    fName: validate_1.isBit.optional(),
    lName: validate_1.isBit.optional(),
    make: validate_1.isBit.optional(),
    model: validate_1.isBit.optional(),
    modelYear: validate_1.isBit.optional(),
    creationDate: validate_1.isBit.optional(),
    startDate: validate_1.isBit.optional(),
    endDate: validate_1.isBit.optional(),
    cost: validate_1.isBit.optional()
});
exports.SelectAllAppointments = (0, Procedure_1.buildProcedure)(exports.TestSelectAllAppointments, ExecuteSelectAllAppointments);
