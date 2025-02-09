import express, {Request, Response} from "express";
import log4js from "log4js";
import RecordingService from "../service/RecordingService";
import {Recording} from "../../../domain/Recording";
import {logRequest, logRequestWithBody} from "../middleware/requestLogger";

class RecordingController {

    router = express.Router();
    logger = log4js.getLogger("RecordingController");

    recordingService = new RecordingService();

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", logRequest, this.getRecordings.bind(this));
        this.router.put("/", logRequestWithBody, this.saveRecordings.bind(this));
    }

    async getRecordings(req: Request, res: Response): Promise<any> {
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

    async saveRecordings(req: Request, res: Response): Promise<Recording> {
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