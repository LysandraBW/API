import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { isInteger } from "@/validate";

export async function ExecuteDeleteRepair(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('RepairID', sql.Int, data.repairID)
            .execute('Appointment.DeleteRepair');
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
export const TestDeleteRepair = z.object({...appointmentTest, repairID: isInteger});
export const DeleteRepair = buildProcedure(TestDeleteRepair, ExecuteDeleteRepair);