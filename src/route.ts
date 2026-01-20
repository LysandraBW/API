import { Request, Response } from "express";
import { INVALID_BODY } from "./constant";
import { Procedure, Data } from "./db/Procedure";
import { cookiesFromRequest } from "./cookiesFromRequest";

export interface Options {
    data?: Data;
    cookieNames?: Array<[string]|[string,string]>;
}

export async function route(req: Request, res: Response, procedure: Procedure, options: Options) {
    const cookies = await cookiesFromRequest(req, options.cookieNames);
    const input = procedure.Test({...cookies, ...(options.data || {})});
    
    // Send Error
    if (!input.success) {
        res.status(400).send(INVALID_BODY);
        return;
    }
    
    // Send Output
    const output = await procedure.Execute(input.data);
    res.status(200).send(JSON.stringify(output));
};