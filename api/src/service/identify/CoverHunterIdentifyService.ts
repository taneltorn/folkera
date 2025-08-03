import {spawn} from "child_process";
import path from "path";
import log4js from "log4js";
import IdentifyService from "./IdentifyService";

class CoverHunterIdentifyService implements IdentifyService {
    private logger = log4js.getLogger("CoverHunterIdentifyService");
    private recordingsDir = process.env.VITE_RECORDINGS_DIR || "";

    constructor() {
        this.logger.level = process.env.LOG_LEVEL || "info";
    }

    public async identify(file: string, n: number = 10, selfRef: string = ""): Promise<any> {
        const filePath = path.resolve(this.recordingsDir, file);

        const pythonPath = process.env.PYTHON_PATH || "python3";
        const rootDir = process.env.COVERHUNTER_ROOT_DIR || "";
        const recordingsDir = process.env.VITE_RECORDINGS_DIR || "";
        const scriptPath = path.resolve(rootDir, "run.py");

        const top = (selfRef ? (+n + 1) : n).toString();
        
        this.logger.info(`Running identify on file: ${filePath} (top: ${top}, selfRef: ${selfRef})`);
        this.logger.info(`Using Python: ${pythonPath}`);
        this.logger.info(`Using root directory: ${rootDir}`);
        this.logger.info(`Using recordings directory: ${recordingsDir}`);

        const args: string[] = [scriptPath, filePath, "-top", top, "--root", rootDir, "--recordings", recordingsDir];
        return this.runPython(pythonPath, selfRef, args);
    }

    private runPython(pythonPath: string, selfRef: string, args: string[]): Promise<any> {
        return new Promise((resolve) => {
            this.logger.info(`Executing command: ${[pythonPath, ...args].join(" ")}`);

            const proc = spawn(pythonPath, args);
            let stdout = "";
            let stderr = "";

            proc.stdout.on("data", (data) => {
                const text = data.toString();
                stdout += text;
                this.logger.debug(`[stdout] ${text.trim()}`);
            });

            proc.stderr.on("data", (data) => {
                const text = data.toString();
                stderr += text;
                this.logger.debug(`[stderr] ${text.trim()}`);
            });

            proc.on("error", (err) => {
                this.logger.error("Failed to start Python process:", err);
                return resolve(this.buildError("Failed to start Python process", err.message, stderr + stdout));
            });

            proc.on("close", (code) => {
                const logs = (stderr + stdout).trim();

                if (code !== 0) {
                    this.logger.error(`Identification failed! Python process exited with code ${code}:\n${stderr.trim()}`);
                    return resolve(this.buildError("Python script failed", stderr.trim(), logs));
                }

                try {
                    let parsed: [string, number][] = JSON.parse(stdout);
                    const filtered = parsed.filter(([id]) => id !== selfRef);
                    const result: Record<string, number> = Object.fromEntries(filtered);

                    this.logger.info(`Identification results:\n${JSON.stringify(result, null, 2)}`);

                    return resolve({
                        success: true,
                        data: result,
                        logs,
                    });
                } catch (err: any) {
                    this.logger.error("Failed to parse Python output:", err);
                    return resolve(this.buildError("Invalid JSON output", err.message, logs));
                }
            });
        });
    }

    private buildError(error: string, detail: string, logs: string) {
        return {
            success: false,
            error: `${error} - ${detail}`,
            logs,
        };
    }
}

export default CoverHunterIdentifyService;
