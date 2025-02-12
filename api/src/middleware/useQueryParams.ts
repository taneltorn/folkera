import {NextFunction, Response} from "express";
import {ApiRequest} from "../model/ApiRequest";
import {Filter} from "../../../domain/Filter";

const filterableKeys = [
    "search",
    "ref",
    "tune",
    "year",
    "datatype",
    "performer",
    "instrument",
    "parish",
    "origin",
    "collector",
    "content",
    "notes",
    "comments",
    "quality",
    "file",
    "archive",
];

export const useQueryParams = (req: ApiRequest, res: Response, next: NextFunction) => {
    const filters: Filter[] = [];
    filterableKeys.forEach(key => {
        if (req.query[key]) {
            filters.push({field: key, value: req.query[key] as string});
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


