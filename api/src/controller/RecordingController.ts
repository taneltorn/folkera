import express, {Request, Response} from "express";
import log4js from "log4js";
import RecordingService from "../service/RecordingService";
import {Recording} from "../../../domain/Recording";

class RecordingController {

    router = express.Router();
    logger = log4js.getLogger("RecordingController");

    recordingService = new RecordingService();

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.logger.info("init routes");

        this.router.get("/file", this.getDataFromFile.bind(this));
        this.router.get("/", this.getRecordings.bind(this));
        this.router.put("/", this.saveRecordings.bind(this));

        this.router.get("/stats", this.getRecordingStats.bind(this));
    }

    async getDataFromFile(req: Request, res: Response): Promise<any> {
        this.logger.info("GET /api/recordings/file");

        try {
            const {path} = req.query;
            if (!path) {
                res.status(400).json({error: "Missing path URL parameter"});
                return;
            }

            const result = await this.recordingService.findFromFile(path as string);

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

    async getRecordings(req: Request, res: Response): Promise<any> {
        this.logger.info("GET /api/recordings");

        try {
            const result = await this.recordingService.findAll();

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

    async getRecordingStats(req: Request, res: Response): Promise<any> {
        this.logger.info("GET /api/recordings/stats");

        try {
            const result = await this.recordingService.getStats();

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

    async saveRecordings(req: Request, res: Response): Promise<Recording> {
        this.logger.info(`PUT /recordings`);

        try {
            const data = req.body;

            if (!data) {
                this.logger.info(`Request body is null`);
                res.status(400).json({error: "Missing recording information"});
                return;
            }

            const result = await this.recordingService.save(data);
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

export default RecordingController;