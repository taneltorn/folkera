import log4js from "log4js";
import * as fs from 'fs';
import * as path from 'path';
import Papa from "papaparse";
import {Recording} from "../../../../domain/Recording";
import {Pagination, SortDirection} from "../../../../domain/Pagination";
import RecordingService from "./RecordingService";
import {Filter} from "../../../../domain/Filter";
import {filter, sortByField} from "../../utils/filtering.helpers";
import {ResultList} from "../../model/ResultList";

class CsvRecordingService implements RecordingService {

    private logger = log4js.getLogger("RecordingService");
    private csvFile = path.resolve(__dirname, `../../resources/Heliarhiiv - Pillilood.csv`);

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    public async find(filters?: Filter[], pagination?: Pagination): Promise<ResultList<Recording>> {
        try {
            const data = this.readFromCsvFile();
            
            let filtered = filter(data, filters);
            let paginated = undefined;

            if (pagination?.sortField) {
                filtered = sortByField(
                    filtered,
                    pagination.sortField as keyof Recording,
                    pagination.sortDirection as SortDirection || SortDirection.ASC);
            }

            if (pagination?.size) {
                const page: number = pagination?.page || 1;
                const start: number = (page - 1) * pagination.size;
                const end: number = Number(start) + Number(pagination.size);
                paginated = filtered.slice(start, end);
            }

            this.logger.info(`Returning ${(paginated || filtered).length} entries from total of ${filtered.length}`);

            return {
                success: true,
                data: paginated || filtered,
                page: pagination
                    ? {
                        number: pagination.page,
                        size: pagination.size,
                        totalItems: filtered.length,
                        totalPages: Math.ceil(filtered.length / pagination.size)
                    }
                    : undefined
            };
        } catch (err) {
            this.logger.error(err);
            return {
                success: false,
                data: [],
                error: {message: "Error querying recordings", detail: err.message}
            }
        }
    }

    public async save(data: Recording[]): Promise<any> {
        this.logger.info(`Updating ${data.length} recordings`);

        try {
            const csvFileContent = fs.readFileSync(this.csvFile, 'utf-8');

            const recordings = Papa.parse(csvFileContent, {
                header: true,
                dynamicTyping: true
            }).data as Recording[];

            data.forEach(recording => {
                const index = recordings.findIndex(r => r.ref === recording.ref);
                if (index !== -1) {
                    recordings[index] = recording;
                }
            });

            const updatedCsvData = Papa.unparse(recordings);

            fs.writeFileSync(this.csvFile, updatedCsvData, 'utf-8');

            return {success: true, data: data};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error updating the recording`, detail: err.message};
        }
    }

    private readFromCsvFile = (): Recording[] => {
        this.logger.info(`Reading data from file '${this.csvFile}'`);

        const csvData = fs.readFileSync(this.csvFile, 'utf-8');

        const parsedData = Papa.parse<Recording>(csvData, {
            header: true,
            skipEmptyLines: true,
        });

        return parsedData.data;
    }
}

export default CsvRecordingService;
