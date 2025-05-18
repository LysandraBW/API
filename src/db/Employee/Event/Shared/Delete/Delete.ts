import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { eventTest } from "@/validate";
import { isUUID } from "@/validate";

export async function ExecuteDeleteEventSharee(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("EventID", sql.Int, data.eventID)
            .input("EventShareeID", sql.UniqueIdentifier, data.eventShareeID)
            .execute("Employee.DeleteEventSharee");
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
export const TestDeleteEventSharee = z.object({...eventTest, eventShareeID: isUUID});
export const DeleteEventSharee = buildProcedure(TestDeleteEventSharee, ExecuteDeleteEventSharee);