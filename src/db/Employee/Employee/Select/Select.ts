import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { isUUID } from "@/validate";
import { Employee } from "waltronics-types";

export async function ExecuteSelectEmployee(data: Data): Promise<Employee|null> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .execute("Employee.Get");
        return output.recordset[0];
    }
    catch (err) {
        console.error(err);
        return null;
    }
}
export const TestSelectEmployee = z.object({sessionID: isUUID});
export const SelectEmployee = buildProcedure(TestSelectEmployee, ExecuteSelectEmployee);