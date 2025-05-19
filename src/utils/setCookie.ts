"use server";
import { Response } from "express";
import jwt from "jsonwebtoken";

export const setCookie = async (
    res: Response, 
    cookie: {
        name: string;
        data: string;
    }
): Promise<void> => {
    const token = jwt.sign(cookie.data, process.env.ATS || '');
    console.log(cookie.name, token);
    res.cookie(cookie.name, token, {maxAge: 9000000, httpOnly: false, secure: true, sameSite: "none", path: "/"});
    console.log('Cookies set:', res.getHeaders()['set-cookie']);

}