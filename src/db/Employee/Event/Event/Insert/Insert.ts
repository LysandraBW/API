import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { FAILED_INSERT, UNDEFINED_POOL } from "@/constant";
import { isDate, isUUID } from "@/validate";

export async function ExecuteInsertEvent(data: Data): Promise<number> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("Name", sql.VarChar(100), data.name)
            .input("Date", sql.VarChar(30), data.date)
            .input("Summary", sql.VarChar(500), data.summary)
            .execute("Employee.InsertEvent");
        return output.recordset[0].EventID;
    }
    catch (err) {
        console.error(err);
        return FAILED_INSERT;
    }
}

export const TestInsertEvent = z.object({
    sessionID: isUUID,
    name: z.string().max(100),
    date: isDate,
    summary: z.string().max(500)
});

export const InsertEvent = buildProcedure(TestInsertEvent, ExecuteInsertEvent);