import { EmployeeNote } from "./Note";
import { AppointmentLabels } from "./Label";
import { Part } from "./Part";
import { Repair } from "./Repair";
import { Payment } from "./Payment";
import { Service } from "./Service";
import { Diagnosis } from "./Diagnosis";

export type Appointment = {
    CustomerID: number;
    AppointmentID: string;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
    CreationDate: Date;
    UpdationDate: Date;
    StartDate: string|null;
    EndDate: string|null;
    Cost: number;
    StatusID: number;
    Status: string;
    Make: string;
    Model: string;
    ModelYear: number;
    VIN: string;
    Mileage: number;
    LicensePlate: string;
    Labels: AppointmentLabels;
    Notes: Array<EmployeeNote>;
    Parts: Array<Part>;
    Repairs: Array<Repair>;
    Payments: Array<Payment>;
    Services: Array<Service>;
    Diagnoses: Array<Diagnosis>;
}