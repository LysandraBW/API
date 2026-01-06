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
exports.SelectAppointment = exports.TestSelectAppointment = void 0;
exports.ExecuteSelectAppointment = ExecuteSelectAppointment;
const zod_1 = require("zod");
const mssql_1 = __importDefault(require("mssql"));
const pool_1 = require("../../../../pool");
const constant_1 = require("../../../../constant");
const validate_1 = require("../../../../validate");
const connect_1 = require("../../../../utils/connect");
const structure_1 = require("../../../../utils/structure");
const Procedure_1 = require("../../../../db/Procedure");
function ExecuteSelectAppointment(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getEmployeePool)(data.sessionID);
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            const output = yield pool.request()
                .input("SessionID", mssql_1.default.Char(36), data.sessionID)
                .input("AppointmentID", mssql_1.default.UniqueIdentifier, data.appointmentID)
                .execute("Appointment.Get");
            // Contains all the tables that were
            // selected in the prior proecdure.
            // This is stored in an array.
            const recordsets = output.recordsets;
            // The notes and note attachments are
            // returned separately. Here, we're
            // linking them together (ease of use).
            const notes = recordsets[7];
            const noteAttachments = recordsets[8];
            const noteMembers = recordsets[9];
            (0, connect_1.connect)(notes, noteAttachments, "NoteID", "Attachments");
            (0, connect_1.connect)(notes, noteMembers, "NoteID", "Sharees");
            // The labels are organized in an
            // unhelpful way. So, we're going to
            // organize them into an object for
            // ease of use.
            const labels = recordsets[6];
            const organizedLabels = (0, structure_1.structure)(labels, "LabelID");
            return Object.assign(Object.assign({}, recordsets[0][0]), { Services: recordsets[1], Diagnoses: recordsets[2], Repairs: recordsets[3], Parts: recordsets[4], Payments: recordsets[5], Labels: organizedLabels, Notes: notes });
        }
        catch (err) {
            console.error(err);
            return null;
        }
    });
}
exports.TestSelectAppointment = zod_1.z.object(validate_1.appointmentTest);
exports.SelectAppointment = (0, Procedure_1.buildProcedure)(exports.TestSelectAppointment, ExecuteSelectAppointment);
