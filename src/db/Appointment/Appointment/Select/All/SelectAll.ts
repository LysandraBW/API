import { z } from "zod";
import sql from "mssql";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { isBit, isInteger, isUUID } from "@/validate";
import { structureTwo } from "@/utils/structure";
import { buildProcedure, Data } from "@/db/Procedure";
import { Label } from "waltronics-types";
import { AppointmentList } from "waltronics-types"

export async function ExecuteSelectAllAppointments(data: Data): Promise<AppointmentList> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            // .input("PageNumber", sql.Int, data.pageNumber)
            // .input("PageSize", sql.Int, data.pageSize)
            // .input("LookAhead", sql.Int, data.lookAhead)
            .input("Search", sql.VarChar(320), data.search)
            .input("Deleted", sql.Bit, parseInt(data.deleted))
            .input("LabelID", sql.Int, data.labelID)
            .input("StatusID", sql.Int, data.statusID)
            .execute("Appointment.GetAll");

        const recordsets: any = output.recordsets;
        // The labels are organized in an unhelpful way.
        // So, we're going to organize them by apt ID and
        // label name, so that we can easily find a label
        // for a given appointment. This is alike to what
        // we did in selectAppointment, but on the scale
        // of thousands of appointments.
        const labels: Array<Label> = recordsets[2];
        const sortedLabels = structureTwo(labels, "AppointmentID", "Label");
        for (const appointment of recordsets[0])
            appointment.Labels = sortedLabels[appointment.AppointmentID];
        
        return {
            Appointments: recordsets[0],
            Count: recordsets[1][0].Count
        }
    }
    catch (err) {
        console.error(err);
        return {
            Appointments: [],
            Count: 0
        };
    }
}

export const TestSelectAllAppointments = z.object({
    sessionID: isUUID,
    pageNumber: isInteger.optional(),
    pageSize: isInteger.optional(),
    lookAhead: isInteger.optional(),
    search: z.string().max(320).optional(),
    deleted: isBit.optional(),
    labelID: isInteger.or(z.string().transform(s => null)),
    statusID: isInteger.or(z.string().transform(s => null)),
    fName: isBit.optional(),
    lName: isBit.optional(),
    make: isBit.optional(),
    model: isBit.optional(),
    modelYear: isBit.optional(),
    creationDate: isBit.optional(),
    startDate: isBit.optional(),
    endDate: isBit.optional(),
    cost: isBit.optional()
});

export const SelectAllAppointments = buildProcedure(TestSelectAllAppointments, ExecuteSelectAllAppointments);