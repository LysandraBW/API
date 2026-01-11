import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { eventTest } from "@/validate";
import { isUUID } from "waltronics-types";

export async function ExecuteInsertEventSharee(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("EventID", sql.Int, data.eventID)
            .input("EventShareeID", sql.UniqueIdentifier, data.eventShareeID)
            .execute("Employee.InsertEventSharee");
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
export const TestInsertEventSharee = z.object({...eventTest, eventShareeID: isUUID});
export const InsertEventSharee = buildProcedure(TestInsertEventSharee, ExecuteInsertEventSharee);