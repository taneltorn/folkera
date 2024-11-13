import log4js from "log4js";
import * as fs from 'fs';
import * as path from 'path';
import Papa from "papaparse";
import {Recording} from "../../../domain/Recording";

export const Parishes = [
    "Äksi khk.",
    "Ambla khk.",
    "Anna khk.",
    "Anseküla khk.",
    "Audru khk.",
    "Emmaste khk.",
    "Häädemeeste khk.",
    "Hageri khk.",
    "Haljala khk.",
    "Halliste khk.",
    "Hanila khk.",
    "Hargla khk.",
    "Harju-Jaani khk.",
    "Harju-Madise khk.",
    "Helme khk.",
    "Iisaku khk.",
    "Jaani khk.",
    "Jämaja khk.",
    "Järva-Jaani khk.",
    "Järva-Madise khk.",
    "Jõelähtme khk.",
    "Jõhvi khk.",
    "Jüri khk.",
    "Juuru khk.",
    "Kaarma khk.",
    "Kadrina khk.",
    "Käina khk.",
    "Kambja khk.",
    "Kanepi khk.",
    "Karja khk.",
    "Karksi khk.",
    "Kärla khk.",
    "Karula khk.",
    "Karuse khk.",
    "Keila khk.",
    "Kihelkonna khk.",
    "Kirbla khk.",
    "Kodavere khk.",
    "Koeru khk.",
    "Kolga-Jaani khk.",
    "Kõpu khk.",
    "Kose khk.",
    "Kullamaa khk.",
    "Kursi khk.",
    "Kuusalu khk.",
    "Lääne-Nigula khk.",
    "Laiuse khk.",
    "Lihula khk.",
    "Lüganuse khk.",
    "Maarja-Magdaleena khk.",
    "Märjamaa khk.",
    "Martna khk.",
    "Mihkli khk.",
    "Muhu khk.",
    "Mustjala khk.",
    "Nissi khk.",
    "Noarootsi khk.",
    "Nõo khk.",
    "Otepää khk.",
    "Paide khk.",
    "Paistu khk.",
    "Palamuse khk.",
    "Pärnu-Jaagupi khk.",
    "Peetri khk.",
    "Pilistvere khk.",
    "Pöide khk.",
    "Põltsamaa khk.",
    "Põlva khk.",
    "Püha khk.",
    "Pühalepa khk.",
    "Puhja khk.",
    "Rakvere khk.",
    "Rannu khk.",
    "Räpina khk.",
    "Rapla khk.",
    "Reigi khk.",
    "Ridala khk.",
    "Risti khk.",
    "Rõngu khk.",
    "Rõuge khk.",
    "Ruhnu khk.",
    "Saarde khk.",
    "Sangaste khk.",
    "Simuna khk.",
    "Suure-Jaani khk.",
    "Tallinna linn",
    "Tartu linn",
    "Tartu-Maarja khk.",
    "Tarvastu khk.",
    "Tori khk.",
    "Torma khk.",
    "Tõstamaa khk.",
    "Türi khk.",
    "Urvaste khk.",
    "Uulu khk.",
    "Väike-Maarja khk.",
    "Vaivara khk.",
    "Valjala khk.",
    "Vändra khk.",
    "Varbla khk.",
    "Vastseliina khk.",
    "Vigala khk.",
    "Viljandi khk.",
    "Viru-Jaagupi khk.",
    "Viru-Nigula khk.",
    "Võnnu khk.",
    "Vormsi khk.",
    "Otepää linn",
    "Kuressaare linn",
    "Viljandi linn",
    "Paide linn",
    "Võru linn",
    "Pärnu linn",
    "Narva linn",
];

class RecordingService {

    private logger = log4js.getLogger("RecordingService");
    private dataFile = "Heliarhiiv - export.csv";

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    public async findAll(): Promise<any> {
        return this.findFromFile(this.dataFile);
    }

    public async findFromFile(filePath: string): Promise<any> {
        this.logger.info(`Reading data from file ${filePath}`);

        try {
            const csvFilePath = path.resolve(__dirname, `../resources/${filePath}`);

            const csvData = fs.readFileSync(csvFilePath, 'utf-8');

            const result = Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
            });

            this.logger.info(`Found ${result.data.length} entries`);

            return {success: true, data: result.data as Recording[]};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: "Error reading data", detail: err.detail};
        }
    }

    public async getStats(): Promise<any> {
        this.logger.info(`Getting recording statistics`);

        try {
            const result = await this.findAll();

            const stats = new Map<string, number>();
            for (const parish of Parishes) {
                stats.set(parish, 0);
            }

            for (const {location} of result.data) {
                if (!location) continue;

                const loc = location as string;

                for (const parish of Parishes) {
                    const locations = loc.toLowerCase().split(/[,<]+/).map(l => l.trim());
                    if (locations.includes(parish.toLowerCase())) {
                        stats.set(parish, (stats.get(parish) ?? 0) + 1);
                    }
                }
            }
            return {success: true, data: Object.fromEntries(stats)};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: "Error querying recordings", detail: err.detail};
        }
    }

    public async save(data: Recording[]): Promise<any> {
        this.logger.info(`Updating ${data.length} recordings`);

        try {
            const csvFilePath = path.resolve(__dirname, `../resources/${this.dataFile}`);

            const csvFileContent = fs.readFileSync(csvFilePath, 'utf-8');

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

            fs.writeFileSync(csvFilePath, updatedCsvData, 'utf-8');

            return {success: true, data: data};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error updating the recording`, detail: err.message};
        }
    }
}

export default RecordingService;
