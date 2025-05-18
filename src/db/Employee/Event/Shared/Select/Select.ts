import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { eventTest } from "@/validate";
import { EventSharee } from "waltronics-types";

export async function ExecuteSelectEventSharees(data: Data): Promise<Array<EventSharee>> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("EventID", sql.Int, data.eventID)
            .execute("Employee.GetEventSharees");
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}
export const TestSelectEventSharees = z.object(eventTest);
export const SelectEventSharees = buildProcedure(TestSelectEventSharees, ExecuteSelectEventSharees);