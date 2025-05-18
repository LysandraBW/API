import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { isUUID } from "@/validate";

export async function ExecuteLogout(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .execute("Employee.LogoutEmployee");
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
export const TestLogout = z.object({sessionID: isUUID});
export const EmployeeLogout = buildProcedure(TestLogout, ExecuteLogout);