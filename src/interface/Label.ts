export type Label = {
    LabelID: number;
    Label: string;
    Value: number|null;
    AppointmentID: string;
}

export type AppointmentLabels = {
    // The "LabelName" is what the "Label"
    // property is in the "Label" type.
    [LabelName: string]: Label;
}

export type MultipleAppointmentLabels = {
    [AppointmentID: string]: AppointmentLabels;
}