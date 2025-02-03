import log4js from "log4js";
import {User, UserRole} from "../../../domain/User";

// todo implement actual
const Users: User[] = [
    {
        id: 1,
        email: "tanel.torn@gmail.com",
        password: "$2b$10$s4cMmNLG95a5e79Jff4yi.50RYJ44Oo9JhpJrWsgadmKEw8AEZV5S",
        role: UserRole.ADMIN,
    }
];

class UserService {
    private logger = log4js.getLogger("UserService");

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    public async findAll()  {
        try {
            this.logger.info(`Fetching users`);

            return {success: true, data: Users};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: "Error querying users", detail: err.detail};
        }
    }

    public async findByEmail(email: string) {
        try {
            this.logger.info(`Fetching user with email = ${email}`);

            const user: User = Users.find(u => u.email === email);
            if (!user) {
                return {success: false, error: "Not found"} ;
            }
            return {success: true, data: user};

        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error querying user with email = ${email}`, detail: err.detail};
        }
    }
}

export default new UserService();
