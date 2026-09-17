import express, {Request, Response} from "express";
import log4js from "log4js";
import {verifyToken} from "../middleware/verifyToken";
import {logRequestWithBody} from "../middleware/requestLogger";
import {TuneAccess} from "../model/TuneAccess";
import TuneAccessService from "../service/tunes/TuneAccessService";

class AccessController {

    router = express.Router();
    logger = log4js.getLogger("AccessController");

    tuneAccessService = new TuneAccessService()

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/", verifyToken, logRequestWithBody, this.addAccessRefs.bind(this));
    }

    async addAccessRefs(req: Request, res: Response): Promise<void> {
        try {
            // @ts-ignore todo use custom type
            const user = req.user;
            const data: TuneAccess[] = req.body;

            if (user?.role !== "ADMIN") {
                this.logger.info(`Not authorized: ${user.username}`);
                res.status(403).json({error: "Not authorized"});
                return;
            }

            if (!Array.isArray(data) || data.length === 0) {
                res.status(400).json({error: "Missing tune access information"});
                return;
            }

            if (data.some(item =>
                !Number.isInteger(item.userId) ||
                !item.accessRef?.trim()
            )) {
                res.status(400).json({error: "Invalid tune access information"});
                return;
            }

            const result = await this.tuneAccessService.insertAll(data);

            if (!result.success) {
                res.status(500).json({error: result.error});
                return;
            }

            res.status(200).json({
                message: "Tune access added successfully"
            });

        } catch (err) {
            this.logger.error(err);
            res.status(500).json({
                error: "An unexpected error occurred."
            });
        }
    }
}

export default AccessController;