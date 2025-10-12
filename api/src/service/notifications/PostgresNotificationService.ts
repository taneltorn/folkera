import log4js from "log4js";
import {Result} from "../../model/Result";
import pool from "../../config/dbConfig";
import Mapper from "../../utils/Mapper";
import NotificationService from "./NotificationService";
import {Notification} from "../../model/Notification";

class PostgresNotificationService implements NotificationService {

    private logger = log4js.getLogger("NotificationService");

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    public async findAll(): Promise<Result<Notification[]>> {
        try {
            this.logger.info(`Fetching notifications`);
            let query = `SELECT * FROM folkera.notifications ORDER BY id ASC`;
            const result = await pool.query(query);

            this.logger.info(`Found ${result.rows.length} ${result.rows.length === 1 ? "row" : "rows"}`);
            return {success: true, data: Mapper.mapFields(result.rows)};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: "Error querying notifications", detail: err.detail};
        }
    }

    public async findActive(): Promise<Result<Notification[]>> {
        try {
            this.logger.info(`Fetching notifications`);
            let query = `SELECT * FROM folkera.notifications
                                WHERE (valid_from IS NULL OR valid_from < NOW())
                                AND (valid_to IS NULL OR valid_to > NOW())`;
            const result = await pool.query(query);

            this.logger.info(`Found ${result.rows.length} ${result.rows.length === 1 ? "row" : "rows"}`);
            return {success: true, data: Mapper.mapFields(result.rows)};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: "Error querying notifications", detail: err.detail};
        }
    }

    public async findById(id: number): Promise<Result<Notification>> {
        try {
            this.logger.info(`Fetching notification with id = ${id}`);

            let query = "SELECT * FROM folkera.notifications WHERE id = $1";
            const result = await pool.query(query, [id]);

            this.logger.info(`Found ${result.rows.length} ${result.rows.length === 1 ? "row" : "rows"}`);
            if (result.rows.length === 0) {
                return {success: false, error: "Not found"};
            }
            return {success: true, data: Mapper.mapFields(result.rows[0])};

        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error querying notification with id = ${id}`, detail: err.detail};
        }
    }

    public async insert(notification: Notification): Promise<Result<any>> {
        try {
            this.logger.info(`Inserting new notification`);
            const query = `INSERT INTO folkera.notifications(title, message, valid_from, valid_to)
                           VALUES ($1, $2, $3, $4) RETURNING *`;
            const result = await pool.query(query, [
                notification.title,
                notification.message,
                notification.validFrom,
                notification.validTo,
            ]);
            this.logger.info(`Inserted ${result.rowCount} ${result.rowCount === 1 ? "row" : "rows"} `);
            return {success: true, data: result.rows[0]};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error inserting notification`, detail: err.detail};
        }
    }

    public async update(id: number, notification: Notification): Promise<Result<any>> {
        try {
            this.logger.info(`Updating notification with id = ${id}`);
            this.logger.info(notification)
            const query = `
                UPDATE folkera.notifications
                SET title      = $1,
                    message    = $2,
                    valid_from = $3,
                    valid_to   = $4
                WHERE id = $5 RETURNING *;
            `;
            const result = await pool.query(query, [
                notification.title,
                notification.message,
                notification.validFrom,
                notification.validTo,
                id,
            ]);
            this.logger.info(`Updated ${result.rowCount} ${result.rowCount ? "row" : "rows"}`);
            if (result.rows.length === 0) {
                return {success: false, error: "Not found"};
            }
            return {success: true, data: result.rows[0]};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error updating notification with id ${id}`, detail: err.detail};
        }
    }

    public async deleteById(id: number): Promise<Result<any>> {
        try {
            this.logger.info(`Deleting notification with id = ${id}`);

            const query = "DELETE FROM folkera.notifications WHERE id = $1 RETURNING id";
            const result = await pool.query(query, [id]);
            if (result.rows.length === 0) {
                return {success: false, error: "Not found"};
            }
            this.logger.info(`Deleted ${result.rows.length} ${result.rows.length === 1 ? "row" : "rows"}`);
            return {success: true, data: result.rows[0]};
        } catch (err) {
            this.logger.error(err);
            return {success: false, error: `Error deleting notification with id ${id}`, detail: err.detail};
        }
    }
}

export default PostgresNotificationService;
