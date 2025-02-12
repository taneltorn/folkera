import log4js from "log4js";
import {User, UserRole} from "../../../../domain/User";
import {Result} from "../../model/Result";
import UsersService from "./UsersService";

// todo implement actual
const Users: User[] = [
    {
        id: 1,
        email: "tanel.torn@gmail.com",
        password: "$2b$10$s4cMmNLG95a5e79Jff4yi.50RYJ44Oo9JhpJrWsgadmKEw8AEZV5S",
        role: UserRole.ADMIN,
    }
];

class DummyUserService implements UsersService {
    private logger = log4js.getLogger("UserService");

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    public async findByEmail(email: string): Promise<Result<User>> {
        try {
            this.logger.info(`Fetching user with email = ${email}`);

            const user: User = Users.find(u => u.email === email);
            if (!user) {
                return {success: false, data: null, error: {message: "Not found"}};
            }
            return {success: true, data: user};

        } catch (err) {
            this.logger.error(err);
            return {success: false, data: null, error: {message: `Something went wrong`, detail: err.detail}};
        }
    }
}

export default new DummyUserService();
