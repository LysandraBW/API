import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { noteTest } from "@/validate";
import { isBit } from "@/validate";

export async function ExecuteUpdateNote(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('NoteID', sql.Int, data.noteID)
            .input('Head', sql.VarChar(100), data.head)
            .input('Body', sql.VarChar(500), data.body)
            .input('ShowCustomer', sql.Int, data.showCustomer)
            .execute('Appointment.UpdateNote');
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestUpdateNote = z.object({
    ...noteTest,
    head: z.string().max(100).or(z.null()).optional(),
    body: z.string().max(500).or(z.null()).optional(),
    showCustomer: isBit.optional()
});

export const UpdateNote = buildProcedure(TestUpdateNote, ExecuteUpdateNote);