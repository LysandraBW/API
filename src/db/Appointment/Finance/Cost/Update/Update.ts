import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { isMoney } from "@/validate";

export async function ExecuteUpdateCost(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('Cost', sql.Float, data.cost)
            .execute('Appointment.UpdateCost');
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
export const TestUpdateCost = z.object({...appointmentTest, cost: isMoney.optional()});
export const UpdateCost = buildProcedure(TestUpdateCost, ExecuteUpdateCost);