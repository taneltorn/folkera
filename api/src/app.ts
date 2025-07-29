import express from 'express';
import cors from "cors";

import {config} from 'dotenv';
import * as path from 'path';

import RecordingController from "./controller/RecordingController";
import log4js from "log4js";
import * as process from "process";
import StatsController from "./controller/StatsController";
import cookieParser from "cookie-parser";
import AuthController from "./controller/AuthController";
import OptionsController from "./controller/OptionsController";
import UserController from "./controller/UserController";
import IdentifyController from "./controller/IdentifyController";

const app = express();
const port = 5000;

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

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));
app.use(cookieParser());

app.use('/auth', AuthController);

app.use('/recordings', new RecordingController().router);
app.use('/stats', new StatsController().router);
app.use('/options', new OptionsController().router);
app.use('/users', new UserController().router);
app.use('/identify', new IdentifyController().router);

app.listen(port, () => {
    logger.info(`Application started`);
    logger.info(`Server running on port ${port}`);
});
