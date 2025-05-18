import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { isInteger, isMoney } from "@/validate";


export async function ExecuteUpdatePart(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('PartID', sql.Int, data.partID)
            .input('PartName', sql.VarChar(50), data.partName)
            .input('PartNumber', sql.VarChar(50), data.partNumber)
            .input('Quantity', sql.Int, data.quantity)
            .input('UnitCost', sql.Money, data.unitCost)
            .execute('Appointment.UpdatePart');
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestUpdatePart = z.object({
    ...appointmentTest,
    partID: z.string(),
    partName: z.string().max(50).or(z.null()).optional(),
    partNumber: z.string().max(50).or(z.null()).optional(),
    quantity: isInteger.or(z.null()).optional(),
    unitCost: isMoney.or(z.null()).optional()
});

export const UpdatePart = buildProcedure(TestUpdatePart, ExecuteUpdatePart);