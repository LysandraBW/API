import { UNDEFINED_POOL } from "@/constant";
import { getStandardPool } from "@/pool";
import { InfoService } from "waltronics-types";

export async function SelectInfoServices(): Promise<Array<InfoService>> {
    try {
        const pool = await getStandardPool();
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request().execute("Info.Services");
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}