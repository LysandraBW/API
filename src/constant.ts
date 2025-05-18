export const FAILED_INSERT = -1;
export const INVALID_BODY = JSON.stringify({"error": "Invalid Body"});
export const INVALID_LOGIN = JSON.stringify({"error": "Invalid Login"});
export const UNDEFINED_POOL = JSON.stringify({"error": "Failed to Connect"});

export const ALL = "All";
export const PROTECTED = "Protected";

export const RECOVER = "recover";
export const MULTIPLE = "multiple";
export const TEMPORARY = "temporary";
export const PERMANENT = "permanent";
export const DEFINED = "defined";
export const DIGITAL = "digital";
export const CREDIT_CARD = "creditCard";
export const NAMES = "names";

// Roles
export const EMPLOYEE = "Employee";
export const APPOINTMENT_HOLDER = "Appointment";
export type Role = "Employee" | "Appointment";
