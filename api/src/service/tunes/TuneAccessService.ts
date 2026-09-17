import log4js from "log4js";
import {Result} from "../../model/Result";
import pool from "../../config/dbConfig";
import {TuneAccess} from "../../model/TuneAccess";
import {Tune} from "../../model/Tune";
import {User, UserRole} from "../../model/User";

class TuneAccessService {

    private logger = log4js.getLogger("TuneAccessService");

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
    }

    public async findByUserId(userId: number): Promise<Result<TuneAccess[]>> {
        try {
            this.logger.info(`Loading tune access for user ${userId}`);

            if (!userId) {
                this.logger.info("No user ID provided, returning empty tune access list");
                return {
                    success: true,
                    data: []
                };
            }


            const query = `
                SELECT *
                FROM folkera.user_tune_access
                WHERE user_id = $1
            `;

            const result = await pool.query(query, [userId]);

            this.logger.info(`Found ${result.rows.length} tune access entries for user ${userId}`);

            return {
                success: true,
                data: result.rows.map(row => ({
                    userId: row.id,
                    accessRef: row.access_ref
                }))
            };
        } catch (err: any) {
            this.logger.error(`Failed to load tune access for user ${userId}: ${err.message}`);

            return {
                success: false,
                data: [],
                error: "Failed to load tune access",
                detail: err.message
            };
        }
    }

    public async hasAccess(tune: Tune, user?: User): Promise<boolean> {
        if (tune.access === "OPEN") {
            return true;
        }

        if (!user?.id) {
            return false;
        }

        if ([UserRole.ADMIN, UserRole.RESEARCHER].includes(user.role)) {
            return true;
        }

        const result = await this.findByUserId(user.id);

        if (!result.success) {
            this.logger.info(`Access denied to tune ${tune.ref}: failed to load tune access for user ${user.id}`);
            return false;
        }

        const matchingAccess = result.data.find(
            ta => tune.ref.startsWith(ta.accessRef)
        );

        if (matchingAccess) {
            return true;
        }

        this.logger.info(`Access denied to tune ${tune.ref}: no matching access found for user ${user.id}`);

        return false;
    }
}

export default TuneAccessService;