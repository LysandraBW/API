export type Event = {
    EventID: number;
    EmployeeID: string;
    Name: string;
    Date: string;
    Summary: string;
    AppointmentID: string|null;
    Sharees: Array<{
        ShareeID: string;
        EventID: string;
    }>;
}

export type EventSharee = {
    ShareeFName: string;
    ShareeLName: string;
    ShareeID: string;
}