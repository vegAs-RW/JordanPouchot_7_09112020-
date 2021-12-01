const fs = require('fs');
const db = require("../models");
const User = db.users;
const Comment = db.comments;
const Op = db.Sequelize.Op;

exports.addComment = (req, res, next) => {
    User.findOne({
      attributes: ['username'], 
      where: { id: req.body.userId }
    })
    .then(user => {
      const newComment = {
        author: user.dataValues.username,
        authorId: req.body.userId,
        postId: req.params.id,
        comment: req.body.comment, 
      };
      Comment.create(newComment)
        .then(() => {
          res.status(201).json({ message: 'Comment created !' });
      })
    })
    .catch(error => res.status(500).json({ error }));
  };

  exports.modifyComment = (req, res, next) => {
    User.findOne({
      attributes: ['isAdmin'], 
      where: { id: req.body.userId }
    })
    .then(user => {
      Comment.findOne({
        attributes: ['authorId'], 
        where: { id: req.params.id }
      })
      .then(comment => {
        //check if author or admin
        if (req.body.userId == comment.dataValues.authorId || user.dataValues.isAdmin == '1' ) {
          const newComment = {
            comment: req.body.comment, 
          };
          Comment.update(
            newComment,
            { where: { id: req.params.id } }
          )
          .then(() => {
            res.status(201).json({ message: 'Comment created !' });
          })
        } else {res.status(401).json({ error: 'unauthorized' })}
      })
    })
    .catch(error => res.status(500).json({ error }));
  };

  exports.deleteComment = (req, res, next) => {
    User.findOne({
      attributes: ['isAdmin'], 
      where: { id: req.body.userId }
    })
    .then(user => {
      Comment.findOne({
        attributes: ['authorId'], 
        where: { id: req.params.id }
      })
      .then(comment => {
        //check if author or admin
        if (req.body.userId == comment.dataValues.authorId || user.dataValues.isAdmin == '1' ) {
          Comment.destroy({
            where: { id: req.params.id }
          })
          .then(() => {
            res.status(201).json({ message: 'Comment deleted !' });
          })
        } else {res.status(401).json({ error: 'unauthorized' })}
      })
    })
    .catch(error => res.status(500).json({ error }));
  };