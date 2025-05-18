import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "@/constant";
import { getEmployeePool } from "@/pool";
import { appointmentTest } from "@/validate";
import { Data, buildProcedure } from "@/db/Procedure";

export async function ExecutePDeleteAppointment(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .execute("Appointment.PDelete");
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export const TestPDeleteAppointment = z.object(appointmentTest);
export const PermanentlyDeleteAppointment = buildProcedure(TestPDeleteAppointment, ExecutePDeleteAppointment);