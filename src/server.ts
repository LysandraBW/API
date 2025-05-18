import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { Data } from "./db/Procedure";
import { getCookie } from "./utils/getCookie";
import { ALL, CREDIT_CARD, DEFINED, DIGITAL, INVALID_BODY, INVALID_LOGIN, MULTIPLE, NAMES, PERMANENT, PROTECTED, RECOVER, TEMPORARY } from "./constant";
import { SelectAllAppointments } from "./db/Appointment/Appointment/Select/All/SelectAll";
import { SelectAppointment } from "./db/Appointment/Appointment/Select/Select";
import { SelectProtectedAppointment } from "./db/Appointment/Appointment/Select/Protected/SelectProtected";
import { InsertAppointment } from "./db/Appointment/Appointment/Insert/Insert";
import { RecoverAppointments } from "./db/Appointment/Deleted/Recover/Multiple/RecoverMultiple";
import { PermanentlyDeleteAppointments } from "./db/Appointment/Deleted/Delete/Permanent/Multiple/PermanentDeleteMultiple";
import { TemporarilyDeleteAppointments } from "./db/Appointment/Deleted/Delete/Temporary/Multiple/TemporaryDeleteMultiple";
import { RecoverAppointment } from "./db/Appointment/Deleted/Recover/Recover";
import { PermanentlyDeleteAppointment } from "./db/Appointment/Deleted/Delete/Permanent/PermanentDelete";
import { TemporarilyDeleteAppointment } from "./db/Appointment/Deleted/Delete/Temporary/TemporaryDelete";
import authenticateEmployee from "./middleware";
import { UpdateCost } from "./db/Appointment/Finance/Cost/Update/Update";
import { EmployeeLogin } from "./db/Employee/Login/Login/Login";
import { setCookie } from "./utils/setCookie";
import { EmployeeLogout } from "./db/Employee/Login/Logout/Logout";
import { UpdateStatus } from "./db/Appointment/Status/Update/Update";
import { UpdateVehicle } from "./db/Appointment/Vehicle/Update/Update";
import { UpdateDate } from "./db/Appointment/Date/Update/Update";
import { SelectDiagnoses } from "./db/Appointment/Diagnosis/Select/Select";
import { InsertDiagnosis } from "./db/Appointment/Diagnosis/Insert/Insert";
import { UpdateDiagnosis } from "./db/Appointment/Diagnosis/Update/Update";
import { DeleteDiagnosis } from "./db/Appointment/Diagnosis/Delete/Delete";
import { SelectParts } from "./db/Appointment/Part/Select/Select";
import { InsertPart } from "./db/Appointment/Part/Insert/Insert";
import { UpdatePart } from "./db/Appointment/Part/Update/Update";
import { DeletePart } from "./db/Appointment/Part/Delete/Delete";
import { SelectRepairs } from "./db/Appointment/Repair/Select/Select";
import { InsertRepair } from "./db/Appointment/Repair/Insert/Insert";
import { DeleteRepair } from "./db/Appointment/Repair/Delete/Delete";
import { UpdateRepair } from "./db/Appointment/Repair/Update/Update";
import { SelectServices } from "./db/Appointment/Service/Select/Select";
import { InsertService } from "./db/Appointment/Service/Insert/Insert";
import { UpdateService } from "./db/Appointment/Service/Update/Update";
import { DeleteService } from "./db/Appointment/Service/Delete/Delete";
import { InsertDefinedService } from "./db/Appointment/Service/Insert/Defined/InsertDefined";
import { SelectLabels } from "./db/Appointment/Label/Select/Select";
import { UpdateLabel } from "./db/Appointment/Label/Update/Update";
import { SelectEmployeeNotes } from "./db/Appointment/Note/Note/Select/Employee/SelectEmployee";
import { DeleteNote } from "./db/Appointment/Note/Note/Delete/Delete";
import { UpdateNote } from "./db/Appointment/Note/Note/Update/Update";
import { InsertNote } from "./db/Appointment/Note/Note/Insert/Insert";
import { SelectNoteSharees } from "./db/Appointment/Note/Shared/Select/Select";
import { InsertNoteSharee } from "./db/Appointment/Note/Shared/Insert/Insert";
import { DeleteNoteSharee } from "./db/Appointment/Note/Shared/Delete/Delete";
import { InsertNoteAttachment } from "./db/Appointment/Note/Attachment/Insert/Insert";
import { DeleteNoteAttachment } from "./db/Appointment/Note/Attachment/Delete/Delete";
import { SelectPayments } from "./db/Appointment/Finance/Payment/Select/Select";
import { DeletePayment } from "./db/Appointment/Finance/Payment/Delete/Delete";
import { InsertDigitalPayment } from "./db/Appointment/Finance/Payment/Insert/Digital/Insert";
import { InsertCreditCard } from "./db/Appointment/Finance/Credit/Insert/Insert";
import { InsertPayment } from "./db/Appointment/Finance/Payment/Insert/Insert";
import { UpdateCustomer } from "./db/Customer/Update/Update";
import { SelectEmployee } from "./db/Employee/Employee/Select/Select";
import { SelectEvents } from "./db/Employee/Event/Event/Select/Select";
import { InsertEvent } from "./db/Employee/Event/Event/Insert/Insert";
import { UpdateEvent } from "./db/Employee/Event/Event/Update/Update";
import { DeleteEvent } from "./db/Employee/Event/Event/Delete/Delete";
import { SelectEventSharees } from "./db/Employee/Event/Shared/Select/Select";
import { InsertEventSharee } from "./db/Employee/Event/Shared/Insert/Insert";
import { DeleteEventSharee } from "./db/Employee/Event/Shared/Delete/Delete";
import { SelectInfoMakes } from "./db/Information/Make/Select";
import { SelectInfoStatuses } from "./db/Information/Status/Select";
import { SelectInfoServices } from "./db/Information/Service/Select";
import { SelectInfoLabels } from "./db/Information/Label/Select";
import { route, routeCRUD } from "./route";
import { APPOINTMENT_HOLDER, EMPLOYEE } from './constant';
import { AuthorizeLookup } from "./db/Appointment/Appointment/Lookup/Lookup";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "*", credentials: true}));

