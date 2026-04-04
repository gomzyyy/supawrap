import { type Response } from "../../types/index.js";
export declare class APIResponse {
    private readonly data;
    private readonly flag;
    private readonly error?;
    constructor(data: Response["data"], flag?: Response["flag"], error?: Response["error"]);
    build(): Response;
}
