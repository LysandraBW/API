import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";

export async function ExecuteUpdateRepair(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('RepairID', sql.Int, data.repairID)
            .input('Repair', sql.VarChar(500), data.repair)
            .execute('Appointment.UpdateRepair');
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestUpdateRepair = z.object({
    ...appointmentTest,
    repairID: z.string(),
    repair: z.string().max(500).or(z.null())
});

export const UpdateRepair = buildProcedure(TestUpdateRepair, ExecuteUpdateRepair);