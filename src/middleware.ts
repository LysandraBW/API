import { NextFunction, Request, Response } from "express";
import { getCookie } from "./utils/getCookie";
import { authenticate } from "./pool";
import { EMPLOYEE } from './constant';

export default async function authenticateEmployee(req: Request, res: Response, next: NextFunction) {
    const sessionID = await getCookie(req, "EmployeeSessionID");
    if (!sessionID || !(await authenticate(sessionID, EMPLOYEE))) {
        const error = new Error("Unauthorized Access!");
        return next(error);
    }
    return next();
}