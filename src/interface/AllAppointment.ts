export type Appointment = {
    AppointmentID: string;
    CustomerID: string;
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
    Status: number;
    Make: string;
    Model: string;
    ModelYear: number;
    VIN: string;
    Mileage: number;
    LicensePlate: string;
}

export type AllAppointments = {
    Count: number;
    Appointments: Array<Appointment>;
}