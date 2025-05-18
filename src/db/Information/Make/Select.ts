import { UNDEFINED_POOL } from "@/constant";
import { getStandardPool } from "@/pool";
import { InfoMake } from "waltronics-types";

export async function SelectInfoMakes(): Promise<Array<InfoMake>> {
    try {
        const pool = await getStandardPool();
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request().execute("Info.Makes");
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}