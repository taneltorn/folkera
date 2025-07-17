import express, {Request, Response} from "express";
import log4js from "log4js";
import CsvRecordingService from "../service/recordings/CsvRecordingService";
import {logRequest, logRequestWithBody} from "../middleware/requestLogger";
import {useQueryParams} from "../middleware/useQueryParams";
import {ApiRequest} from "../model/ApiRequest";
import {ResultList} from "../model/ResultList";
import {Recording} from "../model/Recording";
import path from "path";
import fs from "fs";
import {verifyToken} from "../middleware/verifyToken";

class RecordingController {

    router = express.Router();
    logger = log4js.getLogger("RecordingController");

    recordingService = new CsvRecordingService();

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/by-ids", logRequest, this.getRecordingsByIds.bind(this));
        this.router.get("/:id", logRequest, this.getRecording.bind(this));
        this.router.get("/", logRequest, useQueryParams, this.getRecordings.bind(this));
        this.router.put("/", verifyToken, logRequestWithBody, this.saveRecordings.bind(this));
        this.router.get("/audio/:filename", verifyToken, logRequest, this.serveAudio.bind(this));
    }

    async getRecording(req: ApiRequest, res: Response): Promise<Recording> {
        try {
            const id = req.params.id;
            const result = await this.recordingService.findById(id);

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

    async getRecordingsByIds(req: Request, res: Response): Promise<void> {
        try {
            const idsParam = req.query.ids as string;

            if (!idsParam) {
                res.status(400).json({ error: "Missing 'ids' query parameter" });
                return;
            }

            const ids = idsParam.split(",").map(id => id.trim()).filter(Boolean);

            if (ids.length === 0) {
                res.status(400).json({ error: "No valid IDs provided in query parameter" });
                return;
            }

            const result = await this.recordingService.findByIds(ids);

            if (!result.success) {
                res.status(500).json({ error: result.error });
                return;
            }

            res.status(200).json(result.data);
        } catch (err) {
            this.logger.error(err);
            res.status(500).json({ error: "An unexpected error occurred." });
        }
    }
    
    async getRecordings(req: ApiRequest, res: Response): Promise<ResultList<Recording>> {
        try {
            const result = await this.recordingService.find(req.filters, req.pagination);

            if (!result.success) {
                res.status(500).json({error: result.error});
                return;
            }
            res.status(200).json(result);
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

    async serveAudio(req: ApiRequest, res: Response): Promise<void> {
        try {
            const { filename } = req.params;

            const baseDir = path.resolve(process.env.VITE_RECORDINGS_DIR || "mp3");
            const filePath = path.resolve(baseDir, filename);

            if (!fs.existsSync(filePath)) {
                res.status(404).json({ error: "File not found" });
                return;
            }

            res.setHeader("Content-Type", "audio/mpeg");
            res.setHeader("Content-Disposition", `inline; filename="${filename}"`);

            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } catch (err) {
            this.logger.error(err);
            res.status(500).json({ error: "An unexpected error occurred." });
        }
    }
}

export default RecordingController;