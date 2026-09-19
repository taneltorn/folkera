import express, {Request, Response} from "express";
import log4js from "log4js";
import {verifyToken} from "../middleware/verifyToken";
import FavouritesService from "../service/favourites/FavouritesService";

class FavouritesController {

    router = express.Router();
    logger = log4js.getLogger("FavouriteController");

    favouritesService = new FavouritesService();

    constructor() {
        this.logger.level = process.env.LOG_LEVEL;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/:tuneId", verifyToken, this.addFavourite.bind(this));
        this.router.delete("/:tuneId", verifyToken, this.removeFavourite.bind(this));
    }

    async addFavourite(req: Request, res: Response): Promise<void> {
        try {
            // @ts-ignore todo use custom type
            const user = req.user;

            const tuneId = req.params.tuneId;

            if (!tuneId?.trim()) {
                res.status(400).json({
                    error: "Missing tune id"
                });
                return;
            }

            const result = await this.favouritesService.insert(
                user.id,
                tuneId
            );

            if (!result.success) {
                res.status(500).json({
                    error: result.error
                });
                return;
            }

            res.status(200).json({
                message: "Tune added to favourites"
            });

        } catch (err) {
            this.logger.error(err);

            res.status(500).json({
                error: "An unexpected error occurred."
            });
        }
    }

    async removeFavourite(req: Request, res: Response): Promise<void> {
        try {
            // @ts-ignore todo use custom type
            const user = req.user;

            const tuneId = req.params.tuneId;

            if (!tuneId?.trim()) {
                res.status(400).json({
                    error: "Missing tune id"
                });
                return;
            }

            const result = await this.favouritesService.delete(
                user.id,
                tuneId
            );

            if (!result.success) {
                res.status(500).json({
                    error: result.error
                });
                return;
            }

            res.status(200).json({
                message: "Tune removed from favourites"
            });

        } catch (err) {
            this.logger.error(err);

            res.status(500).json({
                error: "An unexpected error occurred."
            });
        }
    }
}

export default FavouritesController;