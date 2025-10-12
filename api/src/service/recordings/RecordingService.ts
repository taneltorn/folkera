import {Filter} from "../../model/Filter";
import {Recording} from "../../model/Recording";
import {Pagination} from "../../model/Pagination";
import {Result} from "../../model/Result";

interface RecordingService {
    findById: (id: string) => Promise<Result<Recording>>
    findByIds: (id: string[]) => Promise<Result<Recording[]>>
    find: (filters?: Filter[], pagination?: Pagination) => Promise<Result<Recording[]>>
    save: (data: Recording[]) => Promise<Result<Recording[]>>
}

export default RecordingService;
