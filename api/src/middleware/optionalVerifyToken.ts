import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import log4js from "log4js";

const logger = log4js.getLogger("AuthController");

export const optionalVerifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.token || "";

    if (!token) {
        logger.info("No token present, continuing anonymously");
        return next();
    }

    try {
        // @ts-ignore
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY!);

        // @ts-ignore
        logger.info(`User authenticated as ${req.user?.email}`);

        return next();
    } catch (err) {
        return res.status(401).json({
            error: "Invalid or expired token"
        });
    }
};