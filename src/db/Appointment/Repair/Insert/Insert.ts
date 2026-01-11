import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { FAILED_INSERT, UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { isRepair } from "waltronics-types";

export async function ExecuteInsertRepair(data: Data): Promise<number> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('Repair', sql.VarChar, data.repair)
            .execute('Appointment.InsertRepair');
        return output.recordset[0].RepairID;
    }
    catch (err) {
        console.error(err);
        return FAILED_INSERT;
    }
}

export const TestInsertRepair = z.object({
    ...appointmentTest, 
    repair: isRepair
});

export const InsertRepair = buildProcedure(TestInsertRepair, ExecuteInsertRepair);