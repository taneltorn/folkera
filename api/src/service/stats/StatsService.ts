import DataTransformer from "../../transformers/DataTransformer";
import {Result} from "../../model/Result";
import {Stats} from "../../model/Stats";
import {Tune} from "../../model/Tune";

interface StatsService {
    getStats: (data: Tune[], groupBy: string, dataTransformers: DataTransformer[], groups?: string[]) => Promise<Result<Stats>>
}

export default StatsService;
