import { z } from "zod";
import sql from "mssql";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { Data, buildProcedure } from "@/db/Procedure";
import { Payment } from "waltronics-types";

export async function ExecuteSelectPayments(data: Data): Promise<Array<Payment>> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .execute('Appointment.GetPayments');
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export const TestSelectPayments = z.object(appointmentTest);

export const SelectPayments = buildProcedure(
    TestSelectPayments, 
    ExecuteSelectPayments
);