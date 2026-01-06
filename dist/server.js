"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const getCookie_1 = require("./utils/getCookie");
const constant_1 = require("./constant");
const SelectAll_1 = require("./db/Appointment/Appointment/Select/All/SelectAll");
const Select_1 = require("./db/Appointment/Appointment/Select/Select");
const SelectProtected_1 = require("./db/Appointment/Appointment/Select/Protected/SelectProtected");
const Insert_1 = require("./db/Appointment/Appointment/Insert/Insert");
const RecoverMultiple_1 = require("./db/Appointment/Deleted/Recover/Multiple/RecoverMultiple");
const PermanentDeleteMultiple_1 = require("./db/Appointment/Deleted/Delete/Permanent/Multiple/PermanentDeleteMultiple");
const TemporaryDeleteMultiple_1 = require("./db/Appointment/Deleted/Delete/Temporary/Multiple/TemporaryDeleteMultiple");
const Recover_1 = require("./db/Appointment/Deleted/Recover/Recover");
const PermanentDelete_1 = require("./db/Appointment/Deleted/Delete/Permanent/PermanentDelete");
const TemporaryDelete_1 = require("./db/Appointment/Deleted/Delete/Temporary/TemporaryDelete");
const middleware_1 = __importDefault(require("./middleware"));
const Update_1 = require("./db/Appointment/Finance/Cost/Update/Update");
const Login_1 = require("./db/Employee/Login/Login/Login");
const setCookie_1 = require("./utils/setCookie");
const Logout_1 = require("./db/Employee/Login/Logout/Logout");
const Update_2 = require("./db/Appointment/Status/Update/Update");
const Update_3 = require("./db/Appointment/Vehicle/Update/Update");
const Update_4 = require("./db/Appointment/Date/Update/Update");
const Select_2 = require("./db/Appointment/Diagnosis/Select/Select");
const Insert_2 = require("./db/Appointment/Diagnosis/Insert/Insert");
const Update_5 = require("./db/Appointment/Diagnosis/Update/Update");
const Delete_1 = require("./db/Appointment/Diagnosis/Delete/Delete");
const Select_3 = require("./db/Appointment/Part/Select/Select");
const Insert_3 = require("./db/Appointment/Part/Insert/Insert");
const Update_6 = require("./db/Appointment/Part/Update/Update");
const Delete_2 = require("./db/Appointment/Part/Delete/Delete");
const Select_4 = require("./db/Appointment/Repair/Select/Select");
const Insert_4 = require("./db/Appointment/Repair/Insert/Insert");
const Delete_3 = require("./db/Appointment/Repair/Delete/Delete");
const Update_7 = require("./db/Appointment/Repair/Update/Update");
const Select_5 = require("./db/Appointment/Service/Select/Select");
const Insert_5 = require("./db/Appointment/Service/Insert/Insert");
const Update_8 = require("./db/Appointment/Service/Update/Update");
const Delete_4 = require("./db/Appointment/Service/Delete/Delete");
const InsertDefined_1 = require("./db/Appointment/Service/Insert/Defined/InsertDefined");
const Select_6 = require("./db/Appointment/Label/Select/Select");
const Update_9 = require("./db/Appointment/Label/Update/Update");
const SelectEmployee_1 = require("./db/Appointment/Note/Note/Select/Employee/SelectEmployee");
const Delete_5 = require("./db/Appointment/Note/Note/Delete/Delete");
const Update_10 = require("./db/Appointment/Note/Note/Update/Update");
const Insert_6 = require("./db/Appointment/Note/Note/Insert/Insert");
const Select_7 = require("./db/Appointment/Note/Shared/Select/Select");
const Insert_7 = require("./db/Appointment/Note/Shared/Insert/Insert");
const Delete_6 = require("./db/Appointment/Note/Shared/Delete/Delete");
const Insert_8 = require("./db/Appointment/Note/Attachment/Insert/Insert");
const Delete_7 = require("./db/Appointment/Note/Attachment/Delete/Delete");
const Select_8 = require("./db/Appointment/Finance/Payment/Select/Select");
const Delete_8 = require("./db/Appointment/Finance/Payment/Delete/Delete");
const Insert_9 = require("./db/Appointment/Finance/Payment/Insert/Digital/Insert");
const Insert_10 = require("./db/Appointment/Finance/Credit/Insert/Insert");
const Insert_11 = require("./db/Appointment/Finance/Payment/Insert/Insert");
const Update_11 = require("./db/Customer/Update/Update");
const Select_9 = require("./db/Employee/Employee/Select/Select");
const Select_10 = require("./db/Employee/Event/Event/Select/Select");
const Insert_12 = require("./db/Employee/Event/Event/Insert/Insert");
const Update_12 = require("./db/Employee/Event/Event/Update/Update");
const Delete_9 = require("./db/Employee/Event/Event/Delete/Delete");
const Select_11 = require("./db/Employee/Event/Shared/Select/Select");
const Insert_13 = require("./db/Employee/Event/Shared/Insert/Insert");
const Delete_10 = require("./db/Employee/Event/Shared/Delete/Delete");
const Select_12 = require("./db/Information/Make/Select");
const Select_13 = require("./db/Information/Status/Select");
const Select_14 = require("./db/Information/Service/Select");
const Select_15 = require("./db/Information/Label/Select");
const route_1 = require("./route");
const constant_2 = require("./constant");
const Lookup_1 = require("./db/Appointment/Appointment/Lookup/Lookup");
const SelectAll_2 = require("./db/Employee/Employee/Select/All/SelectAll");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://127.0.0.1:3000", credentials: true }));
const port = (process.env.PORT || 8080);
app.listen(port, () => console.log("Server Listening on Port: " + port));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('🚀 Server is Up and Running!');
}));
// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server listening on Port ${port}`);
// });
app.get("/appointments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(1);
    (0, route_1.route)(req, res, SelectAll_1.SelectAllAppointments, {
        data: req.query,
        cookieNames: [["EmployeeSessionID", "sessionID"]]
    });
}));
app.get("/appointment/:appointmentID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.type === constant_1.PROTECTED) {
        (0, route_1.route)(req, res, SelectProtected_1.SelectProtectedAppointment, {
            data: Object.assign({ appointmentID: req.params.appointmentID }, req.query),
            cookieNames: [
                req.query.role === constant_2.EMPLOYEE ? ["EmployeeSessionID", "sessionID"] : [""],
                req.query.role === constant_2.APPOINTMENT_HOLDER ? ["AppointmentHolderSessionID", "sessionID"] : [""]
            ]
        });
    }
    else {
        (0, route_1.route)(req, res, Select_1.SelectAppointment, {
            data: {
                appointmentID: req.params.appointmentID
            },
            cookieNames: [["EmployeeSessionID", "sessionID"]]
        });
    }
}));
app.put("/appointment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.route)(req, res, Insert_1.InsertAppointment, {
        data: req.body,
        cookieNames: [["EmployeeSessionID", "sessionID"]]
    });
}));
app.delete("/appointment", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.size === constant_1.MULTIPLE) {
        if (req.query.type === constant_1.RECOVER) {
            (0, route_1.route)(req, res, RecoverMultiple_1.RecoverAppointments, {
                data: req.body,
                cookieNames: [["EmployeeSessionID", "sessionID"]]
            });
        }
        else if (req.query.type === constant_1.PERMANENT) {
            (0, route_1.route)(req, res, PermanentDeleteMultiple_1.PermanentlyDeleteAppointments, {
                data: req.body,
                cookieNames: [["EmployeeSessionID", "sessionID"]]
            });
        }
        else if (req.query.type === constant_1.TEMPORARY) {
            (0, route_1.route)(req, res, TemporaryDeleteMultiple_1.TemporarilyDeleteAppointments, {
                data: req.body,
                cookieNames: [["EmployeeSessionID", "sessionID"]]
            });
        }
    }
    else {
        if (req.query.type === constant_1.RECOVER) {
            (0, route_1.route)(req, res, Recover_1.RecoverAppointment, {
                data: req.body,
                cookieNames: [["EmployeeSessionID", "sessionID"]]
            });
        }
        else if (req.query.type === constant_1.PERMANENT) {
            (0, route_1.route)(req, res, PermanentDelete_1.PermanentlyDeleteAppointment, {
                data: req.body,
                cookieNames: [["EmployeeSessionID", "sessionID"]]
            });
        }
        else if (req.query.type === constant_1.TEMPORARY) {
            (0, route_1.route)(req, res, TemporaryDelete_1.TemporarilyDeleteAppointment, {
                data: req.body,
                cookieNames: [["EmployeeSessionID", "sessionID"]]
            });
        }
    }
}));
// Simple Updates
app.post("/appointment/:appointmentID/date", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Update_4.UpdateDate);
}));
app.post("/appointment/:appointmentID/cost", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Update_1.UpdateCost);
}));
app.post("/appointment/:appointmentID/status", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Update_2.UpdateStatus);
}));
app.post("/appointment/:appointmentID/vehicle", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Update_3.UpdateVehicle);
}));
app.post("/appointment/:appointmentID/customer", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Update_11.UpdateCustomer);
}));
app.post("/appointment/lookup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = Lookup_1.Lookup.Test(req.body);
    // Invalid Inputs (e.g. Wrong Email Address)
    if (!input.success) {
        res.status(400).send(constant_1.INVALID_BODY);
        return;
    }
    // Invalid Email Address and Appointment ID
    const output = yield Lookup_1.Lookup.Execute(input.data);
    if (!output) {
        res.status(400).send(constant_1.INVALID_LOGIN);
        return;
    }
    yield (0, setCookie_1.setCookie)(res, { data: output, name: "AppointmentHolderSessionID" });
    res.send({ output });
}));
// Diagnoses
app.get("/appointment/:appointmentID/diagnoses", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Select_2.SelectDiagnoses);
}));
app.put("/appointment/:appointmentID/diagnosis", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Insert_2.InsertDiagnosis);
}));
app.post("/appointment/:appointmentID/diagnosis/:diagnosisID", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Update_5.UpdateDiagnosis);
}));
app.delete("/appointment/:appointmentID/diagnosis/:diagnosisID", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Delete_1.DeleteDiagnosis);
}));
// Parts
app.get("/appointment/:appointmentID/parts", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Select_3.SelectParts);
}));
app.put("/appointment/:appointmentID/part", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Insert_3.InsertPart);
}));
app.post("/appointment/:appointmentID/part/:partID", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Update_6.UpdatePart);
}));
app.delete("/appointment/:appointmentID/part/:partID", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Delete_2.DeletePart);
}));
// Repairs
app.get("/appointment/:appointmentID/repairs", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Select_4.SelectRepairs);
}));
app.put("/appointment/:appointmentID/repair", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Insert_4.InsertRepair);
}));
app.post("/appointment/:appointmentID/repair/:repairID", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Update_7.UpdateRepair);
}));
app.delete("/appointment/:appointmentID/repair/:repairID", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Delete_3.DeleteRepair);
}));
// Services
app.get("/appointment/:appointmentID/services", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Select_5.SelectServices);
}));
app.post("/appointment/:appointmentID/service/:serviceID", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Update_8.UpdateService);
}));
app.delete("/appointment/:appointmentID/service/:serviceID", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Delete_4.DeleteService);
}));
app.put("/appointment/:appointmentID/service", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.type !== constant_1.DEFINED)
        (0, route_1.routeCRUD)(req, res, Insert_5.InsertService);
    else
        (0, route_1.routeCRUD)(req, res, InsertDefined_1.InsertDefinedService);
}));
// Labels
app.get("/appointment/:appointmentID/labels", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Select_6.SelectLabels);
}));
app.post("/appointment/:appointmentID/label", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Update_9.UpdateLabel);
}));
// Notes
app.get("/appointment/:appointmentID/notes", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, SelectEmployee_1.SelectEmployeeNotes);
}));
app.put("/appointment/:appointmentID/note", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Insert_6.InsertNote);
}));
app.post("/appointment/:appointmentID/note/:noteID", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Update_10.UpdateNote);
}));
app.delete("/appointment/:appointmentID/note/:noteID", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Delete_5.DeleteNote);
}));
// Note Sharees
app.get("/appointment/note/:noteID/sharees", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Select_7.SelectNoteSharees);
}));
app.put("/appointment/note/:noteID/sharee", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Insert_7.InsertNoteSharee);
}));
app.delete("/appointment/note/:noteID/sharee", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Delete_6.DeleteNoteSharee);
}));
// Note Attachments
app.put("/appointment/note/:noteID/attachment", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Insert_8.InsertNoteAttachment);
}));
app.delete("/appointment/note/:noteID/attachment/:attachmentID", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Delete_7.DeleteNoteAttachment);
}));
// Payments
app.get("/appointment/:appointmentID/payments", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Select_8.SelectPayments);
}));
app.put("/appointment/:appointmentID/payment", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.type === constant_1.DIGITAL)
        (0, route_1.routeCRUD)(req, res, Insert_9.InsertDigitalPayment);
    else
        (0, route_1.routeCRUD)(req, res, Insert_11.InsertPayment);
}));
app.put("/appointment/:appointmentID/payment/:paymentID/credit", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Insert_10.InsertCreditCard);
}));
app.delete("/appointment/:appointmentID/payment/:paymentID", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Delete_8.DeletePayment);
}));
// Employee
app.post("/employee/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = Login_1.EmployeeLogin.Test(req.body);
    if (!input.success) {
        res.status(400).send(constant_1.INVALID_BODY);
        return;
    }
    const output = yield Login_1.EmployeeLogin.Execute(input.data);
    if (!output) {
        res.status(400).send(constant_1.INVALID_LOGIN);
        return;
    }
    (0, setCookie_1.setCookie)(res, { data: output, name: "EmployeeSessionID" });
    res.send({ output });
}));
app.post("/employee/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionID = yield (0, getCookie_1.getCookie)(req, "EmployeeSessionID");
    const input = Logout_1.EmployeeLogout.Test({ sessionID });
    if (!input.success) {
        res.status(400).send(constant_1.INVALID_BODY);
        return;
    }
    const output = yield Logout_1.EmployeeLogout.Execute(input.data);
    if (!output) {
        res.status(400).send(constant_1.INVALID_BODY);
        return;
    }
    res.clearCookie("EmployeeSessionID");
    res.send({ output: "Employee Logged Out" });
}));
app.get("/employee", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.type === constant_1.NAMES)
        (0, route_1.routeCRUD)(req, res, SelectAll_2.SelectEmployeeNames, true);
    else
        (0, route_1.routeCRUD)(req, res, Select_9.SelectEmployee);
}));
// Employee Event
app.get("/employee/events", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Select_10.SelectEvents);
}));
app.put("/employee/event", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Insert_12.InsertEvent);
}));
app.post("/employee/event/:eventID", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Update_12.UpdateEvent);
}));
app.delete("/employee/event/:eventID", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Delete_9.DeleteEvent);
}));
// Employee Event Sharee(s)
app.get("/employee/event/:eventID/sharees", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Select_11.SelectEventSharees);
}));
app.put("/employee/event/:eventID/sharee", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Insert_13.InsertEventSharee);
}));
app.delete("/employee/event/:eventID/sharee", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, route_1.routeCRUD)(req, res, Delete_10.DeleteEventSharee);
}));
// Information
app.get("/makes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, Select_12.SelectInfoMakes)());
}));
app.get("/labels", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, Select_15.SelectInfoLabels)());
}));
app.get("/services", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, Select_14.SelectInfoServices)());
}));
app.get("/statuses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, Select_13.SelectInfoStatuses)());
}));
