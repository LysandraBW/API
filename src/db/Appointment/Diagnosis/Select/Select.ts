import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { appointmentTest } from "@/validate";
import { UNDEFINED_POOL } from "@/constant";
import { getEmployeePool } from "@/pool";
import { Diagnosis } from "waltronics-types";

export async function ExecuteSelectDiagnoses(data: Data): Promise<Array<Diagnosis>> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .execute('Appointment.GetDiagnoses');
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export const TestSelectDiagnoses = z.object(appointmentTest);

export const SelectDiagnoses = buildProcedure(
    TestSelectDiagnoses, 
    ExecuteSelectDiagnoses
);