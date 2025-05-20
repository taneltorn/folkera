import {spawn} from "child_process";
import path from "path";
import log4js from "log4js";
import IdentifyService from "./IdentifyService";

class CoverHunterIdentifyService implements IdentifyService {

    private logger = log4js.getLogger("CoverHunterIdentifyService");
    private recordingsDir = process.env.VITE_RECORDINGS_DIR;

    constructor() {
        this.logger.level = process.env.LOG_LEVEL || "info";
    }

    public async identify(file: string, n: number = 10, skipFirstResult: string = "false"): Promise<any> {
        this.logger.info(`Identifying file ${file} (top: ${n}, skipFirstResult: ${skipFirstResult})`);

        const pythonPath = path.resolve("/home/torntan1/DevZone/CoverHunterMPS/.venv/bin/python");
        const scriptPath = path.resolve("/home/torntan1/DevZone/folkera/scripts/identify.py");
        const filePath = path.resolve(this.recordingsDir, file);
        
        const top = (skipFirstResult === "true" ? (+n + 1) : n).toString();

        return new Promise((resolve, reject) => {

            this.logger.info(skipFirstResult === "true" ? "TRUE" : "FALSE");
            const process = spawn(pythonPath, [scriptPath, filePath, "-top", top]);

            let stdout = "";
            let stderr = "";

            process.stdout.on("data", (data) => {
                const text = data.toString();
                stdout += text;
                this.logger.debug(`[python stdout] ${text.trim()}`);
            });

            process.stderr.on("data", (data) => {
                const text = data.toString();
                stderr += text;
                this.logger.debug(`[python stderr] ${text.trim()}`);
            });

            process.on("close", (code) => {
                const allLogs = (stderr + stdout).trim();

                if (code !== 0) {
                    this.logger.error(`Python exited with code ${code}`);
                    return resolve({
                        success: false,
                        error: "Python script failed",
                        detail: stderr.trim(),
                        logs: allLogs
                    });
                }

                try {
                    let parsed = JSON.parse(stdout);

                    if (skipFirstResult === "true" && Array.isArray(parsed) && parsed.length > 1) {
                        parsed = parsed.slice(1);
                    }

                    return resolve({
                        success: true,
                        data: parsed,
                        logs: allLogs
                    });
                } catch (e: any) {
                    this.logger.error("Failed to parse Python output", e);
                    return resolve({
                        success: false,
                        error: "Invalid JSON output",
                        detail: e.message,
                        logs: allLogs
                    });
                }
            });
        });
    }

}

export default CoverHunterIdentifyService;
