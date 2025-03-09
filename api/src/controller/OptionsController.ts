import express, {Request, Response} from "express";
import log4js from "log4js";
import CsvRecordingService from "../service/recordings/CsvRecordingService";
import {logRequest} from "../middleware/requestLogger";
import {useQueryParams} from "../middleware/useQueryParams";
import {Parishes, Years} from "../utils/common.lists";
import {extractAndSort, withBlankOptions} from "../utils/filtering.helpers";
import {FilteringOptions} from "../model/FilteringOptions";

class OptionsController {

    router = express.Router();
    logger = log4js.getLogger("OptionsController");

    recordingService = new CsvRecordingService();

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", logRequest, useQueryParams, this.getOptions.bind(this));
    }

    async getOptions(req: Request, res: Response): Promise<any> {
        try {
            // @ts-ignore
            const data = await this.recordingService
                .find()
                .then(result => result.data);

            const options: FilteringOptions = {
                tune: withBlankOptions(extractAndSort(data, "tune")),
                instrument: withBlankOptions(extractAndSort(data, "instrument", ",")),
                dance: withBlankOptions(extractAndSort(data, "dance", ",")),
                datatype: withBlankOptions(extractAndSort(data, "datatype", ",")),
                performer: withBlankOptions(extractAndSort(data, "performer", ",")),
                collector: withBlankOptions(extractAndSort(data, "collector", ",")),
                comments: withBlankOptions([]),
                file: withBlankOptions([]),
                duration: withBlankOptions([]),
                quality: withBlankOptions(extractAndSort(data, "quality", ",")),
                kivike: withBlankOptions(extractAndSort(data, "kivike", ",")),
                parish: withBlankOptions([{group: "\n", items: Parishes}]),
                origin: withBlankOptions([{group: "\n", items: Parishes}]),
                archive: extractAndSort(data, "archive"),
                year: Years,
            }
            res.status(200).json(options);
        } catch (err) {
            this.logger.error(err);
            res.status(500).json({error: "An unexpected error occurred."});
        }
    }
}

export default OptionsController;