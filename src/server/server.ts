import * as express from 'express';
import apiRouter from './routes';
import * as path from 'path';
const app = express(),
    PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", apiRouter);
app.use("/", express.static(path.join(__dirname, "../public")));

app.listen(PORT);