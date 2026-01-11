import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { FAILED_INSERT, UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { isInteger, isMoney, isPartName, isPartNumber } from "waltronics-types";

export async function ExecuteInsertPart(data: Data): Promise<number> {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        const output = await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('PartName', sql.VarChar(50), data.partName)
            .input('PartNumber', sql.VarChar(50), data.partNumber)
            .input('Quantity', sql.Int, data.quantity)
            .input('UnitCost', sql.Money, data.unitCost)
            .execute('Appointment.InsertPart');
        return output.recordset[0].PartID;
    }
    catch (err) {
        console.error(err);
        return FAILED_INSERT;
    }
}

export const TestInsertPart = z.object({
    ...appointmentTest,
    partName: isPartName,
    partNumber: isPartNumber,
    quantity: isInteger,
    unitCost: isMoney
});

export const InsertPart = buildProcedure(TestInsertPart, ExecuteInsertPart);