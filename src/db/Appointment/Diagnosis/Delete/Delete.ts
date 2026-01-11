import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { appointmentTest } from "@/validate";
import { isInteger } from "waltronics-types";
import { UNDEFINED_POOL } from "@/constant";
import { getEmployeePool } from "@/pool";

export async function ExecuteDeleteDiagnosis(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .input("DiagnosisID", sql.Int, data.diagnosisID)
            .execute("Appointment.DeleteDiagnosis");
        return true;

    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestDeleteDiagnosis = z.object({...appointmentTest, diagnosisID: isInteger});

export const DeleteDiagnosis = buildProcedure(
    TestDeleteDiagnosis, 
    ExecuteDeleteDiagnosis
);