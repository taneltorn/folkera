import express, {Request, Response} from "express";
import log4js from "log4js";
import StatsService from "../service/StatsService";
import DataTransformerFactory from "../factories/DataTransformerFactory";
import DataTransformer from "../transformers/DataTransformer";
import RecordingService from "../service/RecordingService";

class StatsController {

    router = express.Router();
    logger = log4js.getLogger("StatsController");

    statsService = new StatsService();
    dataTransformerFactory = new DataTransformerFactory();

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.logger.info("init routes");
        this.router.post("/map", this.fetchMapStats.bind(this));
        this.router.post("/", this.getStats.bind(this));
    }

    async getStats(req: Request, res: Response): Promise<any> {
        this.logger.info("POST /api/stats");

        try {
            const {data, groups, groupBy, transformers} = req.body;

            if (!data || !groupBy) {
                res.status(400).json({error: "Missing data or groupBy URL parameter"});
                return;
            }

            const dataTransformers: DataTransformer[] = [];
            transformers?.map((v: string) => v.trim())
                .forEach((v: string) => {
                    dataTransformers.push(this.dataTransformerFactory.get(v));
                });

            const result = await this.statsService.getStats(data, groupBy, dataTransformers, groups);

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

    async fetchMapStats(req: Request, res: Response): Promise<any> {
        this.logger.info("GET /api/stats");

        try {
            const data = req.body;


            const parishResult = await this.statsService.getStats(data, "location", [
                this.dataTransformerFactory.get("SplitByComma"),
                this.dataTransformerFactory.get("CutFromLessThanSign")
            ]);

            const countyResult = await this.statsService.getStats(data, "location", [
                this.dataTransformerFactory.get("SplitByComma"),
                this.dataTransformerFactory.get("CutFromLessThanSign"),
                this.dataTransformerFactory.get("ParishToCounty"),
            ]);


            if (!parishResult.success) {
                res.status(500).json({error: parishResult.error});
                return;
            }
            if (!countyResult.success) {
                res.status(500).json({error: countyResult.error});
                return;
            }

            res.status(200).json({
                parishes: parishResult.data,
                counties: countyResult.data,
            });
        } catch (err) {
            this.logger.error(err);
            res.status(500).json({error: "An unexpected error occurred."});
        }
    }

    // private generateRangeAsMap = (start: number, end: number, initialValue: number = 0): Map<string, number> => {
    //     const rangeMap = new Map<string, number>();
    //
    //     for (let i = start; i <= end; i++) {
    //         rangeMap.set(i.toString(), initialValue);
    //     }
    //
    //     return rangeMap;
    // }

    // async getStats(req: Request, res: Response): Promise<any> {
    //     this.logger.info("POST /api/stats");
    //
    //     try {
    //         const {key, transformer} = req.query;
    //         const data = req.body;
    //
    //         if (!key) {
    //             res.status(400).json({error: "Missing key query parameter"});
    //             return;
    //         }
    //
    //         let initial = undefined;
    //         if (key === "year") {
    //             initial = this.generateRangeAsMap(1912, 1999);
    //         }
    //
    //         const dataTransformer = DataTransformerFactory.create(transformer as string);
    //         const result = await this.statsService.getStats(data, key as string, dataTransformer, initial);
    //
    //         if (!result.success) {
    //             res.status(500).json({error: result.error});
    //             return;
    //         }
    //         res.status(200).json(result.data);
    //     } catch (err) {
    //         this.logger.error(err);
    //         res.status(500).json({error: "An unexpected error occurred."});
    //     }
    // }
}

export default StatsController;