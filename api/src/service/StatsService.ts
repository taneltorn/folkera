import log4js from "log4js";
import {Recording} from "../model/Recording";
import DataTransformer from "../transformers/DataTransformer";

class StatsService {

    private logger = log4js.getLogger("StatsService");

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    public async getStats(data: Recording[], groupBy: string, dataTransformers: DataTransformer[], groups?: string[]): Promise<any> {
        this.logger.info(`Counting statistics for field '${groupBy}'`);

        try {
            const stats = new Map<string, number>();
            if (groups) {
                groups.forEach(item => stats.set(item, 0));
            }

            for (const recording of data) {
                if (!recording) continue;

                // @ts-ignore
                const field = recording[groupBy] as string;

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
            return {success: false, error: "Error querying stats", detail: err.detail};
        }
    }

    // public async getStats(data: Recording[], key: string, transformer: DataTransformer, initial?: Map<string, number>): Promise<any> {
    //     this.logger.info(`Counting statistics for field '${key}'`);
    //
    //     try {
    //         const stats = initial || new Map<string, number>();
    //
    //         for (const recording of data) {
    //             if (!recording) continue;
    //
    //             // @ts-ignore
    //             const field = recording[key];
    //
    //             if (!field) continue;
    //
    //             transformer.transform(field).forEach(value => {
    //                 stats.set(value, (stats.get(value) ?? 0) + 1);
    //             });
    //         }
    //
    //         return {success: true, data: Object.fromEntries(stats)};
    //     } catch (err) {
    //         this.logger.error(err);
    //         return {success: false, error: "Error querying stats", detail: err.detail};
    //     }
    // }
}

export default StatsService;
