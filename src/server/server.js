import express from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';
import helmet from "helmet";
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import postgres from './modules/pg.js';
import routes from './routes/routes.js';

async function main () {
    let __dirname = path.resolve(path.dirname(''));
    let db = await postgres();

    const app = express();
    const server = http.createServer(app);
    server.listen(8000, () => console.log('HTTP Server is ready!'));

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    });

    app.use(cors());
    app.use(limiter);
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(async (req, res, next) => {
        req.postgres = db;
        next();
    });

    routes(app);
}

main().then();