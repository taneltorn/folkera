import express, {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {verifyToken} from "../middleware/verifyToken";
import userService from "../service/users/PostgresUserService";
import log4js from "log4js";
import {logRequest} from "../middleware/requestLogger";
import {LOG_LEVEL} from "../config/config";
import Mapper from "../utils/Mapper";

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
        this.router.get(
            "/verify",
            logRequest,
            verifyToken,
            this.verifySession
        );
    }

    private login = async (req: Request, res: Response) => {
        try {
            const {usernameOrEmail, password} = req.body;

            const result = await userService.findByUsernameOrEmail(
                usernameOrEmail
            );

            if (!result.data) {
                this.logger.info("User not found");

                res.status(401).json({
                    error: "Invalid credentials"
                });
                return;
            }

            const user = result.data;

            const isValid = await bcrypt.compare(
                password,
                user.password
            );

            if (!isValid) {
                this.logger.info("Invalid credentials");

                res.status(401).json({
                    error: "Invalid credentials"
                });
                return;
            }

            this.logger.info("Password is valid");

            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    role: user.role
                },
                process.env.JWT_SECRET_KEY!,
                {
                    expiresIn: "30d"
                }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // todo: true in production with HTTPS
            });

            res.json({
                token,
                user: Mapper.toUserDTO(user)
            });

        } catch (err) {
            this.logger.error(err);

            res.status(500).json({
                error: "An unexpected error occurred."
            });
        }
    };

    private logout = (req: Request, res: Response) => {
        res.clearCookie("token");

        res.status(200).json({
            message: "Logged out successfully"
        });
    };

    private verifySession = async (req: Request, res: Response) => {
        try {
            // @ts-ignore todo use custom Request type
            const tokenUser = req.user;

            const result = await userService.findByUsernameOrEmail(
                tokenUser.username
            );

            if (!result.data) {
                res.status(401).json({
                    error: "User not found"
                });
                return;
            }

            res.json({
                message: "Session is valid",
                user: Mapper.toUserDTO(result.data)
            });

        } catch (err) {
            this.logger.error(err);

            res.status(500).json({
                error: "An unexpected error occurred."
            });
        }
    };
}

export default new AuthController().router;