import { z } from "zod";
import sql from "mssql";
import { appointmentTest, isString } from "@/validate";
import { isDate } from "@/validate";
import { UNDEFINED_POOL } from "@/constant";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";

export async function ExecuteUpdateDate(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .input("StartDate", sql.VarChar(30), data.startDate)
            .input("EndDate", sql.VarChar(30), data.endDate)
            .execute("Appointment.UpdateDate");
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

export const TestUpdateDate = z.object({
    ...appointmentTest,
    endDate: isDate.or(z.null()),
    startDate: isDate.or(z.null())
});

export const UpdateDate = buildProcedure(TestUpdateDate, ExecuteUpdateDate);