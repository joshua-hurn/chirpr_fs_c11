import * as express from 'express';
import db from "../db";
const router = express.Router();

router.get("/:id", async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id),
            dbResponse = await db.mentions.all(userId);

        res.send(dbResponse[0]);
    } catch (error) {
        next(error)
    }
});

router.post("/", async (req, res, next) => {
    try {
        const userid = parseInt(req.body.userid),
            chirpId = req.body.chirpid;

        const dbRes = await db.mentions.insert(userid, chirpId);

        res.send(dbRes);
    } catch (error) {
        next(error);
    }
});

export default router;