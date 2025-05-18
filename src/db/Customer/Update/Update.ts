import { z } from "zod";
import sql from "mssql";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { isEmail, isName, isPhone } from "@/validate";
import { buildProcedure, Data } from "../../Procedure";

export async function ExecuteUpdateCustomer(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .input("FName", sql.NVarChar(50), data.fName)
            .input("LName", sql.NVarChar(50), data.lName)
            .input("Email", sql.NVarChar(320), data.email)
            .input("Phone", sql.NVarChar(15), data.phone)
            .execute("Customer.UpdateCustomer");
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestUpdateCustomer = z.object({
    ...appointmentTest,
    fName: isName.optional(),
    lName: isName.optional(),
    email: isEmail.optional(),
    phone: isPhone.optional()
});

export const UpdateCustomer = buildProcedure(TestUpdateCustomer, ExecuteUpdateCustomer);