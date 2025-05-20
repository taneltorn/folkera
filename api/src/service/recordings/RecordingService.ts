import {Filter} from "../../model/Filter";
import {ResultList} from "../../model/ResultList";
import {Recording} from "../../model/Recording";
import {Pagination} from "../../model/Pagination";

interface RecordingService {
    findById: (id: string) => Promise<any>
    findByIds: (id: string[]) => Promise<any>
    find: (filters: Filter[], pagination: Pagination) => Promise<ResultList<Recording>>
    save: (data: Recording[]) => Promise<any>
}

export default RecordingService;