const port = 8080;
app.listen(port, () => console.log("Server Listening on Port: " + port));

// Appointment
app.get("/appointments", async (req, res) => {
    route(req, res, SelectAllAppointments, {
        data: <Data> req.query,
        cookieNames: [["EmployeeSessionID", "sessionID"]]
    });
});

app.get("/appointment/:appointmentID", async (req, res) => {
    if (req.query.type === PROTECTED) {
        route(req, res, SelectProtectedAppointment, {
            data: <Data> {
                appointmentID: req.params.appointmentID,
                ...req.query
            },
            cookieNames: [
                req.query.role === EMPLOYEE ? ["EmployeeSessionID", "sessionID"] : [""],
                req.query.role === APPOINTMENT_HOLDER ? ["AppointmentHolderSessionID", "sessionID"] : [""]
            ]
        });
    }
    else {
        route(req, res, SelectAppointment, {
            data: <Data>  {
                appointmentID: req.params.appointmentID
            },
            cookieNames: [["EmployeeSessionID", "sessionID"]]
        });
    }
});

app.put("/appointment", async (req, res) => {
    route(req, res, InsertAppointment, {
        data: req.body,
        cookieNames: [["EmployeeSessionID", "sessionID"]]
    });
});

app.delete("/appointment", authenticateEmployee, async (req, res) => {
    if (req.query.size === MULTIPLE) {
        if (req.query.type === RECOVER) {
            route(req, res, RecoverAppointments, {
                data: req.body,
                cookieNames: [["EmployeeSessionID", "sessionID"]]
            });
        }
        else if (req.query.type === PERMANENT) {
            route(req, res, PermanentlyDeleteAppointments, {
                data: req.body,
                cookieNames: [["EmployeeSessionID", "sessionID"]]
            });
        }
        else if (req.query.type === TEMPORARY) {
            route(req, res, TemporarilyDeleteAppointments, {
                data: req.body,
                cookieNames: [["EmployeeSessionID", "sessionID"]]
            });
        }
    }
    else {
        if (req.query.type === RECOVER) {
            route(req, res, RecoverAppointment, {
                data: req.body,
                cookieNames: [["EmployeeSessionID", "sessionID"]]
            });
        }
        else if (req.query.type === PERMANENT) {
            route(req, res, PermanentlyDeleteAppointment, {
                data: req.body,
                cookieNames: [["EmployeeSessionID", "sessionID"]]
            });
        }
        else if (req.query.type === TEMPORARY) {
            route(req, res, TemporarilyDeleteAppointment, {
                data: req.body,
                cookieNames: [["EmployeeSessionID", "sessionID"]]
            });
        }
    }
});

// Simple Updates
app.post("/appointment/:appointmentID/date", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, UpdateDate);
});

app.post("/appointment/:appointmentID/cost", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, UpdateCost);
});

app.post("/appointment/:appointmentID/status", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, UpdateStatus);
});

app.post("/appointment/:appointmentID/vehicle", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, UpdateVehicle);
});

app.post("/appointment/:appointmentID/customer", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, UpdateCustomer);
});

app.post("/appointment/lookup", async (req, res) => {
    const input = AuthorizeLookup.Test(req.body);
    // Invalid Inputs (i.e. Wrong Email Address)
    if (!input.success) {
        res.status(400).send(INVALID_BODY);
        return;
    }
    // Invalid Email Address and Appointment ID
    const output = await AuthorizeLookup.Execute(input.data);
    if (!output) {
        res.status(400).send(INVALID_LOGIN);
        return;
    }
    setCookie(res, {data: output, name: "AppointmentHolderSessionID"});
    res.send({output});
});

// Diagnoses
app.get("/appointment/:appointmentID/diagnoses", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, SelectDiagnoses);
});

app.put("/appointment/:appointmentID/diagnosis", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, InsertDiagnosis);
});

app.post("/appointment/:appointmentID/diagnosis/:diagnosisID", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, UpdateDiagnosis);
});

