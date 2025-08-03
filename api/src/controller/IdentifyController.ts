import express, {Response} from "express";
import log4js from "log4js";
import {logRequest} from "../middleware/requestLogger";
import {useQueryParams} from "../middleware/useQueryParams";
import {ApiRequest} from "../model/ApiRequest";
import CoverHunterIdentifyService from "../service/identify/CoverHunterIdentifyService";
import multer from "multer";
import fs from "fs";

class IdentifyController {

    router = express.Router();
    logger = log4js.getLogger("IdentifyController");

    identifyService = new CoverHunterIdentifyService();

    uploadDir = `${process.env.VITE_RECORDINGS_DIR}/_uploaded`;
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync(this.uploadDir)) {
                fs.mkdirSync(this.uploadDir, { recursive: true });
            }
            cb(null, this.uploadDir);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        },
    });
    upload = multer({ storage: this.storage });
    
    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", logRequest, useQueryParams, this.identify.bind(this));
        this.router.post(
            "/upload",
            logRequest,
            this.upload.single("file"),
            this.uploadFile.bind(this)
        );
        this.router.delete("/delete", logRequest, this.deleteFile.bind(this));
    }

    async identify(req: ApiRequest, res: Response): Promise<any> {
        try {
            const {file, top, selfRef} = req.query;

            // @ts-ignore
            const result = await this.identifyService.identify(file, top, selfRef);

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

    async uploadFile(req: Request, res: Response): Promise<any> {
        try {
            // @ts-ignore
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            // @ts-ignore
            const filePath = `${this.uploadDir}/${req.file.filename}`;
            this.logger.info(`File uploaded to ${filePath}`);

            return res.status(200).json({ message: "File uploaded successfully", filePath });
        } catch (err) {
            this.logger.error("Upload error:", err);
            return res.status(500).json({ error: "Failed to upload file" });
        }
    }

    async deleteFile(req: Request, res: Response): Promise<any> {
        try {
            
            // @ts-ignore
            const filePath = req.body.filePath; 

            if (!filePath) {
                return res.status(400).json({ error: "Missing filePath in request body" });
            }

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ error: "File not found" });
            }

            this.logger.info(`Deleting file: ${filePath}`);
            

            fs.unlinkSync(filePath);
            this.logger.info(`Deleted file: ${filePath}`);
            return res.status(200).json({ message: "File deleted successfully" });

        } catch (err) {
            this.logger.error("Delete file error:", err);
            return res.status(500).json({ error: "Failed to delete file" });
        }
    }
}

export default IdentifyController;