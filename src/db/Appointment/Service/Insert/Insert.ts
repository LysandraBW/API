import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { FAILED_INSERT, UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { isClass, isDivision, isService } from "waltronics-types";

export async function ExecuteInsertService(data: Data): Promise<number> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('Service', sql.VarChar(50), data.service)
            .input('Division', sql.VarChar(50), data.division)
            .input('Class', sql.VarChar(50), data.class)
            .execute('Appointment.InsertService');
        return output.recordset[0].ServiceID;
    }
    catch (err) {
        console.error(err);
        return FAILED_INSERT;
    }
}

export const TestInsertService = z.object({
    ...appointmentTest,
    service: isService,
    division: isDivision,
    class: isClass
});

export const InsertService = buildProcedure(TestInsertService, ExecuteInsertService);