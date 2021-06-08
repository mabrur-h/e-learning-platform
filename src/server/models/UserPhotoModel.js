export default async (Sequelize, sequelize) => {
    return await sequelize.define('userPhotos', {
        photo_id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4()
        }
    })
}