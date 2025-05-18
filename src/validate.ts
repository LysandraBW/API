import { z } from "zod";
import validator from "validator";

// Regexes
export const VIN = /^[A-HJ-NPR-Z0-9]{17}$/;
export const UUID = /^[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}$/;
export const SQL_DATE = /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}(:[0-9]{2}$|:[0-9]{2}.[0-9]{3}$)/;

// Unit Tests
export type UnitTest = z.ZodType;
export const isName: UnitTest = z.string().refine(s => validator.isAlpha(s, undefined, {ignore: " -"}) && s.length > 0 && s.length <= 50);
export const isEmail: UnitTest = z.string().email().max(320);
export const isPhone: UnitTest = z.string().refine(s => validator.isMobilePhone(s));
export const isDate: UnitTest = z.string().refine(s => !!s.match(SQL_DATE));
export const isMoney: UnitTest = z.string().refine(s => validator.isNumeric(s));
export const isVIN: UnitTest = z.string().refine(s => !!s.match(VIN));
export const isInteger: UnitTest = z.string().refine(s => validator.isInt(s));
export const isIntegerArray: UnitTest = z.array(z.string()).refine(nums => nums.every(num => validator.isInt(num)));
export const hasLength: UnitTest = z.string().min(1);
export const isUUID: UnitTest = z.string().refine(s => !!s.match(UUID));
export const isUUIDArray: UnitTest = z.array(z.string()).refine(ids => ids.every(id => !!id.match(UUID)));
export const isString: UnitTest = z.string();
export const isBit: UnitTest = z.string().refine(s => s === "0" || s === "1");

// Test
// In a test, each value is assigned a unit test.
// These defined Test variables below are common
// parts of these tests, so they're defined here
// for convenience.
export type Test = { [name: string]: UnitTest; };
export const noteTest: Test = { sessionID: isUUID, noteID: isInteger };
export const eventTest: Test = { sessionID: isUUID, eventID: isInteger };
export const appointmentTest: Test = { sessionID: isUUID, appointmentID: isUUID };