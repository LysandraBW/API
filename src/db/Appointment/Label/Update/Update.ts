import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { appointmentTest } from "@/validate";
import { UNDEFINED_POOL } from "@/constant";
import { getEmployeePool } from "@/pool";
import { isBit, isEmptyString, isInteger } from "waltronics-types";


export async function ExecuteUpdateLabel(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        
        const labelValue = (data.labelValue !== "" && data.labelValue !== null) ? parseInt(data.labelValue) : null;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('LabelID', sql.Int, data.labelID)
            .input('LabelValue', sql.Bit, labelValue)
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
    labelValue: z.union([
        isEmptyString(),
        isBit
    ]).nullish()
});


export const UpdateLabel = buildProcedure(
    TestUpdateLabel, 
    ExecuteUpdateLabel
);