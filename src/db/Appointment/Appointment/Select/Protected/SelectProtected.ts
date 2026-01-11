import { z } from "zod";
import sql from "mssql";
import { APPOINTMENT_HOLDER, EMPLOYEE, UNDEFINED_POOL } from "@/constant";
import { Data, buildProcedure } from "@/db/Procedure";
import { appointmentTest } from "@/validate";
import { getPool } from "@/pool";
import { Role } from '@/constant';

export async function ExecuteSelectProtectedAppointment(data: Data) {
    try {
        const pool = await getPool(data.sessionID, data.role as Role);
        if (!pool)
            throw UNDEFINED_POOL;

        const output: any = await pool.request()
            .input("SessionID", data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .execute("Appointment.GetProtected")
        
        return {
            ...output.recordsets[0][0],
            Services: output.recordsets[1],
            Diagnoses: output.recordsets[2],
            Repairs: output.recordsets[3],
            Notes: output.recordsets[4]
        }
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

export const TestSelectProtectedAppointment = z.object({
    ...appointmentTest,
    role: z.enum([
        APPOINTMENT_HOLDER, 
        EMPLOYEE
    ])
});

export const SelectProtectedAppointment = buildProcedure(
    TestSelectProtectedAppointment, 
    ExecuteSelectProtectedAppointment
);