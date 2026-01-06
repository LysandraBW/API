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
exports.InsertNoteAttachment = exports.TestInsertNoteAttachment = void 0;
exports.ExecuteInsertNoteAttachment = ExecuteInsertNoteAttachment;
const zod_1 = require("zod");
const mssql_1 = __importDefault(require("mssql"));
const validate_1 = require("../../../../../validate");
const constant_1 = require("../../../../../constant");
const pool_1 = require("../../../../../pool");
const Procedure_1 = require("../../../../../db/Procedure");
exports.TestInsertNoteAttachment = zod_1.z.object(Object.assign(Object.assign({}, validate_1.noteTest), { name: zod_1.z.string().max(100), type: zod_1.z.string().max(100), url: zod_1.z.string().max(500) }));
function ExecuteInsertNoteAttachment(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getEmployeePool)(data.sessionID);
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            const output = yield pool.request()
                .input('SessionID', mssql_1.default.Char(36), data.sessionID)
                .input('NoteID', mssql_1.default.Int, data.noteID)
                .input('Name', mssql_1.default.VarChar(100), data.name)
                .input('Type', mssql_1.default.VarChar(100), data.type)
                .input('URL', mssql_1.default.VarChar(500), data.url)
                .execute('Appointment.InsertNoteAttachment');
            return output.recordset[0].AttachmentID;
        }
        catch (err) {
            console.error(err);
            return constant_1.FAILED_INSERT;
        }
    });
}
exports.InsertNoteAttachment = (0, Procedure_1.buildProcedure)(exports.TestInsertNoteAttachment, ExecuteInsertNoteAttachment);
