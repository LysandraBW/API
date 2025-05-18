import { z } from "zod";
import sql from "mssql";
import { getEmployeePool } from "@/pool";
import { FAILED_INSERT, UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { isBit } from "@/validate";
import { Data, buildProcedure } from "@/db/Procedure";

export const TestInsertNote = z.object({
    ...appointmentTest,
    head: z.string().max(100),
    body: z.string().max(500),
    showCustomer: isBit.transform(v => v === "1" ? 1 : 0)
});

export async function ExecuteInsertNote(data: Data): Promise<number> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('Head', sql.VarChar(100), data.head)
            .input('Body', sql.VarChar(500), data.body)
            .input('ShowCustomer', sql.Bit, data.showCustomer)
            .execute('Appointment.InsertNote');
        return output.recordset[0].NoteID;
    }
    catch (err) {
        console.error(err);
        return FAILED_INSERT;
    }
}

export const InsertNote = buildProcedure(TestInsertNote, ExecuteInsertNote);