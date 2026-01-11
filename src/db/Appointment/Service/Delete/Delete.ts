import { z } from "zod";
import sql from "mssql";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { Data, buildProcedure } from "@/db/Procedure";
import { isID } from "waltronics-types";

export async function ExecuteDeleteService(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('ServiceID', sql.Int, data.serviceID)
            .execute('Appointment.DeleteService');
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
export const TestDeleteService = z.object({...appointmentTest, serviceID: isID});
export const DeleteService = buildProcedure(TestDeleteService, ExecuteDeleteService);