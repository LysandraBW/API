"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentTest = exports.eventTest = exports.noteTest = exports.isBit = exports.isString = exports.isUUIDArray = exports.isUUID = exports.hasLength = exports.isIntegerArray = exports.isInteger = exports.isVIN = exports.isMoney = exports.isDate = exports.isPhone = exports.isEmail = exports.isName = exports.SQL_DATE = exports.UUID = exports.VIN = void 0;
const zod_1 = require("zod");
const validator_1 = __importDefault(require("validator"));
// Regexes
exports.VIN = /^[A-HJ-NPR-Z0-9]{17}$/;
exports.UUID = /^[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}$/;
exports.SQL_DATE = /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}(:[0-9]{2}$|:[0-9]{2}.[0-9]{3}$)/;
exports.isName = zod_1.z.string().refine(s => validator_1.default.isAlpha(s, undefined, { ignore: " -" }) && s.length > 0 && s.length <= 50);
exports.isEmail = zod_1.z.string().email().max(320);
exports.isPhone = zod_1.z.string().refine(s => validator_1.default.isMobilePhone(s));
exports.isDate = zod_1.z.string().refine(s => !!s.match(exports.SQL_DATE));
exports.isMoney = zod_1.z.string().refine(s => validator_1.default.isNumeric(s));
exports.isVIN = zod_1.z.string().refine(s => !!s.match(exports.VIN));
exports.isInteger = zod_1.z.string().refine(s => validator_1.default.isInt(s));
exports.isIntegerArray = zod_1.z.array(zod_1.z.string()).refine(nums => nums.every(num => validator_1.default.isInt(num)));
exports.hasLength = zod_1.z.string().min(1);
exports.isUUID = zod_1.z.string().refine(s => !!s.match(exports.UUID));
exports.isUUIDArray = zod_1.z.array(zod_1.z.string()).refine(ids => ids.every(id => !!id.match(exports.UUID)));
exports.isString = zod_1.z.string();
exports.isBit = zod_1.z.string().refine(s => s === "0" || s === "1");
exports.noteTest = { sessionID: exports.isUUID, noteID: exports.isInteger };
exports.eventTest = { sessionID: exports.isUUID, eventID: exports.isInteger };
exports.appointmentTest = { sessionID: exports.isUUID, appointmentID: exports.isUUID };
