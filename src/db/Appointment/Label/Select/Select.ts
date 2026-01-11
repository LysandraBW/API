import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { appointmentTest } from "@/validate";
import { UNDEFINED_POOL } from "@/constant";
import { getEmployeePool } from "@/pool";
import { structure } from "@/utils/structure";
import { AppointmentLabels } from "waltronics-types";

export async function ExecuteSelectLabels(data: Data): Promise<AppointmentLabels|null> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        
        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .execute("Appointment.GetLabels");
        
            const labels = output.recordset;
        const structuredLabels = structure(labels, "LabelID");

        return structuredLabels;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

export const TestSelectLabels = z.object(appointmentTest);

export const SelectLabels = buildProcedure(
    TestSelectLabels, 
    ExecuteSelectLabels
);