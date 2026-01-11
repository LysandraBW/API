import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { isUUID, isUUIDArray } from "waltronics-types";
import { UNDEFINED_POOL } from "@/constant";
import { getEmployeePool } from "@/pool";

export async function ExecuteTemporarilyDeleteAppointments(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentIDs", sql.VarChar(1000), (data.appointmentIDs as Array<string>).join(","))
            .execute("Appointment.TDeleteMultiple");
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestTemporarilyDeleteAppointments = z.object({
    sessionID: isUUID, 
    appointmentIDs: isUUIDArray
});

export const TemporarilyDeleteAppointments = buildProcedure(
    TestTemporarilyDeleteAppointments, 
    ExecuteTemporarilyDeleteAppointments
);