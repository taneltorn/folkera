import log4js from "log4js";
import * as fs from 'fs';
import * as path from 'path';
import Papa from "papaparse";
import TuneService from "./TuneService";
import {Filter} from "../../model/Filter";
import {filter, sortByField} from "../../utils/filtering.helpers";
import {Pagination, SortDirection} from "../../model/Pagination";
import {Tune} from "../../model/Tune";
import {Result} from "../../model/Result";

class CsvTuneService implements TuneService {

    private logger = log4js.getLogger("TuneService");
    private csvFile = path.resolve(process.env.CSV_DATA_DIR, `tunes.csv`);

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    public async findById(id: string): Promise<Result<Tune>> {
        try {
            const data = this.readFromCsvFile();
            const found = data.find(tune => tune.id === id);

            if (!found) {
                this.logger.warn(`Tune with id '${id}' not found`);
                return {
                    success: false,
                    error: "Tune not found",
                    detail: `No tune with id '${id}'`
                };
            }

            return {
                success: true,
                data: found
            };
        } catch (err) {
            this.logger.error(`Error finding tune with ID ${id}`, err);
            return {
                success: false,
                error: "Error finding tune",
                detail: err.message
            };
        }
    }

    public async findByIds(ids: string[]): Promise<Result<Tune[]>> {
        try {
            const data = this.readFromCsvFile();
            const matched = data.filter(tune => ids.includes(tune.id));

            this.logger.info(`Found ${matched.length} tunes for ${ids.length} requested IDs`);

            return {
                success: true,
                data: matched
            };
        } catch (err) {
            this.logger.error(`Error finding tunes by IDs`, err);
            return {
                success: false,
                data: [],
                error: "Error finding tunes by IDs",
                detail: err.message
            };
        }
    }


    public async find(filters?: Filter[], pagination?: Pagination): Promise<Result<Tune[]>> {
        try {
            const data = this.readFromCsvFile();

            let filtered = filter(data, filters);
            let paginated = undefined;

            if (pagination?.sortField) {
                filtered = sortByField(
                    filtered,
                    pagination.sortField as keyof Tune,
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
                error: "Error querying tunes",
                detail: err.message
            }
        }
    }

    public async save(data: Tune[]): Promise<Result<Tune[]>> {
        this.logger.info(`Updating ${data.length} tunes`);

        try {
            const csvFileContent = fs.readFileSync(this.csvFile, 'utf-8');

            const tunes = Papa.parse(csvFileContent, {
                header: true,
                dynamicTyping: true
            }).data as Tune[];

            data.forEach(tune => {
                const index = tunes.findIndex(r => r.ref === tune.ref);
                if (index !== -1) {
                    tunes[index] = tune;
                }
            });

            const updatedCsvData = Papa.unparse(tunes);

            fs.writeFileSync(this.csvFile, updatedCsvData, 'utf-8');

            return {success: true, data: data};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error updating the tune`, detail: err.message};
        }
    }

    private readFromCsvFile = (): Tune[] => {
        this.logger.info(`Reading data from file '${this.csvFile}'`);

        const csvData = fs.readFileSync(this.csvFile, 'utf-8');

        const parsedData = Papa.parse<Tune>(csvData, {
            header: true,
            skipEmptyLines: true,
        });

        return parsedData.data;
    }
}

export default CsvTuneService;
