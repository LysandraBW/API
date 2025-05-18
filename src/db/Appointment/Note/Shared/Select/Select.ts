import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest, isInteger, noteTest } from "@/validate";
import { NoteSharee } from "waltronics-types";

export async function ExecuteSelectNoteSharees(data: Data): Promise<Array<NoteSharee>> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('NoteID', sql.Int, data.noteID)
            .execute('Appointment.GetNoteSharees');
            
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}
export const TestSelectNoteSharees = z.object(noteTest);
export const SelectNoteSharees = buildProcedure(TestSelectNoteSharees, ExecuteSelectNoteSharees);