import log4js from "log4js";
import * as fs from 'fs';
import * as path from 'path';
import Papa from "papaparse";
import RecordingService from "./RecordingService";
import {Filter} from "../../model/Filter";
import {filter, sortByField} from "../../utils/filtering.helpers";
import {ResultList} from "../../model/ResultList";
import {Pagination, SortDirection} from "../../model/Pagination";
import {Recording} from "../../model/Recording";

class CsvRecordingService implements RecordingService {

    private logger = log4js.getLogger("RecordingService");
    private csvFile = path.resolve(process.env.CSV_DATA_DIR, `recordings.csv`);

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    public async findById(id: string): Promise<{ success: boolean, data?: Recording, error?: any }> {
        try {
            const data = this.readFromCsvFile();
            const found = data.find(recording => recording.id === id);

            if (!found) {
                this.logger.warn(`Recording with id '${id}' not found`);
                return {
                    success: false,
                    error: {message: "Recording not found", detail: `No recording with id '${id}'`}
                };
            }

            return {
                success: true,
                data: found
            };
        } catch (err) {
            this.logger.error(`Error finding recording with ID ${id}`, err);
            return {
                success: false,
                error: {message: "Error finding recording", detail: err.message}
            };
        }
    }

    public async findByIds(ids: string[]): Promise<{ success: boolean, data: Recording[], error?: any }> {
        try {
            const data = this.readFromCsvFile();

            const matched = data.filter(recording => ids.includes(recording.id));

            this.logger.info(`Found ${matched.length} recordings for ${ids.length} requested IDs`);

            return {
                success: true,
                data: matched
            };
        } catch (err) {
            this.logger.error(`Error finding recordings by IDs`, err);
            return {
                success: false,
                data: [],
                error: {message: "Error finding recordings by IDs", detail: err.message}
            };
        }
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
