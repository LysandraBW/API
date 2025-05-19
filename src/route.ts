import { Request, Response } from "express";
import { INVALID_BODY } from "./constant";
import { Procedure, Data } from "./db/Procedure";
import { getCookie } from "./utils/getCookie";

async function assembleCookies(req: Request, cookieNames?: Array<[string]|[string,string]>) {
    if (!cookieNames || cookieNames.length === 0)
        return {};
    const cookies: Data = {};
    for (const cookieName of cookieNames) {
        const cookieKey = cookieName[cookieName.length - 1];
        const cookieValue = await getCookie(req, cookieName[0]);
        if (cookieValue === null) {
            console.log("No Cookie w/ Name: ", cookieName[0]);
            continue;
        }
        cookies[cookieKey] = cookieValue;
    }
    return cookies;
}

export interface Options {
    data?: Data;
    cookieNames?: Array<[string]|[string,string]>;
}

export async function route(req: Request, res: Response, procedure: Procedure, options: Options) {
    const cookies = await assembleCookies(req, options.cookieNames);
    console.log("Cookies: ", cookies);
    console.log("Cookie Names: ", options.cookieNames);
    const input = procedure.Test({...cookies, ...(options.data || {})});
    // Send Error
    if (!input.success) {
        console.log("E", input.error);
        res.status(400).send(INVALID_BODY);
        return;
    }
    // Send Output
    console.log("F");
    const output = await procedure.Execute(input.data);
    res.send({output});
};

export async function routeCRUD(req: Request, res: Response, procedure: Procedure) {
    const sessionID = await getCookie(req, "EmployeeSessionID");
    const input = procedure.Test({sessionID, ...req.params, ...req.body});
    // Send Error
    if (!input.success) {
        res.status(400).send(INVALID_BODY);
        return;
    }
    // Send Output
    const output = await procedure.Execute(input.data);
    res.send({output});
};
