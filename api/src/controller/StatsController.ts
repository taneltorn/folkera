import express, {Request, Response} from "express";
import log4js from "log4js";
import CsvStatsService from "../service/stats/CsvStatsService";
import DataTransformer from "../transformers/DataTransformer";
import CsvTuneService from "../service/tunes/CsvTuneService";
import {logRequest} from "../middleware/requestLogger";
import {useQueryParams} from "../middleware/useQueryParams";
import {GroupByToDataTransformerMap, GroupByToListMap} from "../utils/stats.helpers";
import {Stats} from "../model/Stats";
import {GroupBy} from "../model/GroupBy";
import {SortDirection} from "../model/Pagination";

class StatsController {

    router = express.Router();
    logger = log4js.getLogger("StatsController");

    statsService = new CsvStatsService();
    tuneService = new CsvTuneService();

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", logRequest, useQueryParams, this.getStats.bind(this));
    }

    async getStats(req: Request, res: Response): Promise<Stats> {
        try {
            const {groupBy} = req.query;
            
            // @ts-ignore
            const data = await this.tuneService.find(req.filters, {sortField: groupBy, sortDirection: SortDirection.ASC}).then(result => result.data);
            
            if (!groupBy) {
                res.status(400).json({error: "Missing groupBy URL parameter"});
                return;
            }

            const dataTransformers: DataTransformer[] = GroupByToDataTransformerMap.get(groupBy as GroupBy) || [];
            const groups: string[] | undefined = GroupByToListMap.get(groupBy as GroupBy);
            
            const result = await this.statsService.getStats(data, groupBy as GroupBy, dataTransformers, groups);
            if (!result.success) {
                res.status(500).json({error: result.error});
                return;
            }
            res.status(200).json(result.data);
        } catch (err) {
            this.logger.error(err);
            res.status(500).json({error: "An unexpected error occurred."});
        }
    }
}

export default StatsController;