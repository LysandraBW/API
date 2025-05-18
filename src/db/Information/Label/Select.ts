import { UNDEFINED_POOL } from "@/constant";
import { InfoLabel } from "waltronics-types";
import { getStandardPool } from "@/pool";

export async function SelectInfoLabels(): Promise<Array<InfoLabel>> {
    try {
        const pool = await getStandardPool();
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request().execute("Info.Labels");
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}