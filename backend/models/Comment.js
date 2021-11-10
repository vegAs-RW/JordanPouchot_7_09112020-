module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("Comment", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },

        comment: {
            type: Sequelize.TEXT,
            allowNull: false,
        },

        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    return Comment;
};