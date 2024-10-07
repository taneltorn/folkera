import express, {Request, Response} from "express";
import log4js from "log4js";
import StatsService from "../service/StatsService";
import DataTransformerFactory from "../factories/DataTransformerFactory";

class StatsController {

    router = express.Router();
    logger = log4js.getLogger("StatsController");

    statsService = new StatsService();

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.logger.info("init routes");

        this.router.post("/", this.getStats.bind(this));
    }

    private generateRangeAsMap = (start: number, end: number, initialValue: number = 0): Map<string, number> => {
        const rangeMap = new Map<string, number>();

        for (let i = start; i <= end; i++) {
            rangeMap.set(i.toString(), initialValue);
        }

        return rangeMap;
    }

    async getStats(req: Request, res: Response): Promise<any> {
        this.logger.info("POST /api/stats");

        try {
            const {key, transformer} = req.query;
            const data = req.body;

            if (!key) {
                res.status(400).json({error: "Missing key query parameter"});
                return;
            }

            let initial = undefined;
            if (key === "year") {
                initial = this.generateRangeAsMap(1912, 1999);
            }

            const dataTransformer = DataTransformerFactory.create(transformer as string);
            const result = await this.statsService.getStats(data, key as string, dataTransformer, initial);

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