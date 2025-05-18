import { z } from "zod";

export type Data = {[name: string]: any};
export type TestFunction = z.ZodObject<{[name: string]: z.ZodType}, "strip", z.ZodTypeAny, {}, {}>;
export type ExecuteFunction = (data: Data) => Promise<any>;
export type Procedure = {
    Test: (data: Data) => z.SafeParseReturnType<any, any>;
    Execute: ExecuteFunction;
}

export const buildProcedure = (Test: TestFunction, Execute: ExecuteFunction): Procedure => {
    return {
        "Test": (data) => Test.safeParse(data), 
        "Execute": Execute
    };
}