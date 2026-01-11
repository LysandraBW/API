import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { isCreditCardNumber, isCreditCardType, isExpirationDate, isInteger, isName } from "waltronics-types";

export async function ExecuteInsertCreditCard(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('PaymentID', sql.Int, data.paymentID)
            .input('Name', sql.VarChar(100), data.name)
            .input('Type', sql.VarChar(10), data.type)
            .input('CCN', sql.VarChar(16), data.ccn)
            .input('EXP', sql.Char(4), data.exp)
            .execute('Appointment.InsertCreditCard');
        return true;   
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestInsertCreditCard = z.object({
    ...appointmentTest,
    paymentID: isInteger,
    name: isName,
    type: isCreditCardType,
    ccn: isCreditCardNumber,
    exp: isExpirationDate
});

export const InsertCreditCard = buildProcedure(
    TestInsertCreditCard, 
    ExecuteInsertCreditCard
);