import log4js from "log4js";
import DataTransformer from "../../transformers/DataTransformer";
import {GroupByToFieldMap} from "../../utils/stats.helpers";
import {Stats} from "../../model/Stats";
import {Result} from "../../model/Result";
import StatsService from "./StatsService";
import {Recording} from "../../model/Recording";

class CsvStatsService implements StatsService {

    private logger = log4js.getLogger("StatsService");

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    public async getStats(data: Recording[], groupBy: string, dataTransformers: DataTransformer[], groups?: string[]): Promise<Result<Stats>> {
        this.logger.info(`Counting statistics for field '${groupBy}'`);

        try {
            const stats = new Map<string, number>();
            if (groups) {
                groups.forEach(item => stats.set(item, 0));
            }

            for (const recording of data) {
                if (!recording) continue;

                // @ts-ignore
                const field = recording[GroupByToFieldMap.get(groupBy) || groupBy] as string;

                if (!field) continue;

                let values = [field];
                if (dataTransformers.length) {
                    dataTransformers.forEach(dt => {
                        const result: string[] = [];
                        values.forEach(v => {
                            const transformed = dt.transform(v);
                            result.push(...(Array.isArray(transformed) ? transformed : [transformed]));
                        });
                        values = [...result];
                    });
                }

                values.forEach(value => {
                    stats.set(value, (stats.get(value) ?? 0) + 1);
                });
            }

            return {success: true, data: Object.fromEntries(stats)};
        } catch (err) {
            this.logger.error(err);
            return {
                success: false,
                data: null,
                error: {message: "Error querying stats", detail: err.message}
            };
        }
    }
}

export default CsvStatsService;
