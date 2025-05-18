import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { Repair } from "waltronics-types";

export async function ExecuteSelectRepairs(data: Data): Promise<Array<Repair>> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .execute('Appointment.GetRepairs');
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}
export const TestSelectRepairs = z.object(appointmentTest);
export const SelectRepairs = buildProcedure(TestSelectRepairs, ExecuteSelectRepairs)