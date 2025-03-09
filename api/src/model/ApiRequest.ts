import {Request} from "express";
import {Pagination} from "../../../ui/src/model/Pagination";
import {Filter} from "./Filter";

export interface ApiRequest extends Request {
    filters?: Filter[];
    pagination?: Pagination;
}

