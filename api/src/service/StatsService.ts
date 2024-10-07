import log4js from "log4js";
import {Recording} from "../model/Recording";
import DataTransformer from "../transformers/DataTransformer";

class StatsService {

    private logger = log4js.getLogger("StatsService");

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    public async getStats(data: Recording[], key: string, transformer: DataTransformer, initial?: Map<string, number>): Promise<any> {
        this.logger.info(`Counting statistics for field '${key}'`);

        try {
            const stats = initial || new Map<string, number>();

            for (const recording of data) {
                if (!recording) continue;

                // @ts-ignore
                const field = recording[key];

                if (!field) continue;

                transformer.transform(field).forEach(value => {
                    stats.set(value, (stats.get(value) ?? 0) + 1);
                });
            }

            return {success: true, data: Object.fromEntries(stats)};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: "Error querying stats", detail: err.detail};
        }
    }
}

export default StatsService;
