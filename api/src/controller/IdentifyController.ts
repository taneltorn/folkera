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
                fs.mkdirSync(this.uploadDir, {recursive: true});
            }
            cb(null, this.uploadDir);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        },
    });
    upload = multer({storage: this.storage});

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
    }

    async identify(req: ApiRequest, res: Response): Promise<any> {
        const {file, top, selfRef, dataset} = req.query;
        try {

            // @ts-ignore
            const result = await this.identifyService.identify(file, top, selfRef, dataset);

            if (!result.success) {
                res.status(500).json({error: result.error});
                return;
            }
            res.status(200).json(result);
        } catch (err) {
            this.logger.error(err);
            res.status(500).json({error: "An unexpected error occurred."});
        } finally {
            const filePath = file as string;
            if (!selfRef && filePath?.includes("_uploaded")) {
                this.removeFile(filePath);
            }
        }
    }

    async uploadFile(req: Request, res: Response): Promise<any> {
        try {
            // @ts-ignore
            if (!req.file) {
                return res.status(400).json({error: "No file uploaded"});
            }

            // @ts-ignore
            const filePath = `${this.uploadDir}/${req.file.filename}`;
            this.logger.info(`File uploaded to ${filePath}`);

            return res.status(200).json({message: "File uploaded successfully", filePath});
        } catch (err) {
            this.logger.error("Upload error:", err);
            return res.status(500).json({error: "Failed to upload file"});
        }
    }

    private removeFile(filePath: string) {
        this.logger.info(`Deleting file: ${filePath}`);
        try {
            if (!filePath) {
                this.logger.error("Missing filePath in request body");
            }

            if (!fs.existsSync(filePath)) {
                this.logger.error(`File not found`);
            }

            fs.unlinkSync(filePath);
            this.logger.info(`Deleted file: ${filePath}`);
        } catch (err) {
            this.logger.error("Delete file error:", err);
        }
    }
}

export default IdentifyController;