import { Request } from "express";
import { Data } from "./db/Procedure";
import { getCookie } from "./utils/getCookie";


export async function cookiesFromRequest(req: Request, cookieNames?: Array<[string] | [string, string]>) {
    if (!cookieNames || cookieNames.length === 0)
        return {};

    const cookies: Data = {};

    for (const cookieName of cookieNames) {
        const cookieKey = cookieName[cookieName.length - 1];
        const cookieValue = await getCookie(req, cookieName[0]);

        if (cookieValue === null)
            continue;

        cookies[cookieKey] = cookieValue;
    }

    return cookies;
}