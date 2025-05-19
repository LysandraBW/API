import 'dotenv/config';
import sql from "mssql";
import { Role, EMPLOYEE, APPOINTMENT_HOLDER } from './constant';

const ENV = {
    DB: process.env.DB || "",
    DB_Host: process.env.DB_HOST || "",
    Login: {        
        Standard: [process.env.DB_D1 || "", process.env.DB_D2 || ""],
        Customer: [process.env.DB_C1 || "", process.env.DB_C2 || ""],
        Employee: [process.env.DB_E1 || "", process.env.DB_E2 || ""],
        AppointmentHolder: [process.env.DB_A1 || "", process.env.DB_A2 || ""],
    }
}

const CONFIG = (login: string[]) => ({
    user:       login[0],
    password:   login[1],
    database:   ENV.DB,
    server:     ENV.DB_Host,
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
});

const StandardPool = (new sql.ConnectionPool(CONFIG(ENV.Login.Standard))).connect();
const EmployeePool = (new sql.ConnectionPool(CONFIG(ENV.Login.Employee))).connect();
const AppointmentHolderPool = (new sql.ConnectionPool(CONFIG(ENV.Login.AppointmentHolder))).connect();

export const authenticate = async (sessionID: string, role: string) => {
    try {
        (await StandardPool).request()
            .input("Role", role)
            .input("SessionID", sql.UniqueIdentifier, sessionID)
            .output("ID", sql.UniqueIdentifier)
            .execute("Session.Authenticate")
        return true
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const getPool = async (sessionID: string, role: Role) => {
    if (role === EMPLOYEE)
        return getEmployeePool(sessionID);
    if (role === APPOINTMENT_HOLDER)
        return getAppointmentHolderPool(sessionID);
    return StandardPool;
}

export const getStandardPool = async () => {
    return StandardPool;
}

export const getEmployeePool = async (sessionID: string) => {
    if (!(await authenticate(sessionID, EMPLOYEE)))
        return StandardPool;
    return EmployeePool;
}

export const getAppointmentHolderPool = async (sessionID: string) => {
    if (!(await authenticate(sessionID, APPOINTMENT_HOLDER)))
        return StandardPool;
    return AppointmentHolderPool;
}

// These will be commented out as the naming created ambiguity.
// There's also not an actual "Customer" yet, so it's not smart
// to have this.
// const CustomerPool = (new sql.ConnectionPool(CONFIG(ENV.Login.Customer))).connect();
// export const getCustomerPool = async (sessionID: string) => {
//     if (!(await authenticate(sessionID, "Appointment")))
//         return StandardPool;
//     return CustomerPool;
// }