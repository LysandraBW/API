import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { FAILED_INSERT, UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { isCreditCardNumber, isCreditCardType, isExpirationDate, isMoney, isName } from "waltronics-types";

export async function ExecuteInsertDigitalPayment(data: Data): Promise<number> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        
        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('Payment', sql.Money, data.payment)
            .input('Name', sql.VarChar(100), data.name)
            .input('Type', sql.VarChar(10), data.type)
            .input('CCN', sql.VarChar(16), data.ccn)
            .input('EXP', sql.Char(4), data.exp)
            .output('PaymentID', sql.Int)
            .execute('Appointment.InsertDigitalPayment');
        
            return output.output.PaymentID;
    }
    catch (err) {
        console.error(err);
        return FAILED_INSERT;
    }
}

export const TestInsertDigitalPayment = z.object({
    ...appointmentTest,
    payment: isMoney,
    name: isName,
    type: isCreditCardType,
    ccn: isCreditCardNumber,
    exp: isExpirationDate
});

export const InsertDigitalPayment = buildProcedure(
    TestInsertDigitalPayment, 
    ExecuteInsertDigitalPayment
);