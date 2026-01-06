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
exports.InsertNoteSharee = exports.TestInsertNoteSharee = void 0;
exports.ExecuteInsertNoteSharee = ExecuteInsertNoteSharee;
const zod_1 = require("zod");
const mssql_1 = __importDefault(require("mssql"));
const Procedure_1 = require("../../../../../db/Procedure");
const pool_1 = require("../../../../../pool");
const constant_1 = require("../../../../../constant");
const validate_1 = require("../../../../../validate");
const validate_2 = require("../../../../../validate");
function ExecuteInsertNoteSharee(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getEmployeePool)(data.sessionID);
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            yield pool.request()
                .input('SessionID', mssql_1.default.Char(36), data.sessionID)
                .input('NoteID', mssql_1.default.Int, data.noteID)
                .input('NoteShareeID', mssql_1.default.Char(36), data.noteShareeID)
                .execute('Appointment.InsertNoteSharee');
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    });
}
exports.TestInsertNoteSharee = zod_1.z.object(Object.assign(Object.assign({}, validate_1.noteTest), { noteShareeID: validate_2.isUUID }));
exports.InsertNoteSharee = (0, Procedure_1.buildProcedure)(exports.TestInsertNoteSharee, ExecuteInsertNoteSharee);
