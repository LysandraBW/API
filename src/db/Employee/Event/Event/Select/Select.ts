import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { isUUID } from "waltronics-types";
import { connect } from "@/utils/connect";
import { Event } from "waltronics-types";

export async function ExecuteSelectEvents(data: Data): Promise<Array<Event>> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .execute("Employee.GetEvents");

        const recordsets: any = output.recordsets;
        const events: Array<Event> = recordsets[0];
        const sharees: Array<{EventID: number, ShareeID: number}> = recordsets[1];
        connect(events, sharees, "EventID", "Sharees");
        
        return events;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}
export const TestSelectEvents = z.object({sessionID: isUUID});
export const SelectEvents = buildProcedure(TestSelectEvents, ExecuteSelectEvents);