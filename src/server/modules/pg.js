import { Sequelize } from "sequelize";
import config from '../config.js';

import UserModel from '../models/UserModel.js';

const sequelize = new Sequelize(config.PG_CONNECTION_STRING, {
    logging: false
});

async function postgres() {
    try {
        let db = {};
        db.users = await UserModel(Sequelize, sequelize);

        // await sequelize.sync({ force: true });
        return db;
    } catch (e) {
        console.log("DB-ERROR:", e);
    }
}

export default postgres;