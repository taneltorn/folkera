import {Recording} from "../../../../domain/Recording";
import {Pagination} from "../../../../domain/Pagination";
import {Filter} from "../../../../domain/Filter";
import {ResultList} from "../../model/ResultList";

interface RecordingService {
    find: (filters: Filter[], pagination: Pagination) => Promise<ResultList<Recording>>
    save: (data: Recording[]) => Promise<any>
}

export default RecordingService;
