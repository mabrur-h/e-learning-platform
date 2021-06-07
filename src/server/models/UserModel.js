export default async (Sequelize, sequelize) => {
    return await sequelize.define('users', {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4()
        },
        name: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
        },
        email: {
            type: Sequelize.DataTypes.STRING(64),
            is: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            unique: true
        },
        phone: {
            type: Sequelize.DataTypes.STRING(13),
            is: /^9989[012345789][0-9]{7}$/,
            allowNull: false,
            unique: true
        },
        role: {
            type: Sequelize.DataTypes.ENUM,
            values: ["superadmin", "admin", "teacher", "moderator", "student"],
            defaultValue: "student"
        },
        birth_date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false
        },
        gender: {
            type: Sequelize.DataTypes.ENUM,
            values: ["male", "female"],
            allowNull: false
        }
    })
}