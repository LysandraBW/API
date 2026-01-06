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
exports.InsertAppointment = exports.TestInsertAppointment = void 0;
exports.ExecuteInsertAppointment = ExecuteInsertAppointment;
const zod_1 = require("zod");
const mssql_1 = __importDefault(require("mssql"));
const Procedure_1 = require("../../../../db/Procedure");
const pool_1 = require("../../../../pool");
const constant_1 = require("../../../../constant");
const validate_1 = require("../../../../validate");
function ExecuteInsertAppointment(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getStandardPool)();
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            const output = yield pool.request()
                .input("SessionID", mssql_1.default.Char(36), data.sessionID)
                .input("FName", mssql_1.default.VarChar(50), data.fName)
                .input("LName", mssql_1.default.VarChar(50), data.lName)
                .input("Email", mssql_1.default.VarChar(320), data.email)
                .input("Phone", mssql_1.default.VarChar(25), data.phone)
                .input("Make", mssql_1.default.VarChar(50), data.make)
                .input("Model", mssql_1.default.VarChar(50), data.model)
                .input("ModelYear", mssql_1.default.Int, data.modelYear)
                .input("VIN", mssql_1.default.VarChar(17), data.vin)
                .input("Services", mssql_1.default.VarChar(1000), data.services.join(","))
                .execute("Appointment.InsertAppointment");
            return output.recordset[0].AppointmentID;
        }
        catch (err) {
            console.error(err);
            return "";
        }
    });
}
exports.TestInsertAppointment = zod_1.z.object({
    fName: validate_1.isName,
    lName: validate_1.isName,
    email: validate_1.isEmail,
    phone: validate_1.isPhone,
    make: validate_1.hasLength,
    model: validate_1.hasLength,
    modelYear: validate_1.isInteger,
    services: validate_1.isIntegerArray,
    vin: validate_1.isVIN.or(zod_1.z.literal("")).or(zod_1.z.literal(null)).optional()
});
exports.InsertAppointment = (0, Procedure_1.buildProcedure)(exports.TestInsertAppointment, ExecuteInsertAppointment);
