import pool from "../../config/dbConfig";
import log4js from "log4js";
import Mapper from "../../utils/Mapper";
import UserService from "./UserService";
import {User} from "../../model/User";
import {Result} from "../../model/Result";

class PostgresUserService implements UserService {
    
    private logger = log4js.getLogger("UserService");

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    public async findAll(): Promise<Result<User[]>> {
        try {
            this.logger.info(`Fetching users`);
            const query = `
                SELECT *
                FROM folkera.users
                WHERE deleted_at IS NULL
                ORDER BY id ASC
            `;
            const result = await pool.query(query);

            this.logger.info(`Found ${result.rows.length} ${result.rows.length === 1 ? "row" : "rows"}`);
            return {success: true, data: Mapper.mapFields(result.rows)};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: "Error querying users", detail: err.detail};
        }
    }

    public async findByUsernameOrEmail(usernameOrEmail: string): Promise<Result<User>> {
        try {
            this.logger.info(`Fetching user with username or email = ${usernameOrEmail}`);

            const query = "SELECT * FROM folkera.users WHERE deleted_at IS NULL AND (LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($1))";
            const result = await pool.query(query, [usernameOrEmail]);

            this.logger.info(`Found ${result.rows.length} ${result.rows.length === 1 ? "row" : "rows"}`);
            if (result.rows.length === 0) {
                return {success: false, error: "Not found"};
            }
            return {success: true, data: Mapper.mapFields(result.rows[0])};

        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error querying user with username or email = ${usernameOrEmail}`, detail: err.detail};
        }
    }

    public async insert(data: User, user: User): Promise<Result<any>> {
        try {
            this.logger.info(`Inserting new user`);
            const query = `
                INSERT INTO folkera.users(email, username, password, name, role, created_by, deleted_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
            `;
            const result = await pool.query(query, [
                data.email,
                data.username,
                data.password,
                data.name,
                data.role,
                user.username,
                null,
            ]);

            this.logger.info(`Inserted ${result.rowCount} ${result.rowCount === 1 ? "row" : "rows"}`);
            return {success: true, data: result.rows[0]};
        } catch (err) {
            if (err.code === '23505') {
                this.logger.info("Duplicate username or email");
                return {success: false, error: "Duplicate username or email"};
            }
            this.logger.error(err);
            return {success: false, error: "Error inserting user", detail: err.detail};
        }
    }

    public async update(id: number, data: User, user: User): Promise<Result<any>>  {
        try {
            this.logger.info(`Updating user with id = ${id}`);
            const query = `
                UPDATE folkera.users
                SET name        = $1,
                    role        = $2,
                    modified_by = $3,
                    modified_at = NOW()
                WHERE id = $4 RETURNING *;
            `;

            const result = await pool.query(query, [
                data.name,
                data.role,
                user.username,
                id
            ]);

            this.logger.info(`Updated ${result.rowCount} ${result.rowCount === 1 ? "row" : "rows"}`);
            return {success: true, data: result.rows[0]};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error updating user with id ${id}`, detail: err.detail};
        }
    }


    public async updateUserPassword(id: number, password: string, user: User): Promise<Result<any>>  {
        try {
            this.logger.info(`Updating user password with id = ${id}`);
            const query = `
                UPDATE folkera.users
                SET password    = $1,
                    modified_by = $2,
                    modified_at = NOW()
                WHERE id = $3 RETURNING *;
            `;

            const result = await pool.query(query, [
                password,
                user.username,
                id
            ]);

            this.logger.info(`Updated ${result.rowCount} ${result.rowCount === 1 ? "row" : "rows"}`);
            return {success: true, data: result.rows[0]};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error updating user with id ${id}`, detail: err.detail};
        }
    }

    public async deleteById(id: number): Promise<Result<any>>  {
        try {
            this.logger.info(`Deleting user with id = ${id}`);

            // todo implement soft delete
            const query = "DELETE FROM folkera.users WHERE id = $1 RETURNING id";
            const result = await pool.query(query, [id]);

            if (result.rows.length === 0) {
                return {success: false, error: "Not found"};
            }
            this.logger.info(`Deleted ${result.rows.length} ${result.rows.length === 1 ? "row" : "rows"}`);
            return {success: true, data: result.rows[0]};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error deleting user with id = ${id}`, detail: err.detail};
        }
    }
}

export default new PostgresUserService();
