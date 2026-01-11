import { Request, Response } from "express";
import { INVALID_BODY } from "./constant";
import { Procedure } from "./db/Procedure";
import { getCookie } from "./utils/getCookie";

export async function routeEmployee(req: Request, res: Response, procedure: Procedure, includeQueries: boolean = false) {
    const sessionID = await getCookie(req, "EmployeeSessionID");
    let input = { sessionID, ...req.params, ...req.body };

    if (includeQueries)
        input = { ...input, ...req.query };
    
    input = procedure.Test(input);

    // Send 400
    if (!input.success) {
        console.log(JSON.stringify(input.error));
        res.status(400).send(INVALID_BODY);
        return;
    }

    // Send 200 and Output
    const output = await procedure.Execute(input.data);
    res.status(200).send(JSON.stringify(output));
};