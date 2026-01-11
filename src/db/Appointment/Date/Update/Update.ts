import { z } from "zod";
import sql from "mssql";
import { appointmentTest } from "@/validate";
import { UNDEFINED_POOL } from "@/constant";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { isDate } from "waltronics-types";

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
    endDate: isDate.nullish(),
    startDate: isDate.nullish()
});

export const UpdateDate = buildProcedure(
    TestUpdateDate, 
    ExecuteUpdateDate
);