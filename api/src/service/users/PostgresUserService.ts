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
            this.logger.info("Fetching users");

            const userResult = await pool.query(`
                SELECT *
                FROM folkera.users
                WHERE deleted_at IS NULL
                ORDER BY id ASC
            `);

            const accessResult = await pool.query(`
                SELECT user_id, access_ref
                FROM folkera.user_tune_access
            `);

            const accessesByUser = new Map<number, string[]>();

            for (const row of accessResult.rows) {
                const accesses = accessesByUser.get(row.user_id) || [];

                accesses.push(row.access_ref);
                accessesByUser.set(row.user_id, accesses);
            }

            const users = Mapper.mapFields(userResult.rows)
                .map((user: User) => ({
                    ...user,
                    accessRefs: accessesByUser.get(user.id!) || []
                }));

            this.logger.info(`Found ${users.length} ${users.length === 1 ? "user" : "users"}`);

            return {
                success: true,
                data: users
            };

        } catch (err: any) {
            this.logger.error(err);

            return {
                success: false,
                error: "Error querying users",
                detail: err.detail
            };
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
            return {
                success: false,
                error: `Error querying user with username or email = ${usernameOrEmail}`,
                detail: err.detail
            };
        }
    }

    public async insert(data: User, user: User): Promise<Result<any>> {

        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            this.logger.info("Inserting new user");

            const query = `
                INSERT INTO folkera.users (email,
                                           username,
                                           password,
                                           name,
                                           role,
                                           created_by,
                                           deleted_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *
            `;

            const result = await client.query(query, [
                data.email,
                data.username,
                data.password,
                data.name,
                data.role,
                user.username,
                null,
            ]);

            const createdUser = result.rows[0];
            const userId = createdUser.id;
            const accessRefs = data.accessRefs || [];

            if (accessRefs.length > 0) {
                const values = accessRefs
                    .map((_, index) => `($1, $${index + 2})`)
                    .join(", ");

                await client.query(`
                    INSERT INTO folkera.user_tune_access (user_id, access_ref)
                    VALUES
                        ${values}
                `, [
                    userId,
                    ...accessRefs
                ]);
            }

            await client.query("COMMIT");

            this.logger.info(`Inserted user ${userId} with ${accessRefs.length} tune access entries`);

            return {
                success: true,
                data: {
                    ...Mapper.mapFields(createdUser),
                    accessRefs
                }
            };

        } catch (err: any) {
            await client.query("ROLLBACK");

            if (err.code === "23505") {
                this.logger.info("Duplicate username or email");

                return {
                    success: false,
                    error: "Duplicate username or email"
                };
            }

            this.logger.error(err);

            return {
                success: false,
                error: "Error inserting user",
                detail: err.detail
            };

        } finally {
            client.release();
        }
    }

    public async update(id: number, data: User, user: User): Promise<Result<any>> {

        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            this.logger.info(`Updating user with id = ${id}`);

            const query = `
                UPDATE folkera.users
                SET name        = $1,
                    email       = $2,
                    role        = $3,
                    modified_by = $4,
                    modified_at = NOW()
                WHERE id = $5
                RETURNING *;
            `;

            const result = await client.query(query, [
                data.name,
                data.email,
                data.role,
                user.username,
                id
            ]);

            if (result.rowCount === 0) {
                await client.query("ROLLBACK");

                return {
                    success: false,
                    error: "User not found"
                };
            }

            this.logger.info(`Updating tune accesses for user with id = ${id}`);

            await client.query(`
                DELETE
                FROM folkera.user_tune_access
                WHERE user_id = $1
            `, [id]);

            const accessRefs = data.accessRefs || [];

            if (accessRefs.length > 0) {
                const values = accessRefs
                    .map((_, index) => `($1, $${index + 2})`)
                    .join(", ");

                await client.query(`
                    INSERT INTO folkera.user_tune_access (user_id, access_ref)
                    VALUES ${values}
                `, [id, ...accessRefs]);
            }

            await client.query("COMMIT");

            this.logger.info(`Updated user ${id} with ${accessRefs.length} tune access entries`);

            return {
                success: true,
                data: {
                    ...Mapper.mapFields(result.rows[0]),
                    accessRefs
                }
            };

        } catch (err: any) {
            await client.query("ROLLBACK");

            this.logger.error(`Error updating user with id ${id}`, err);

            return {
                success: false,
                error: `Error updating user with id ${id}`,
                detail: err.detail
            };

        } finally {
            client.release();
        }
    }

    public async updateUserPassword(id: number, password: string, user: User): Promise<Result<any>> {
        try {
            this.logger.info(`Updating user password with id = ${id}`);
            const query = `
                UPDATE folkera.users
                SET password    = $1,
                    modified_by = $2,
                    modified_at = NOW()
                WHERE id = $3
                RETURNING *;
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

    public async deleteById(id: number): Promise<Result<any>> {
        try {
            this.logger.info(`Deleting user with id = ${id}`);

            const result = await pool.query(`
                DELETE
                FROM folkera.users
                WHERE id = $1
                RETURNING id
            `, [id]);

            if (result.rows.length === 0) {
                return {
                    success: false,
                    error: "Not found"
                };
            }

            this.logger.info(`Deleted user with id = ${id}`);

            return {
                success: true,
                data: result.rows[0]
            };

        } catch (err: any) {
            this.logger.error(`Error deleting user with id = ${id}`, err);

            return {
                success: false,
                error: `Error deleting user with id = ${id}`,
                detail: err.detail
            };
        }
    }
}

export default new PostgresUserService();
