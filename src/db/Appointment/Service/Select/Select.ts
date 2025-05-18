import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { Service } from "waltronics-types";

export async function ExecuteSelectServices(data: Data): Promise<Array<Service>> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .execute('Appointment.GetServices');
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}
export const TestSelectServices = z.object(appointmentTest);
export const SelectServices = buildProcedure(TestSelectServices, ExecuteSelectServices);