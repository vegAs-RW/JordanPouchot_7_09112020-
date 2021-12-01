/*'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Post extends Model {
   
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User,{
        foreignKey: {
          allowNul: false 
        }
      })
      models.Post.hasMany(models.Like)
    }
  };
  Post.init({
    iduser: Sequelize.INTEGER,
    content: Sequelize.STRING,
    date: Sequelize.DATE,
    attachment: Sequelize.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};*/

module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('Post', {
      userId: Sequelize.BIGINT,
      title: Sequelize.STRING,
      username: Sequelize.STRING,
      imgURL: Sequelize.STRING,
    })

  return Post
};