import {Filter} from "../../model/Filter";
import {Tune} from "../../model/Tune";
import {Pagination} from "../../model/Pagination";
import {Result} from "../../model/Result";

interface TuneService {
    findById: (id: string) => Promise<Result<Tune>>
    findByIds: (id: string[]) => Promise<Result<Tune[]>>
    find: (filters?: Filter[], pagination?: Pagination) => Promise<Result<Tune[]>>
    save: (data: Tune[]) => Promise<Result<Tune[]>>
}

export default TuneService;
