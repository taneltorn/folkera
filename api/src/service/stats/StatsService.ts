import {Recording} from "../../../../domain/Recording";
import DataTransformer from "../../transformers/DataTransformer";
import {Result} from "../../model/Result";
import {Stats} from "../../../../domain/Stats";

interface StatsService {
    getStats: (data: Recording[], groupBy: string, dataTransformers: DataTransformer[], groups?: string[]) => Promise<Result<Stats>>
}

export default StatsService;
