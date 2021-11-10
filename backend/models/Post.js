module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
      },

      content: {
          type: Sequelize.TEXT,
          allowNull: false,
      },

      imageURL: {
          type: Sequelize.STRING,
          allowNull: true,
      },

      date: {
          type: Sequelize.DATE,
          allowNull: true,
      },
  });

  return Post;
};