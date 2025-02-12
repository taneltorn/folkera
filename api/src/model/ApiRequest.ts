import {Request} from "express";
import {Pagination} from "../../../domain/Pagination";
import {Filter} from "../../../domain/Filter";

export interface ApiRequest extends Request {
    filters?: Filter[];
    pagination?: Pagination;
}