app.delete("/appointment/:appointmentID/diagnosis/:diagnosisID", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, DeleteDiagnosis);
});

// Parts
app.get("/appointment/:appointmentID/parts", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, SelectParts);
});

app.put("/appointment/:appointmentID/part", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, InsertPart);
});

app.post("/appointment/:appointmentID/part/:partID", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, UpdatePart);
});

app.delete("/appointment/:appointmentID/part/:partID", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, DeletePart);
});

// Repairs
app.get("/appointment/:appointmentID/repairs", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, SelectRepairs);
});

app.put("/appointment/:appointmentID/repair", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, InsertRepair);
});

app.post("/appointment/:appointmentID/repair/:repairID", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, UpdateRepair);
});

app.delete("/appointment/:appointmentID/repair/:repairID", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, DeleteRepair);
});

// Services
app.get("/appointment/:appointmentID/services", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, SelectServices);
});

app.post("/appointment/:appointmentID/service/:serviceID", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, UpdateService);
});

app.delete("/appointment/:appointmentID/service/:serviceID", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, DeleteService);
});

app.put("/appointment/:appointmentID/service", authenticateEmployee, async (req, res) => {
    if (req.query.type !== DEFINED)
        routeCRUD(req, res, InsertService);
    else
        routeCRUD(req, res, InsertDefinedService);
});

// Labels
app.get("/appointment/:appointmentID/labels", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, SelectLabels);
});

app.post("/appointment/:appointmentID/label", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, UpdateLabel);
});

// Notes
app.get("/appointment/:appointmentID/notes", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, SelectEmployeeNotes);
});

app.put("/appointment/:appointmentID/note", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, InsertNote);
});

app.post("/appointment/:appointmentID/note/:noteID", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, UpdateNote);
});

app.delete("/appointment/:appointmentID/note/:noteID", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, DeleteNote);
});

// Note Sharees
app.get("/appointment/note/:noteID/sharees", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, SelectNoteSharees);
});

app.put("/appointment/note/:noteID/sharee", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, InsertNoteSharee);
});

app.delete("/appointment/note/:noteID/sharee", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, DeleteNoteSharee);
});

// Note Attachments
app.put("/appointment/note/:noteID/attachment", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, InsertNoteAttachment);
});

app.delete("/appointment/note/:noteID/attachment/:attachmentID", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, DeleteNoteAttachment);
});

// Payments
app.get("/appointment/:appointmentID/payments", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, SelectPayments);
});

app.put("/appointment/:appointmentID/payment", authenticateEmployee, async (req, res) => {
    if (req.query.type === DIGITAL) 
        routeCRUD(req, res, InsertDigitalPayment);
    else 
        routeCRUD(req, res, InsertPayment);
});

app.put("/appointment/:appointmentID/payment/:paymentID/credit", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, InsertCreditCard);
});

app.delete("/appointment/:appointmentID/payment/:paymentID", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, DeletePayment);
});

// Employee
app.post("/employee/login", async (req, res) => {
    const input = EmployeeLogin.Test(req.body);
    if (!input.success) {
        res.status(400).send(INVALID_BODY);
        return;
    }
    const output = await EmployeeLogin.Execute(input.data);
    if (!output) {
        res.status(400).send(INVALID_LOGIN);
        return;
    }
    setCookie(res, {data: output, name: "EmployeeSessionID"});
    res.send({output});
});

app.post("/employee/logout", async (req, res) => {
    const sessionID = await getCookie(req, "EmployeeSessionID");
    const input = EmployeeLogout.Test({sessionID});
    if (!input.success) {
        res.status(400).send(INVALID_BODY);
        return;
    }
    const output = await EmployeeLogout.Execute(input.data);
    if (!output) {
        res.status(400).send(INVALID_BODY);
        return;
    }
    res.clearCookie("EmployeeSessionID");
    res.send({output: "Employee Logged Out"});
});

app.get("/employee", authenticateEmployee, async (req, res) => {
    if (req.query.type === NAMES)
        routeCRUD(req, res, SelectEmployeeNotes);
    else
        routeCRUD(req, res, SelectEmployee);
});

// Employee Event
app.get("/employee/events", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, SelectEvents);
});

app.put("/employee/event", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, InsertEvent);
});

app.post("/employee/event/:eventID", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, UpdateEvent);
});

app.delete("/employee/event/:eventID", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, DeleteEvent);
});

// Employee Event Sharee(s)
app.get("/employee/event/:eventID/sharees", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, SelectEventSharees);
});

app.put("/employee/event/:eventID/sharee", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, InsertEventSharee);
});

app.delete("/employee/event/:eventID/sharee", authenticateEmployee, async (req, res) => {
    routeCRUD(req, res, DeleteEventSharee);
});

// Information
app.get("/makes", async (req, res) => {
    res.send(await SelectInfoMakes());
});

app.get("/labels", async (req, res) => {
    res.send(await SelectInfoLabels());
});

app.get("/services", async (req, res) => {
    res.send(await SelectInfoServices());
});

app.get("/statuses", async (req, res) => {
    res.send(await SelectInfoStatuses());
});