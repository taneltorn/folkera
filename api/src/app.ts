import express from 'express';
import cors from "cors";
import {config} from 'dotenv';
import * as path from 'path';
import TuneController from "./controller/TuneController";
import log4js from "log4js";
import * as process from "process";
import StatsController from "./controller/StatsController";
import cookieParser from "cookie-parser";
import AuthController from "./controller/AuthController";
import OptionsController from "./controller/OptionsController";
import UserController from "./controller/UserController";
import IdentifyController from "./controller/IdentifyController";
import NotificationController from "./controller/NotificationController";

const app = express();
const port = 3000;

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

app.use("/notations", express.static(path.resolve(process.cwd(),  process.env.VITE_NOTATIONS_DIR)));
app.use("/musicxml", express.static(path.resolve(process.cwd(),  process.env.VITE_MUSICXML_DIR)));

app.use('/auth', AuthController);

app.use('/tunes', new TuneController().router);
app.use('/stats', new StatsController().router);
app.use('/options', new OptionsController().router);
app.use('/users', new UserController().router);
app.use('/identify', new IdentifyController().router);
app.use('/notifications', new NotificationController().router);

app.listen(port, () => {
    logger.info(`Application started`);
    logger.info(`Server running on port ${port}`);
});
