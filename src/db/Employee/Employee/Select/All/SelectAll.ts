import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { isUUID } from "@/validate";
import { EmployeeFullName } from "waltronics-types";

export async function ExecuteSelectAllEmployeeFullNames(data: Data): Promise<Array<EmployeeFullName>> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("IncludeMe", sql.Bit, 0)
            .execute("Employee.GetNames");
        
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}
export const TestSelectEmployeeNames = z.object({sessionID: isUUID});
export const SelectEmployeeNames = buildProcedure(TestSelectEmployeeNames, ExecuteSelectAllEmployeeFullNames);