/*module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.BOOLEAN
    }
  });

  return User;
};*/

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
      email: Sequelize.STRING,
      username: Sequelize.STRING,
      password: Sequelize.STRING,
      isAdmin: Sequelize.TINYINT
    })

  return User;
};


