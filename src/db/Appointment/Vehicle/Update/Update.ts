import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest, isVIN } from "@/validate";

export async function ExecuteUpdateVehicle(data: Data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;
        await pool.request()
            .input('SessionID', sql.Char(36), data.sessionID)
            .input('AppointmentID', sql.UniqueIdentifier, data.appointmentID)
            .input('Make', sql.VarChar(50), data.make)
            .input('Model', sql.VarChar(50), data.model)
            .input('ModelYear', sql.Int, data.modelYear)
            .input('VIN', sql.VarChar(17), data.vin)
            .input('Mileage', sql.Int, data.mileage)
            .input('LicensePlate', sql.VarChar(8), data.licensePlate)
            .execute('Appointment.UpdateVehicle');
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const TestUpdateVehicle = z.object({
    ...appointmentTest,
    make: z.string().max(50).or(z.null()),
    model: z.string().max(50).or(z.null()),
    modelYear: z.string().or(z.null()),
    vin: isVIN.or(z.null()),
    mileage: z.string().or(z.null()),
    licensePlate: z.string().max(8).or(z.null())
});

export const UpdateVehicle = buildProcedure(TestUpdateVehicle, ExecuteUpdateVehicle);