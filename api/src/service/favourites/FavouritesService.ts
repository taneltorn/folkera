import pool from "../../config/dbConfig";
import log4js from "log4js";
import {Result} from "../../model/Result";
import Mapper from "../../utils/Mapper";
import {TuneFavourite} from "../../model/TuneFavourite";

class FavouritesService {

    private logger = log4js.getLogger("FavouritesService");

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    public async findByUserId(userId: number): Promise<Result<TuneFavourite[]>> {
        try {
            this.logger.info(`Fetching tune favourites for user ${userId}`);

            const result = await pool.query(`
                SELECT user_id, tune_id
                FROM folkera.user_tune_favourite
                WHERE user_id = $1
            `, [userId]);

            return {
                success: true,
                data: Mapper.mapFields(result.rows)
            };

        } catch (err: any) {
            this.logger.error(err);

            return {
                success: false,
                data: [],
                error: "Error querying tune favourites",
                detail: err.detail
            };
        }
    }

    public async insert(
        userId: number,
        tuneId: string
    ): Promise<Result<any>> {
        try {
            this.logger.info(`Adding tune ${tuneId} to favourites for user ${userId}`);

            await pool.query(`
                INSERT INTO folkera.user_tune_favourite (user_id,
                                                         tune_id)
                VALUES ($1, $2)
                ON CONFLICT (user_id, tune_id) DO NOTHING
            `, [
                userId,
                tuneId
            ]);

            return {
                success: true
            };

        } catch (err: any) {
            this.logger.error(err);

            return {
                success: false,
                error: "Error adding tune favourite",
                detail: err.detail
            };
        }
    }

    public async delete(
        userId: number,
        tuneId: string
    ): Promise<Result<any>> {
        try {
            this.logger.info(
                `Removing tune ${tuneId} from favourites for user ${userId}`
            );

            await pool.query(`
                DELETE
                FROM folkera.user_tune_favourite
                WHERE user_id = $1
                  AND tune_id = $2
            `, [
                userId,
                tuneId
            ]);

            return {
                success: true
            };

        } catch (err: any) {
            this.logger.error(err);

            return {
                success: false,
                error: "Error removing tune favourite",
                detail: err.detail
            };
        }
    }
}

export default FavouritesService;