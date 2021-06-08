import { Sequelize } from "sequelize";
import config from '../config.js';

import UserModel from '../models/UserModel.js';
import AttemptsModel from '../models/AttemptsModel.js';
import BanModel from '../models/BanModel.js';
import SessionModel from '../models/SessionModel.js';
import SettingsModel from '../models/SettingsModel.js';
import FileModel from "../models/FileModel.js";
import UserPhotoModel from "../models/UserPhotoModel.js";

const sequelize = new Sequelize(config.PG_CONNECTION_STRING, {
    logging: false
});

async function postgres() {
    try {
        let db = {};
        db.users = await UserModel(Sequelize, sequelize);
        db.attempts = await AttemptsModel(Sequelize, sequelize);
        db.bans = await BanModel(Sequelize, sequelize);
        db.sessions = await SessionModel(Sequelize, sequelize);
        db.settings = await SettingsModel(Sequelize, sequelize);
        db.files = await FileModel(Sequelize, sequelize);
        db.userPhotos = await UserPhotoModel(Sequelize, sequelize);

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

        await db.users.hasMany(db.bans, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.bans.belongsTo(db.users, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.users.hasMany(db.sessions, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.sessions.belongsTo(db.users, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.users.hasMany(db.files, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.files.belongsTo(db.users, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.users.hasMany(db.userPhotos, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.userPhotos.belongsTo(db.users, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })

        await db.files.hasOne(db.userPhotos, {
            foreignKey: {
                name: 'file_id',
                allowNull: false
            }
        })

        await db.userPhotos.belongsTo(db.files, {
            foreignKey: {
                name: 'file_id',
                allowNull: false
            }
        })

        // await db.users.hasOne(db.files, {
        //     foreignKey: {
        //         name: 'photo_id',
        //         allowNull: true
        //     }
        // })


        // await db.bans.destroy({
        //     where: {
        //         user_id: "b3357295-4cbe-4583-9575-645d65205f13"
        //     }
        // })

        // await db.settings.create({
        //     name: 'phone_attempts',
        //     value: '3'
        // })

        // await db.settings.create({
        //     name: 'code_attempts',
        //     value: '3'
        // })

        // await db.settings.create({
        //     name: 'ban_time',
        //     value: '7200000'
        // })


        await sequelize.sync({ force: false });
        return db;
    } catch (e) {
        console.log("DB-ERROR:", e);
    }
}

export default postgres;