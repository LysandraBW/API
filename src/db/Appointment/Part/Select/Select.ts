import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { Part } from "waltronics-types";

export async function ExecuteSelectParts(data: Data): Promise<Array<Part>> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .execute('Appointment.GetParts')
        return output.recordset;           
    }
    catch (err) {
        console.error(err);
        return [];
    }
} 
export const TestSelectParts = z.object(appointmentTest);
export const SelectParts = buildProcedure(TestSelectParts, ExecuteSelectParts);