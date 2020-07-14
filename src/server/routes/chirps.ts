import * as express from 'express';
import db from "../db";
import * as rp from 'request-promise';
const router = express.Router();

router.get("/", async (_req, res, next) => {
    try {
        const chirps = await db.chirps.all();
        res.send(chirps);
    } catch (error) {
        next(error)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        let data = await db.chirps.one(id);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const id = parseInt(req.body.userid),
            content: string = req.body.content;

        if (content.search("@") !== -1) {
            try {
                const tempString = content.split('@').pop(),
                    mentionedUser = tempString.split(" ")[0],
                    fetchUserId = await rp(`http://localhost:3000/api/users/${mentionedUser}`),
                    userIdJson = JSON.parse(fetchUserId),
                    dbRes = await db.chirps.insert(id, content),
                    mention = await db.mentions.insert(userIdJson[0].id, dbRes.insertId);

                res.send(mention);
            } catch (error) {
                console.log(error);
            }
        } else {
            const dbRes = await db.chirps.insert(id, content);

            res.send(dbRes);
        }
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id),
            content = req.body.content;

        const dbRes = await db.chirps.update(id, content)

        res.sendStatus(dbRes);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id),
            dbRes = await db.chirps.destroy(id);

        res.send(dbRes);
    } catch (error) {
        next(error);
    }
});

export default router;