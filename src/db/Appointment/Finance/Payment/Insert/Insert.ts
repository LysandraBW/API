import { z } from "zod";
import sql from "mssql";
import { getEmployeePool } from "@/pool";
import { FAILED_INSERT, UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { Data, buildProcedure } from "@/db/Procedure";
import { isMoney } from "waltronics-types";

export async function ExecuteInsertPayment(data: Data): Promise<number> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('Payment', sql.Money, data.payment)
            .output('PaymentID', sql.Int)
            .execute('Appointment.InsertPayment');
        
        return output.output.PaymentID;
    }
    catch (err) {
        console.error(err);
        return FAILED_INSERT;
    }
}

export const TestInsertPayment = z.object({
    ...appointmentTest, 
    payment: isMoney
});

export const InsertPayment = buildProcedure(
    TestInsertPayment, 
    ExecuteInsertPayment
);