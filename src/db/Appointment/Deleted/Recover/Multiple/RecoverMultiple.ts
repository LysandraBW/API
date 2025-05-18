import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { isUUID, isUUIDArray } from "@/validate";
import { UNDEFINED_POOL } from "@/constant";
import { getEmployeePool } from "@/pool";

export async function ExecuteRecoverAppointments(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentIDs", sql.VarChar(1000), data.appointmentIDs.join(","))
            .execute("Appointment.RecoverMultiple");
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
export const TestRecoverAppointments = z.object({sessionID: isUUID, appointmentIDs: isUUIDArray});
export const RecoverAppointments = buildProcedure(TestRecoverAppointments, ExecuteRecoverAppointments);