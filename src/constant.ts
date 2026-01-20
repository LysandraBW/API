export const FAILED_INSERT = -1;

export const INVALID_BODY = JSON.stringify({
    "error": "Invalid Body"
});

export const INVALID_LOGIN = JSON.stringify({
    "error": "Invalid Login"
});

export const UNDEFINED_POOL = JSON.stringify({
    "error": "Failed to Connect"
});

// Roles
export const EMPLOYEE = "Employee";
export const APPOINTMENT_HOLDER = "Appointment";
export type Role = "Employee" | "Appointment";

// Select Appointments
export const ALL = "All";
export const PROTECTED = "Protected";

// Delete Appointment(s)
export const RECOVER = "Recover";
export const MULTIPLE = "Multiple";
export const TEMPORARY = "Temporary";
export const PERMANENT = "Permanent";

// Insert Defined Service
export const DEFINED = "Defined";

// Insert Payment
export const DIGITAL = "Digital";
export const CREDIT_CARD = "CreditCard";

// Select Names
export const NAMES = "Names";
