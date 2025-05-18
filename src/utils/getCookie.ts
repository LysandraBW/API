"use server";
import { Request } from "express";
import jwt from "jsonwebtoken";

export const getCookie = async (
    req: Request,
    name: string
): Promise<string|null> => {
    const data = req.cookies[name];
    if (!data)
        return null;
    const decryptedData = jwt.verify(data, process.env.ATS || "") || "";
    return <string> decryptedData;
}