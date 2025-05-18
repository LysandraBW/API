import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { appointmentTest } from "@/validate";
import { isBit, isInteger } from "@/validate";
import { UNDEFINED_POOL } from "@/constant";
import { getEmployeePool } from "@/pool";

export async function ExecuteUpdateLabel(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('LabelID', sql.Int, data.labelID)
            .input('LabelValue', sql.Bit, data.labelValue)
            .execute('Appointment.UpdateLabel');
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestUpdateLabel = z.object({
    ...appointmentTest,
    labelID: isInteger,
    labelValue: isBit.optional().transform(v => v === "1" ? 1 : 0)
});

export const UpdateLabel = buildProcedure(TestUpdateLabel, ExecuteUpdateLabel);