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
exports.UpdateVehicle = exports.TestUpdateVehicle = void 0;
exports.ExecuteUpdateVehicle = ExecuteUpdateVehicle;
const zod_1 = require("zod");
const mssql_1 = __importDefault(require("mssql"));
const Procedure_1 = require("../../../../db/Procedure");
const pool_1 = require("../../../../pool");
const constant_1 = require("../../../../constant");
const validate_1 = require("../../../../validate");
function ExecuteUpdateVehicle(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield (0, pool_1.getEmployeePool)(data.sessionID);
            if (!pool)
                throw constant_1.UNDEFINED_POOL;
            yield pool.request()
                .input('SessionID', mssql_1.default.Char(36), data.sessionID)
                .input('AppointmentID', mssql_1.default.UniqueIdentifier, data.appointmentID)
                .input('Make', mssql_1.default.VarChar(50), data.make)
                .input('Model', mssql_1.default.VarChar(50), data.model)
                .input('ModelYear', mssql_1.default.Int, data.modelYear)
                .input('VIN', mssql_1.default.VarChar(17), data.vin)
                .input('Mileage', mssql_1.default.Int, data.mileage)
                .input('LicensePlate', mssql_1.default.VarChar(8), data.licensePlate)
                .execute('Appointment.UpdateVehicle');
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    });
}
exports.TestUpdateVehicle = zod_1.z.object(Object.assign(Object.assign({}, validate_1.appointmentTest), { make: zod_1.z.string().max(50).or(zod_1.z.null()).optional(), model: zod_1.z.string().max(50).or(zod_1.z.null()).optional(), modelYear: zod_1.z.string().or(zod_1.z.null()).optional(), vin: validate_1.isVIN.or(zod_1.z.null()).optional(), mileage: zod_1.z.string().or(zod_1.z.null()).optional(), licensePlate: zod_1.z.string().max(8).or(zod_1.z.null()).optional() }));
exports.UpdateVehicle = (0, Procedure_1.buildProcedure)(exports.TestUpdateVehicle, ExecuteUpdateVehicle);
