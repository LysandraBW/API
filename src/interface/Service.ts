export type Service = {
    // It's kind of confusing, but "AppointmentServiceID"
    // refers to the unique ID given to each Service instance.
    // "ServiceID" refers to the Info.Service information that this
    // Service has. I should probably rename this.
    // When I rename this, "AppointmentServiceID" will be renamed to
    // "ServiceID", and "ServiceID" will be renamed to "InfoServiceID".
    AppointmentServiceID: number;
    AppointmentID: string;
    Class: string;
    Division: string;
    Service: string;
    ServiceID: number|null;
}