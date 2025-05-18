import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { appointmentTest } from "@/validate";
import { UNDEFINED_POOL } from "@/constant";
import { getEmployeePool } from "@/pool";
import { isInteger } from "@/validate";

export async function ExecuteDeleteNote(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('NoteID', sql.Int, data.noteID)
            .execute('Appointment.DeleteNote');
        
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
export const TestDeleteNote = z.object({...appointmentTest, noteID: isInteger});
export const DeleteNote = buildProcedure(TestDeleteNote, ExecuteDeleteNote);