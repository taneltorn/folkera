import {Request} from "express";
import {Filter} from "./Filter";
import {Pagination} from "./Pagination";

export interface ApiRequest extends Request {
    filters?: Filter[];
    pagination?: Pagination;
}

