import express, {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {verifyToken} from "../middleware/verifyToken";
import userService from "../service/users/PostgresUserService";
import log4js from "log4js";
import {logRequest} from "../middleware/requestLogger";
import {LOG_LEVEL} from "../config/config";

class AuthController {

    router = express.Router();
    logger = log4js.getLogger("AuthController");

    constructor() {
        this.logger.level = LOG_LEVEL;
        this.initializeRoutes();
    }

    protected initializeRoutes() {
        this.router.post("/login", logRequest, this.login);
        this.router.post("/logout", logRequest, this.logout);
        this.router.get("/verify", logRequest, verifyToken, this.verifySession);
    }

    private login = async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body;

            const result = await userService.findByEmail(email);
            if (result.data) {
                const user = result.data;
                
                const isValid = await bcrypt.compare(password, user.password);
                if (isValid) {
                    this.logger.info(`Password is valid`);

                    const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        createdAt: user.createdAt
                    }, process.env.JWT_SECRET_KEY!, {expiresIn: "30d"});
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: false, // todo: set true in production, when https is enabled
                    });
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            role: user.role,
                            createdAt: user.createdAt
                        }
                    });
                } else {
                    this.logger.info(`Invalid credentials`);
                    res.status(401).json({error: "Invalid credentials"});
                }
            } else {
                this.logger.info(`User not found`);
                res.status(404).json({error: "User not found"});
            }
        } catch (err) {
            this.logger.error(err);
            res.status(500).json({error: "An unexpected error occurred."});
        }
    };

    private logout = (req: Request, res: Response) => {
        res.clearCookie("token");
        res.status(200).json({message: "Logged out successfully"});
    };

    private verifySession = (req: Request, res: Response) => {
        // @ts-ignore todo use custom type
        const user = req.user;

        // @ts-ignore
        res.json({message: "Session is valid", user: user});
    };
}

export default new AuthController().router;