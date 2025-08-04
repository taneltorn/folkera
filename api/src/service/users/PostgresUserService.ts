import pool from "../../config/dbConfig";
import log4js from "log4js";
import Mapper from "../../utils/Mapper";
import UserService from "./UserService";

class PostgresUserService implements UserService {
    private logger = log4js.getLogger("UserService");

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    public async findAll() {
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

    public async findByEmail(email: string): Promise<any> {
        try {
            this.logger.info(`Fetching user with email = ${email}`);

            const query = "SELECT * FROM folkera.users WHERE LOWER(email) = LOWER($1) AND deleted_at IS NULL";
            const result = await pool.query(query, [email]);

            this.logger.info(`Found ${result.rows.length} ${result.rows.length === 1 ? "row" : "rows"}`);
            if (result.rows.length === 0) {
                return {success: false, error: "Not found"};
            }
            return {success: true, data: Mapper.mapFields(result.rows[0])};

        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error querying user with email = ${email}`, detail: err.detail};
        }
    }

    public async insert(data: any, user: any) {
        try {
            this.logger.info(`Inserting new user`);
            const query = `
                INSERT INTO folkera.users(email, password, name, role, created_by, deleted_at)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
            `;
            const result = await pool.query(query, [
                data.email,
                data.password,
                data.name,
                data.role,
                user.email,
                null,
            ]);

            this.logger.info(`Inserted ${result.rowCount} ${result.rowCount === 1 ? "row" : "rows"}`);
            return {success: true, data: result.rows[0]};
        } catch (err) {
            if (err.code === '23505') {
                this.logger.info("Duplicate email");
                return {success: false, error: "Duplicate email"};
            }
            this.logger.error(err);
            return {success: false, error: "Error inserting user", detail: err.detail};
        }
    }

    public async update(id: number, data: any, user: any) {
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
                user.email,
                id
            ]);

            this.logger.info(`Updated ${result.rowCount} ${result.rowCount === 1 ? "row" : "rows"}`);
            return {success: true, data: result.rows[0]};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error updating user with id ${id}`, detail: err.detail};
        }
    }


    public async updateUserPassword(id: number, password: string, user: any) {
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
                user.email,
                id
            ]);

            this.logger.info(`Updated ${result.rowCount} ${result.rowCount === 1 ? "row" : "rows"}`);
            return {success: true, data: result.rows[0]};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error updating user with id ${id}`, detail: err.detail};
        }
    }

    public async delete(id: number) {
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
