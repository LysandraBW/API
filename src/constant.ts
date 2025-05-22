export const FAILED_INSERT = -1;
export const INVALID_BODY = JSON.stringify({"error": "Invalid Body"});
export const INVALID_LOGIN = JSON.stringify({"error": "Invalid Login"});
export const UNDEFINED_POOL = JSON.stringify({"error": "Failed to Connect"});

export const ALL = "All";
export const PROTECTED = "Protected";

export const RECOVER = "Recover";
export const MULTIPLE = "Mmultiple";
export const TEMPORARY = "Temporary";
export const PERMANENT = "Permanent";
export const DEFINED = "Defined";
export const DIGITAL = "Digital";
export const CREDIT_CARD = "CreditCard";
export const NAMES = "Names";

// Roles
export const EMPLOYEE = "Employee";
export const APPOINTMENT_HOLDER = "Appointment";
export type Role = "Employee" | "Appointment";
