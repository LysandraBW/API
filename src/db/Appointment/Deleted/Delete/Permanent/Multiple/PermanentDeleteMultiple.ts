import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { isUUID, isUUIDArray } from "@/validate";

export async function ExecutePermanentlyDeleteAppointments(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentIDs", sql.VarChar(1000), (data.appointmentIDs as Array<string>).join(","))
            .execute("Appointment.PDeleteMultiple");
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
export const TestPermanentlyDeleteAppointments = z.object({
    sessionID: isUUID, 
    appointmentIDs: isUUIDArray
});

export const PermanentlyDeleteAppointments = buildProcedure(
    TestPermanentlyDeleteAppointments, 
    ExecutePermanentlyDeleteAppointments
);