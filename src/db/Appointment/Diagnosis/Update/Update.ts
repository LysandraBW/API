import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { UNDEFINED_POOL } from "@/constant";
import { getEmployeePool } from "@/pool";
import { appointmentTest } from "@/validate";

export async function ExecuteUpdateDiagnosis(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('DiagnosisID', sql.Int, data.diagnosisID)
            .input('Code', sql.VarChar(20), data.code)
            .input('Message', sql.VarChar(500), data.message)
            .execute('Appointment.UpdateDiagnosis');
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestUpdateDiagnosis = z.object({
    ...appointmentTest,
    diagnosisID: z.string().max(20),
    code: z.string().max(20).or(z.null()).optional(),
    message: z.string().max(500).or(z.null()).optional()
});

export const UpdateDiagnosis = buildProcedure(TestUpdateDiagnosis, ExecuteUpdateDiagnosis);