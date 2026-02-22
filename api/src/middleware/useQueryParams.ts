import {NextFunction, Response} from "express";
import {ApiRequest} from "../model/ApiRequest";
import {Filter} from "../model/Filter";

const filterableKeys = [
    "search",
    "ref",
    "tune",
    "year",
    "dance",
    "trainset",
    "performer",
    "instrument",
    "parish",
    "county",
    "origin",
    "collector",
    "content",
    "notes",
    "comments",
    "duration",
    "file",
    "datatype",
    "order",
    "from",
    "to",
];

export const useQueryParams = (req: ApiRequest, res: Response, next: NextFunction) => {
    const filters: Filter[] = [];
    filterableKeys.forEach(key => {
        if (req.query[key]) {
            const values = (req.query[key] as string).split(";");
            values.forEach(v => {
                const valueAndType = v.split(":");
                filters.push({field: key, value: valueAndType[0], type: valueAndType[1] || "contains"});
            });
        }
    });

    const {page, size, sortField, sortDirection} = req.query;
    if (page || size || sortField || sortDirection) {
        // @ts-ignore
        req.pagination = {page, size, sortField, sortDirection};
    }

    // @ts-ignore
    req.filters = filters;

    next();
};


