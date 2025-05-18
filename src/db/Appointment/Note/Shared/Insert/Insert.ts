import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { noteTest } from "@/validate";
import { isUUID } from "@/validate";

export async function ExecuteInsertNoteSharee(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('NoteID', sql.Int, data.noteID)
            .input('NoteShareeID', sql.Char(36), data.noteShareeID)
            .execute('Appointment.InsertNoteSharee')
            
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
export const TestInsertNoteSharee = z.object({...noteTest, noteShareeID: isUUID});
export const InsertNoteSharee = buildProcedure(TestInsertNoteSharee, ExecuteInsertNoteSharee);