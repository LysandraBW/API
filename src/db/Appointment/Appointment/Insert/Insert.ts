import { z } from "zod";
import sql from "mssql";
import { buildProcedure, Data } from "@/db/Procedure";
import { getStandardPool } from "@/pool";
import { FAILED_INSERT, UNDEFINED_POOL } from "@/constant";
import { hasLength, isEmail, isInteger, isIntegerArray, isName, isPhone, isVIN } from "@/validate";

export async function ExecuteInsertAppointment(data: Data): Promise<string> {
    try {
        const pool = await getStandardPool();
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("FName", sql.VarChar(50), data.fName)
            .input("LName", sql.VarChar(50), data.lName)
            .input("Email", sql.VarChar(320), data.email)
            .input("Phone", sql.VarChar(25), data.phone)
            .input("Make", sql.VarChar(50), data.make)
            .input("Model", sql.VarChar(50), data.model)
            .input("ModelYear", sql.Int, data.modelYear)
            .input("VIN", sql.VarChar(17), data.vin)
            .input("Services", sql.VarChar(1000), data.services.join(","))
            .execute("Appointment.InsertAppointment");
        return output.recordset[0].AppointmentID;
    }
    catch (err) {
        console.error(err);
        return "";
    }
}

export const TestInsertAppointment = z.object({
    fName: isName,
    lName: isName,
    email: isEmail,
    phone: isPhone,
    make: hasLength,
    model: hasLength,
    modelYear: isInteger,
    services: isIntegerArray,
    vin: isVIN.or(z.literal("")).or(z.literal(null)).optional()
});

export const InsertAppointment = buildProcedure(TestInsertAppointment, ExecuteInsertAppointment);