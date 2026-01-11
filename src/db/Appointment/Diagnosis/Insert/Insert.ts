import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { FAILED_INSERT, UNDEFINED_POOL } from "@/constant";
import { getEmployeePool } from "@/pool";
import { appointmentTest } from "@/validate";
import { isCode, isMessage } from "waltronics-types";

export async function ExecuteInsertDiagnosis(data: Data): Promise<number> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .input("Code", sql.VarChar(20), data.code)
            .input("Message", sql.VarChar(500), data.message)
            .execute("Appointment.InsertDiagnosis");
        return output.recordset[0].DiagnosisID;
    }
    catch (error) {
        console.error(error);
        return FAILED_INSERT;
    }
}

export const TestInsertDiagnosis = z.object({
    ...appointmentTest,
    code: isCode,
    message: isMessage
});

export const InsertDiagnosis = buildProcedure(
    TestInsertDiagnosis, 
    ExecuteInsertDiagnosis
);