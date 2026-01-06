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
    console.log(2);
    const cookies = await assembleCookies(req, options.cookieNames);
    console.log(3);
    const input = procedure.Test({...cookies, ...(options.data || {})});
    console.log(4);
    // Send Error
    if (!input.success) {
        console.log(JSON.stringify(input.error));
        console.log(5);
        res.status(400).send(INVALID_BODY);
        return;
    }
    console.log(6);
    // Send Output
    const output = await procedure.Execute(input.data);
    console.log(7);
    res.send({output});
};

export async function routeCRUD(req: Request, res: Response, procedure: Procedure, includeQueries: boolean = false) {
    const sessionID = await getCookie(req, "EmployeeSessionID");
    let input = {sessionID, ...req.params, ...req.body};
    console.log(input);
    if (includeQueries)
        input = {...input, ...req.query}
    input = procedure.Test(input);

    // Send Error
    if (!input.success) {
        console.log(JSON.stringify(input.error));
        res.status(400).send(INVALID_BODY);
        return;
    }
    // Send Output
    const output = await procedure.Execute(input.data);
    res.send({output});
};
