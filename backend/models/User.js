module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
      },

      firstName: {
          type: Sequelize.STRING(40),
          allowNull: false,
      },

      lastName: {
          type: Sequelize.STRING(40),
          allowNull: false,
      },

      username: {
          type: Sequelize.STRING(20),
          allowNull: false,
      },

      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
              is: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ 
          },
      },

      password: {
          type: Sequelize.STRING,
          allowNull: false,
      },

      isAdmin: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          default: false,
      },
  });

  return User;
};