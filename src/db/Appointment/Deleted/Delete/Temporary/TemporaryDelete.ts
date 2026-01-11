import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { appointmentTest } from "@/validate";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";

export async function ExecuteTemporarilyDeleteAppointment(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .execute("Appointment.TDelete");
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestTemporarilyDeleteAppointment = z.object(appointmentTest);

export const TemporarilyDeleteAppointment = buildProcedure(
    TestTemporarilyDeleteAppointment, 
    ExecuteTemporarilyDeleteAppointment
);