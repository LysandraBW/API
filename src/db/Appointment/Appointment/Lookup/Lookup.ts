import { z } from "zod";
import sql from "mssql";
import { isUUID, isEmail } from "@/validate";
import { UNDEFINED_POOL } from "@/constant";
import { getStandardPool } from "@/pool";
import { Data, buildProcedure } from "@/db/Procedure";

export async function ExecuteLookup(data: Data): Promise<string> {
    try {
        const pool = await getStandardPool();
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input("Email", sql.VarChar(320), data.email)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .output("SessionID", sql.Char(36))
            .execute("Appointment.Lookup");
        // Returns the session ID
        // of the appointment holder.
        return output.output.SessionID;
    }
    catch (err) {
        console.error(err);
        return "";
    }
}
export const TestLookup = z.object({appointmentID: isUUID, email: isEmail});
export const Lookup = buildProcedure(TestLookup, ExecuteLookup);