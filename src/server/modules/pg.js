import { Sequelize } from "sequelize";
import config from '../config.js';

import UserModel from '../models/UserModel.js';
import AttemptsModel from '../models/AttemptsModel.js';
import BanModel from '../models/BanModel.js';

const sequelize = new Sequelize(config.PG_CONNECTION_STRING, {
    logging: false
});

async function postgres() {
    try {
        let db = {};
        db.users = await UserModel(Sequelize, sequelize);
        db.attempts = await AttemptsModel(Sequelize, sequelize);
        db.ban_model = await BanModel(Sequelize, sequelize);

        await db.users.hasMany(db.attempts, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.attempts.belongsTo(db.users, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.users.hasMany(db.ban_model, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.ban_model.belongsTo(db.users, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        // await db.ban_model.destroy({
        //     where: {
        //         user_id: "42900a56-6024-406e-a7f1-9877a602b35a"
        //     }
        // })

        // await sequelize.sync({ force: true });
        return db;
    } catch (e) {
        console.log("DB-ERROR:", e);
    }
}

export default postgres;