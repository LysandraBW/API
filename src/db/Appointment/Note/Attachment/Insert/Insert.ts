import { z } from "zod";
import sql from "mssql";
import { noteTest } from "@/validate";
import { FAILED_INSERT, UNDEFINED_POOL } from "@/constant";
import { getEmployeePool } from "@/pool";
import { Data, buildProcedure } from "@/db/Procedure";

export const TestInsertNoteAttachment = z.object({
    ...noteTest,
    name: z.string().max(100),
    type: z.string().max(100),
    url: z.string().max(500)
});

export async function ExecuteInsertNoteAttachment(data: Data): Promise<number> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('NoteID', sql.Int, data.noteID)
            .input('Name', sql.VarChar(100), data.name)
            .input('Type', sql.VarChar(100), data.type)
            .input('URL', sql.VarChar(500), data.url)
            .execute('Appointment.InsertNoteAttachment');
        return output.recordset[0].AttachmentID;
    }
    catch (err) {
        console.error(err);
        return FAILED_INSERT;
    }
}

export const InsertNoteAttachment = buildProcedure(
    TestInsertNoteAttachment, 
    ExecuteInsertNoteAttachment
);