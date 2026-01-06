"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = route;
exports.routeCRUD = routeCRUD;
const constant_1 = require("./constant");
const getCookie_1 = require("./utils/getCookie");
function assembleCookies(req, cookieNames) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!cookieNames || cookieNames.length === 0)
            return {};
        const cookies = {};
        for (const cookieName of cookieNames) {
            const cookieKey = cookieName[cookieName.length - 1];
            const cookieValue = yield (0, getCookie_1.getCookie)(req, cookieName[0]);
            if (cookieValue === null) {
                continue;
            }
            cookies[cookieKey] = cookieValue;
        }
        return cookies;
    });
}
function route(req, res, procedure, options) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(2);
        const cookies = yield assembleCookies(req, options.cookieNames);
        console.log(3);
        const input = procedure.Test(Object.assign(Object.assign({}, cookies), (options.data || {})));
        console.log(4);
        // Send Error
        if (!input.success) {
            console.log(JSON.stringify(input.error));
            console.log(5);
            res.status(400).send(constant_1.INVALID_BODY);
            return;
        }
        console.log(6);
        // Send Output
        const output = yield procedure.Execute(input.data);
        console.log(7);
        res.send({ output });
    });
}
;
function routeCRUD(req_1, res_1, procedure_1) {
    return __awaiter(this, arguments, void 0, function* (req, res, procedure, includeQueries = false) {
        const sessionID = yield (0, getCookie_1.getCookie)(req, "EmployeeSessionID");
        let input = Object.assign(Object.assign({ sessionID }, req.params), req.body);
        console.log(input);
        if (includeQueries)
            input = Object.assign(Object.assign({}, input), req.query);
        input = procedure.Test(input);
        // Send Error
        if (!input.success) {
            console.log(JSON.stringify(input.error));
            res.status(400).send(constant_1.INVALID_BODY);
            return;
        }
        // Send Output
        const output = yield procedure.Execute(input.data);
        res.send({ output });
    });
}
;
