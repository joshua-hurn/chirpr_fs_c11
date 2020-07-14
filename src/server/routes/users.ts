import * as express from 'express';
import db from "../db";
const router = express.Router();

router.get("/:name", async (req, res, next) => {
    try {
        console.log("fetching userid based on username")
        const name = req.params.name,
            dbResponse = await db.mentions.one(name);

        res.send(dbResponse);
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