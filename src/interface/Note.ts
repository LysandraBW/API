export type Note = {
    NoteID: string;
    EmployeeID: string;
    AppointmentID: string;
    Head: string;
    Body: string;
    ShowCustomer: string;
    CreationDate: Date;
    UpdationDate: Date;
    Sharees: Array<{
        ShareeID: string;
        NoteID: string;
    }>;
    Attachments: Array<NoteAttachment>;
}

export type NoteAttachment = {
    NoteID: number;
    AttachmentID: number;
    URL: string;
    Name: string;
}

export type NoteSharee = {
    ShareeFName: string;
    ShareeLName: string;
    ShareeID: string;
}

export type EmployeeNote = Note & {
    OwnerFName: string;
    OwnerLName: string;
    OwnerID: string;
}