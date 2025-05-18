import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest, isInteger } from "@/validate";

export async function ExecuteUpdateService(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('ServiceID', sql.Int, data.serviceID)
            .input('Service', sql.VarChar(50), data.service)
            .input('Division', sql.VarChar(50), data.division)
            .input('Class', sql.VarChar(50), data.class)
            .execute('Appointment.UpdateService');
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestUpdateService = z.object({
    ...appointmentTest,
    serviceID: isInteger,
    service: z.string().max(50).optional(),
    division: z.string().max(50).optional(),
    class: z.string().max(50).optional()
});

export const UpdateService = buildProcedure(TestUpdateService, ExecuteUpdateService);