import { z } from "zod";
import sql from "mssql";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { isInteger } from "@/validate";
import { Data, buildProcedure } from "@/db/Procedure";

export async function ExecuteDeletePayment(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('PaymentID', sql.Int, data.paymentID)
            .execute('Appointment.DeletePayment');
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
export const TestDeletePayment = z.object({...appointmentTest, paymentID: isInteger});
export const DeletePayment = buildProcedure(TestDeletePayment, ExecuteDeletePayment);