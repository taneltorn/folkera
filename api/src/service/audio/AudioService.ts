import fs from "fs";
import path from "path";
import {Request, Response} from "express";
import log4js from "log4js";

class AudioService {

    logger = log4js.getLogger("AudioService");

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    serve(filename: string, req: Request, res: Response): void {
        const baseDir = path.resolve(
            process.env.VITE_RECORDINGS_DIR || "mp3"
        );

        const filePath = path.resolve(baseDir, filename);

        this.logger.info(`Serving audio: ${filePath}`);

        const exists = fs.existsSync(filePath);
        if (!exists) {
            this.logger.warn(`Audio file not found: ${filePath}`);
            res.status(404).json({error: "File not found"});
            return;
        }

        const stat = fs.statSync(filePath);
        const total = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : total - 1;

            if (start >= total || end >= total) {
                res
                    .status(416)
                    .header("Content-Range", `bytes */${total}`)
                    .end();

                return;
            }

            const chunkSize = end - start + 1;
            const fileStream = fs.createReadStream(filePath, {start, end});

            res.writeHead(206, {
                "Content-Range": `bytes ${start}-${end}/${total}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": "audio/mpeg"
            });

            fileStream.pipe(res);
            return;
        }

        res.writeHead(200, {
            "Content-Length": total,
            "Content-Type": "audio/mpeg"
        });

        fs.createReadStream(filePath).pipe(res);

    }
}

export default AudioService;