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
exports.getAppointmentHolderPool = exports.getEmployeePool = exports.getStandardPool = exports.getPool = exports.authenticate = void 0;
require("dotenv/config");
const mssql_1 = __importDefault(require("mssql"));
const constant_1 = require("./constant");
const ENV = {
    DB: process.env.DB || "",
    DB_Host: process.env.DB_HOST || "",
    Login: {
        Standard: [process.env.DB_D1 || "", process.env.DB_D2 || ""],
        Customer: [process.env.DB_C1 || "", process.env.DB_C2 || ""],
        Employee: [process.env.DB_E1 || "", process.env.DB_E2 || ""],
        AppointmentHolder: [process.env.DB_A1 || "", process.env.DB_A2 || ""],
    }
};
const CONFIG = (login) => ({
    user: login[0],
    password: login[1],
    database: ENV.DB,
    server: ENV.DB_Host,
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
});
const StandardPool = (new mssql_1.default.ConnectionPool(CONFIG(ENV.Login.Standard))).connect();
const EmployeePool = (new mssql_1.default.ConnectionPool(CONFIG(ENV.Login.Employee))).connect();
const AppointmentHolderPool = (new mssql_1.default.ConnectionPool(CONFIG(ENV.Login.AppointmentHolder))).connect();
const authenticate = (sessionID, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (yield StandardPool).request()
            .input("Role", role)
            .input("SessionID", mssql_1.default.UniqueIdentifier, sessionID)
            .output("ID", mssql_1.default.UniqueIdentifier)
            .execute("Session.Authenticate");
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
});
exports.authenticate = authenticate;
const getPool = (sessionID, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === constant_1.EMPLOYEE)
        return (0, exports.getEmployeePool)(sessionID);
    if (role === constant_1.APPOINTMENT_HOLDER)
        return (0, exports.getAppointmentHolderPool)(sessionID);
    return StandardPool;
});
exports.getPool = getPool;
const getStandardPool = () => __awaiter(void 0, void 0, void 0, function* () {
    return StandardPool;
});
exports.getStandardPool = getStandardPool;
const getEmployeePool = (sessionID) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, exports.authenticate)(sessionID, constant_1.EMPLOYEE)))
        return StandardPool;
    return EmployeePool;
});
exports.getEmployeePool = getEmployeePool;
const getAppointmentHolderPool = (sessionID) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, exports.authenticate)(sessionID, constant_1.APPOINTMENT_HOLDER)))
        return StandardPool;
    return AppointmentHolderPool;
});
exports.getAppointmentHolderPool = getAppointmentHolderPool;
// These will be commented out as the naming created ambiguity.
// There's also not an actual "Customer" yet, so it's not smart
// to have this.
// const CustomerPool = (new sql.ConnectionPool(CONFIG(ENV.Login.Customer))).connect();
// export const getCustomerPool = async (sessionID: string) => {
//     if (!(await authenticate(sessionID, "Appointment")))
//         return StandardPool;
//     return CustomerPool;
// }
