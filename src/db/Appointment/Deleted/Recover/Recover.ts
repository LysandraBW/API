import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { appointmentTest } from "@/validate";
import { UNDEFINED_POOL } from "@/constant";

export async function ExecuteRecoverAppointment(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .execute("Appointment.Recover");
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestRecoverAppointment = z.object(appointmentTest);

export const RecoverAppointment = buildProcedure(
    TestRecoverAppointment, 
    ExecuteRecoverAppointment
);