import { z } from "zod";
import sql from "mssql";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { connect } from "@/utils/connect";
import { structure } from "@/utils/structure";
import { buildProcedure, Data } from "@/db/Procedure";
import { Appointment } from "waltronics-types";
import { Note, NoteAttachment } from "waltronics-types";

export async function ExecuteSelectAppointment(data: Data): Promise<Appointment|null> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .execute("Appointment.Get");

        // Contains all the tables that were
        // selected in the prior proecdure.
        // This is stored in an array.
        const recordsets: any = output.recordsets;
        
        // The notes and note attachments are
        // returned separately. Here, we're
        // linking them together (ease of use).
        const notes: Array<Note> = recordsets[7];
        const noteAttachments: Array<NoteAttachment> = recordsets[8];
        const noteMembers: Array<{"NoteID": number, "ShareeID": number}> = recordsets[9];
        connect(notes, noteAttachments, "NoteID", "Attachments");
        connect(notes, noteMembers, "NoteID", "Sharees");

        // The labels are organized in an
        // unhelpful way. So, we're going to
        // organize them into an object for
        // ease of use.
        const labels = recordsets[6];
        const organizedLabels = structure(labels, "LabelID");

        return {
            ...recordsets[0][0],
            Services: recordsets[1],
            Diagnoses: recordsets[2],
            Repairs: recordsets[3],
            Parts: recordsets[4],
            Payments: recordsets[5],
            Labels: organizedLabels,
            Notes: notes
        }
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

export const TestSelectAppointment = z.object(appointmentTest);

export const SelectAppointment = buildProcedure(
    TestSelectAppointment, 
    ExecuteSelectAppointment
);