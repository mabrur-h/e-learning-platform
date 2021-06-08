export default async (Sequelize, sequelize) => {
    return await sequelize.define('teachers', {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4()
        }
    })
}