import { UNDEFINED_POOL } from "@/constant";
import { getStandardPool } from "@/pool";
import { InfoStatus } from "waltronics-types";

export async function SelectInfoStatuses(): Promise<Array<InfoStatus>> {
    try {
        const pool = await getStandardPool();
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request().execute("Info.Statuses");
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}