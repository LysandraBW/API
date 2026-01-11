import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getStandardPool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";

export async function ExecuteLogin(data: Data): Promise<string> {
    try {
        const pool = await getStandardPool();
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input("Username", sql.VarChar(50), data.username)
            .input("Password", sql.VarChar(50), data.password)
            .output("SessionID", sql.Char(36))
            .execute("Employee.LoginEmployee")
        return output.output.SessionID;
    }
    catch (err) {
        console.error(err);
        return "";
    }
}

export const TestLogin = z.object({
    username: z.string().max(50), 
    password: z.string().max(50)
});

export const EmployeeLogin = buildProcedure(
    TestLogin, 
    ExecuteLogin
);