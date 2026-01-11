import { z } from "zod";
import sql from "mssql";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { noteTest } from "@/validate";
import { isInteger } from "waltronics-types";
import { Data, buildProcedure } from "@/db/Procedure";

export async function ExecuteDeleteNoteAttachment(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AttachmentID', sql.Int, data.attachmentID)
            .input('NoteID', sql.Int, data.noteID)
            .execute('Appointment.DeleteNoteAttachment');
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestDeleteNoteAttachment = z.object({...noteTest, attachmentID: isInteger});
export const DeleteNoteAttachment = buildProcedure(TestDeleteNoteAttachment, ExecuteDeleteNoteAttachment);