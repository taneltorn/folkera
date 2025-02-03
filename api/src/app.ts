import express, {Request, Response} from 'express';
import cors from "cors";

import {config} from 'dotenv';
import * as path from 'path';

import RecordingController from "./controller/RecordingController";
import log4js from "log4js";
import * as process from "process";
import StatsController from "./controller/StatsController";
import cookieParser from "cookie-parser";
import AuthController from "./controller/AuthController";

const app = express();
const port = 4000;

config({path: path.resolve(__dirname, '../../.env')});

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

logger.info(`Starting API service`)
logger.info(`Log level: ${process.env.LOG_LEVEL}`)
logger.info(`Allowed origin: ${process.env.ALLOWED_ORIGIN}`)

app.use(cors({
    credentials: true,
    origin: process.env.ALLOWED_ORIGIN,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

app.use('/auth', AuthController);


const recordingController = new RecordingController();
app.use('/api/recordings', recordingController.router);

const statsController = new StatsController();
app.use('/api/stats', statsController.router);

app.get('/api/status', async (req: Request, res: Response): Promise<void> => {
    logger.info("GET /api/status");
    try {
        logger.info("OK");
        res.json("OK");
    } catch (err) {
        logger.error(err);
        res.status(500).json({error: err});
    }
});

app.listen(port, () => {
    logger.info(`Application started`);
    logger.info(`Server running on port ${port}`);
});
