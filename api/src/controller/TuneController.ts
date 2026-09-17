import express, {Request, Response} from "express";
import log4js from "log4js";
import CsvTuneService from "../service/tunes/CsvTuneService";
import {logRequest, logRequestWithBody} from "../middleware/requestLogger";
import {useQueryParams} from "../middleware/useQueryParams";
import {ApiRequest} from "../model/ApiRequest";
import {Tune} from "../model/Tune";
import {verifyToken} from "../middleware/verifyToken";
import {Result} from "../model/Result";
import AudioService from "../service/audio/AudioService";
import {optionalVerifyToken} from "../middleware/optionalVerifyToken";
import TuneAccessService from "../service/tunes/TuneAccessService";

class TuneController {

    router = express.Router();
    logger = log4js.getLogger("TuneController");

    audioService = new AudioService();
    tuneAccessService = new TuneAccessService();
    tuneService = new CsvTuneService();

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/by-ids", logRequest, this.getTuneByIds.bind(this));
        this.router.get("/ids-only", logRequest, useQueryParams, this.getTuneIds.bind(this));
        this.router.get("/:id", optionalVerifyToken, logRequest, this.getTune.bind(this));
        this.router.get("/:id/audio", optionalVerifyToken, logRequest, this.playTune.bind(this));
        this.router.get("/", logRequest, useQueryParams, this.getTunes.bind(this));
        this.router.put("/", verifyToken, logRequestWithBody, this.saveTune.bind(this));
    }

    async getTune(req: ApiRequest, res: Response): Promise<Tune> {
        try {
            // @ts-ignore todo use custom type
            const user = req.user;

            const id = req.params.id;
            const result = await this.tuneService.findById(id, user);

            if (!result.success) {
                if (result.error === "Tune not found") {
                    res.status(404).json({error: result.error});
                    return;
                }
                res.status(500).json({error: result.error});
                return;
            }
            res.status(200).json(result.data);
        } catch (err) {
            this.logger.error(err);
            res.status(500).json({error: "An unexpected error occurred."});
        }
    }

    async getTuneByIds(req: Request, res: Response): Promise<void> {
        try {
            // @ts-ignore todo use custom type
            const user = req.user;

            const idsParam = req.query.ids as string;

            if (!idsParam) {
                res.status(400).json({error: "Missing 'ids' query parameter"});
                return;
            }

            const ids = idsParam.split(",").map(id => id.trim()).filter(Boolean);

            if (ids.length === 0) {
                res.status(400).json({error: "No valid IDs provided in query parameter"});
                return;
            }

            const result = await this.tuneService.findByIds(ids, user);

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

    async getTunes(req: ApiRequest, res: Response): Promise<Result<Tune[]>> {
        try {
            // @ts-ignore todo use custom type
            const user = req.user;

            const result = await this.tuneService.find(req.filters, req.pagination, user);

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

    async getTuneIds(req: ApiRequest, res: Response): Promise<Result<string[]>> {
        try {
            const result = await this.tuneService.findIdsOnly(req.filters, req.pagination);

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

    async saveTune(req: Request, res: Response): Promise<Tune> {
        try {
            const data = req.body;

            if (!data) {
                this.logger.info(`Request body is null`);
                res.status(400).json({error: "Missing tune information"});
                return;
            }

            const result = await this.tuneService.save(data);
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

    async playTune(req: ApiRequest, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const variant = Number(req.query.variant ?? 0);

            // @ts-ignore todo use custom type
            const user = req.user;

            const result = await this.tuneService.findById(id);

            if (!result.success || !result.data) {
                res.status(404).json({error: "Tune not found"});
                return;
            }

            const tune = result.data;

            const hasAccess = await this.tuneAccessService.hasAccess(tune, user);
            if (!hasAccess) {
                res.status(403).json({error: "Access denied"});
                return;
            }

            const audios = tune.audio?.split(";") ?? [];
            if (audios.length === 0) {
                res.status(404).json({error: "Audio not found"});
                return;
            }

            if (!Number.isInteger(variant) || variant < 0 || variant >= audios.length) {
                res.status(400).json({error: "Invalid audio variant"});
                return;
            }

            const filename = audios[variant];

            this.audioService.serve(filename, req, res);

        } catch (err) {
            this.logger.error(err);

            res.status(500).json({
                error: "An unexpected error occurred."
            });
        }
    }
}

export default TuneController;