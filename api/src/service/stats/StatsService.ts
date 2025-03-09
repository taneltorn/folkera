import DataTransformer from "../../transformers/DataTransformer";
import {Result} from "../../model/Result";
import {Stats} from "../../model/Stats";
import {Recording} from "../../model/Recording";

interface StatsService {
    getStats: (data: Recording[], groupBy: string, dataTransformers: DataTransformer[], groups?: string[]) => Promise<Result<Stats>>
}

export default StatsService;
