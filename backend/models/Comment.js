/*'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Comment extends Model {
    
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNul: false 
        }
      })
    }
  };
  Comment.init({
    iduser: Sequelize.INTEGER, 
    comment: Sequelize.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};*/

module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('Comment', {
      author: Sequelize.STRING,
      authorId: Sequelize.BIGINT,
      postId: Sequelize.BIGINT,
      comment: Sequelize.STRING
    })

  return Comment
};