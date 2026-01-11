import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { FAILED_INSERT, UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { isID } from "waltronics-types";

export async function ExecuteInsertDefinedService(data: Data): Promise<number> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('ServiceID', sql.Int, data.serviceID)
            .execute('Appointment.InsertDefinedService');
        return output.recordset[0].ServiceID;
    }
    catch (err) {
        console.error(err);
        return FAILED_INSERT;
    }
}
export const TestInsertDefinedService = z.object({...appointmentTest, serviceID: isID});
export const InsertDefinedService = buildProcedure(TestInsertDefinedService, ExecuteInsertDefinedService);