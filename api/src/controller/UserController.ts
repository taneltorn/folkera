import express, {Request, Response} from "express";
import bcrypt from "bcrypt";
import log4js from "log4js";
import {verifyToken} from "../middleware/verifyToken";
import {logRequest} from "../middleware/requestLogger";
import {UserDTO} from "../model/UserDTO";
import userService from '../service/users/PostgresUserService';
import Mapper from "../utils/Mapper";
import {User} from "../model/User";

class UserController {

    router = express.Router();
    logger = log4js.getLogger("UserController");

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/:email", verifyToken, logRequest, this.getUser.bind(this));
        this.router.get("/", verifyToken, logRequest, this.getUsers.bind(this));
        this.router.post("/", verifyToken, logRequest, this.createUser.bind(this));
        this.router.patch("/:id", verifyToken, logRequest, this.updateUser.bind(this));
        this.router.patch("/:id/password", verifyToken, logRequest, this.updateUserPassword.bind(this));
        this.router.delete("/:id", verifyToken, logRequest, this.deleteUser.bind(this));
    }

    async getUser(req: Request, res: Response): Promise<UserDTO> {
        try {
            // @ts-ignore todo use custom type
            const user = req.user;
            const email = req.params.email;
            
            if (user?.role !== 'ADMIN') {
                this.logger.info(`Not authorized: ${user.email}`);
                res.status(403).json({error: "Not authorized"});
                return;
            }

            const result = await userService.findByEmail(email);
            if (!result.success) {
                res.status(500).json({error: result.error});
                return;
            }

            res.status(200).json(Mapper.toUserDTO(result.data));
        } catch (err) {
            this.logger.error(err)
            res.status(500).json({error: "An unexpected error occurred."});
        }
    }

    async getUsers(req: Request, res: Response): Promise<UserDTO> {
        try {
            // @ts-ignore todo use custom type
            const user = req.user;

            if (user?.role !== 'ADMIN') {
                this.logger.info(`Not authorized: ${user.email}`);
                res.status(403).json({error: "Not authorized"});
                return;
            }

            const result = await userService.findAll();
            if (!result.success) {
                res.status(500).json({error: result.error});
                return;
            }

            const users = result.data.map((u: User) => Mapper.toUserDTO(u));
            res.status(200).json(users);
        } catch (err) {
            this.logger.error(err)
            res.status(500).json({error: "An unexpected error occurred."});
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            // @ts-ignore todo use custom type
            const user = req.user;
            const data = req.body;

            if (user?.role !== 'ADMIN') {
                this.logger.info(`Not authorized: ${user.email}`);
                res.status(403).json({error: "Not authorized"});
                return;
            }

            if (!data) {
                this.logger.info(`Request body is null`);
                res.status(400).json({error: "Missing user information"});
                return;
            }

            data.password = await this.hashPassword(data.password);

            const result = await userService.insert(data, user);
            if (!result.success) {
                if (result.error === "Duplicate email") {
                    res.status(409).json({error: "Email already exists"});
                    return;
                }
                res.status(500).json({error: result.error});
                return;
            }
            res.status(200).json(result.data);
        } catch (err) {
            this.logger.error(err);
            res.status(500).json({error: "An unexpected error occurred."});
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            // @ts-ignore todo use custom type
            const user = req.user;
            const id = parseInt(req.params.id);
            const data = req.body;

            if (user?.role !== 'ADMIN') {
                this.logger.info(`Not authorized: ${user.email}`);
                res.status(403).json({error: "Not authorized"});
                return;
            }

            if (!data) {
                this.logger.info(`Request body is null`);
                res.status(400).json({error: "Missing user information"});
                return;
            }

            const result = await userService.update(id, data, user);
            if (!result.success) {
                res.status(500).json({error: result.error});
                return;
            }
            res.status(200).json(result.data);
        } catch (err) {
            this.logger.error(err);
            res.status(500).json({error: "An unexpected error occurred."});
        }
    }

    async updateUserPassword(req: Request, res: Response): Promise<void> {
        try {
            // @ts-ignore todo use custom type
            const user = req.user;
            const id = parseInt(req.params.id);
            const data = req.body;

            if (user?.id !== id) {
                this.logger.info(`Not authorized: ${user.email}`);
                res.status(403).json({error: "Not authorized"});
                return;
            }

            if (!data) {
                this.logger.info(`Request body is null`);
                res.status(400).json({error: "Missing password information"});
                return;
            }

            const password = await this.hashPassword(data.password);
            if (!password) {
                this.logger.info(`Password is null`);
                res.status(400).json({error: "Missing password information"});
                return;
            }

            const result = await userService.updateUserPassword(id, password, user);
            if (!result.success) {
                res.status(500).json({error: result.error});
                return;
            }
            res.status(200).json(result.data);
        } catch (err) {
            this.logger.error(err);
            res.status(500).json({error: "An unexpected error occurred."});
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            // @ts-ignore todo use custom type
            const user = req.user;
            const userId = parseInt(req.params.id);

            if (user?.role !== 'ADMIN') {
                this.logger.info(`Not authorized: ${user.email}`);
                res.status(403).json({error: "Not authorized"});
                return;
            }

            if (isNaN(userId)) {
                this.logger.info(`Invalid ID: ${userId}`);
                res.status(400).json({error: "Invalid ID"});
                return;
            }

            const result = await userService.delete(userId);
            if (!result.success) {
                res.status(500).json({error: result.error});
                return;
            }
            res.status(200).json({message: "User deleted successfully", deletedUser: result});
        } catch (err) {
            this.logger.error(err);
            res.status(500).json({error: "An unexpected error occurred."});
        }
    }

    async hashPassword(password: string) {
        return await bcrypt
            .genSalt(10)
            .then(salt => {
                return bcrypt.hash(password, salt);
            })
            .catch(err => this.logger.error(err.message));
    }
}

export default UserController;