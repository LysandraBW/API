import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { noteTest } from "@/validate";
import { isUUID } from "@/validate";

export async function ExecuteDeleteNoteSharee(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('NoteID', sql.Int, data.noteID)
            .input('NoteShareeID', sql.UniqueIdentifier, data.noteShareeID)
            .execute('Appointment.DeleteNoteSharee');
            
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
export const TestDeleteNoteSharee = z.object({...noteTest, noteShareeID: isUUID});
export const DeleteNoteSharee = buildProcedure(TestDeleteNoteSharee, ExecuteDeleteNoteSharee);