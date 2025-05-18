import { UNDEFINED_POOL } from "@/constant";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { Note, NoteAttachment } from "waltronics-types";
import { connect } from "@/utils/connect";
import { appointmentTest } from "@/validate";
import sql from "mssql";
import { z } from "zod";

export async function ExecuteSelectEmployeeNotes(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .execute('Appointment.GetEmployeeNotes');

        const recordsets: any = output.recordsets;

        // For ease of use, we're attaching the
        // attachments to the notes. Then, we'll
        // be able to easily see the attachments
        // of a note through the note itself.
        const notes: Array<Note> = recordsets[0];
        const attachments: Array<NoteAttachment> = recordsets[1];
        const sharees: Array<{NoteID: string, ShareeID: string}> = recordsets[2];
        connect(notes, attachments, "NoteID", "Attachments");
        connect(notes, sharees, "NoteID", "Sharees");
        return notes;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}
export const TestSelectEmployeeNotes = z.object(appointmentTest);
export const SelectEmployeeNotes = buildProcedure(TestSelectEmployeeNotes, ExecuteSelectEmployeeNotes);