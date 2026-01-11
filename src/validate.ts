import { isInteger, isUUID } from "waltronics-types";
import { z } from "zod";

// Unit Tests
export type UnitTest = z.ZodType;

// Test
// In a test, each value is assigned a unit test.
// These defined Test variables below are common
// parts of these tests, so they're defined here
// for convenience.
export type Test = { [name: string]: UnitTest; };
export const noteTest: Test = { sessionID: isUUID, noteID: isInteger };
export const eventTest: Test = { sessionID: isUUID, eventID: isInteger };
export const appointmentTest: Test = { sessionID: isUUID, appointmentID: isUUID };