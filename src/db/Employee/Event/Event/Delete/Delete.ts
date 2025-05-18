import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { eventTest } from "@/validate";

export async function ExecuteDeleteEvent(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("EventID", sql.Int, data.eventID)
            .execute("Employee.DeleteEvent");
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
export const TestDeleteEvent = z.object(eventTest);
export const DeleteEvent = buildProcedure(TestDeleteEvent, ExecuteDeleteEvent);