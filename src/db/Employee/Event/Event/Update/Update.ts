import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { eventTest } from "@/validate";
import { isDate } from "@/validate";

export async function ExecuteUpdateEvent(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("EventID", sql.Int, data.eventID)
            .input("Name", sql.NVarChar, data.name)
            .input("Date", sql.NVarChar, data.date)
            .input("Summary", sql.NVarChar(500), data.summary)
            .execute("Employee.UpdateEvent");
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestUpdateEvent = z.object({
    ...eventTest,
    name: z.string().max(100).or(z.null()).optional(),
    date: isDate.optional(),
    summary: z.string().max(500).or(z.null()).optional()
});

export const UpdateEvent = buildProcedure(TestUpdateEvent, ExecuteUpdateEvent);