"use strict";
// README: This procedure is out of commission until I figure out when to use AppointmentHolder or Customer, or if I can use both somehow.\
// import { z } from "zod";
// import sql from "mssql";
// import { appointmentTest } from "../../../../../../validate";
// import { Data, buildProcedure } from "../../../../../../db/Procedure";
// import { getCustomerPool } from "../../../../../../pool";
// import { UNDEFINED_POOL } from "../../../../../../constant";
// import { connect } from "../../../../../../utils/connect";
// import { Note, NoteAttachment } from "waltronics-types";
// export async function ExecuteSelectCustomerNotes(data: Data) {
//     try {
//         const pool = await getCustomerPool(data.sessionID);
//         if (!pool)
//             throw UNDEFINED_POOL;
//         const output = await pool.request()
//             .input('SessionID', sql.Char(36), data.sessionID)
//             .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
//             .execute('Appointment.GetCustomerNotes');    
//         const recordsets: any = output.recordsets;
//         const notes: Array<Note> = recordsets[0];
//         const attachments: Array<NoteAttachment> = recordsets[1];
//         connect(notes, attachments, "NoteID", "Attachments");
//         return notes;
//     }
//     catch (err) {
//         console.error(err);
//         return [];
//     }
// }
// export const TestSelectCustomerNotes = z.object(appointmentTest);
// export const SelectCustomerNotes = buildProcedure(TestSelectCustomerNotes, ExecuteSelectCustomerNotes);
