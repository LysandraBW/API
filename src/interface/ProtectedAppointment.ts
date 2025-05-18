import { Note } from "@/objects/Employee/Note";
import { Repair } from "./Repair";
import { Service } from "./Service";
import { Diagnosis } from "./Diagnosis";

export type CustomerAppointment = {
    AppointmentID: string;
    CustomerID: number;
    FName: string;
    LName: string;
    Email: string;
    Phone: string;
    CreationDate: Date;
    UpdationDate: Date;
    StartDate: Date;
    EndDate: Date;
    Cost: number;
    StatusID: number;
    Status: string;
    Make: string;
    Model: string;
    ModelYear: number;
    VIN: string;
    Mileage: number;
    LicensePlate: string;
    Notes: Array<Note>;
    Repairs: Array<Repair>;
    Services: Array<Service>;
    Diagnoses: Array<Diagnosis>;
}