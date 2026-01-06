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
exports.SelectEmployeeNotes = exports.TestSelectEmployeeNotes = void 0;
exports.ExecuteSelectEmployeeNotes = ExecuteSelectEmployeeNotes;
const constant_1 = require("../../../../../../constant");
const Procedure_1 = require("../../../../../../db/Procedure");
const pool_1 = require("../../../../../../pool");
const connect_1 = require("../../../../../../utils/connect");
const validate_1 = require("../../../../../../validate");
const mssql_1 = __importDefault(require("mssql"));
const zod_1 = require("zod");
function ExecuteSelectEmployeeNotes(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getEmployeePool)(data.sessionID);
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            const output = yield pool.request()
                .input('SessionID', mssql_1.default.Char(36), data.sessionID)
                .input('AppointmentID', mssql_1.default.UniqueIdentifier, data.appointmentID)
                .execute('Appointment.GetEmployeeNotes');
            const recordsets = output.recordsets;
            // For ease of use, we're attaching the
            // attachments to the notes. Then, we'll
            // be able to easily see the attachments
            // of a note through the note itself.
            const notes = recordsets[0];
            const attachments = recordsets[1];
            const sharees = recordsets[2];
            (0, connect_1.connect)(notes, attachments, "NoteID", "Attachments");
            (0, connect_1.connect)(notes, sharees, "NoteID", "Sharees");
            return notes;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    });
}
exports.TestSelectEmployeeNotes = zod_1.z.object(validate_1.appointmentTest);
exports.SelectEmployeeNotes = (0, Procedure_1.buildProcedure)(exports.TestSelectEmployeeNotes, ExecuteSelectEmployeeNotes);
