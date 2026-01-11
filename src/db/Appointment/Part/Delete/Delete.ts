import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { appointmentTest } from "@/validate";
import { isInteger } from "waltronics-types";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";

export async function ExecuteDeletePart(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('PartID', sql.Int, data.partID)
            .execute('Appointment.DeletePart');
        return true;        
    }
    catch (err) {
        console.error(err);
        return false;
    }
} 

export const TestDeletePart = z.object({...appointmentTest, partID: isInteger});
export const DeletePart = buildProcedure(TestDeletePart, ExecuteDeletePart);