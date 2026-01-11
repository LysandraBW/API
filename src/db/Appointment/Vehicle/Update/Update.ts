import { z } from "zod";
import sql from "mssql";
import { Data, buildProcedure } from "@/db/Procedure";
import { getEmployeePool } from "@/pool";
import { UNDEFINED_POOL } from "@/constant";
import { appointmentTest } from "@/validate";
import { hasLength, isInteger, isIntegerArray, isVIN } from "waltronics-types";
import { isLicensePlate } from "validator";

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
    make: hasLength({
        max: 50,
        name: "make"
    }),
    model: hasLength({
        max: 50,
        name: "model"
    }),
    modelYear: isInteger.nullish(),
    services: isIntegerArray.nullish(),
    vin: isVIN.nullish(),
    mileage: isInteger.nullish(),
    licensePlate: hasLength({
        max: 8,
        name: "license plate"
    }).nullish(),
});

export const UpdateVehicle = buildProcedure(
    TestUpdateVehicle, 
    ExecuteUpdateVehicle
);