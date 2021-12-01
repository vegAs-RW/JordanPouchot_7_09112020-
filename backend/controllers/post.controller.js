const fs = require('fs');
const db = require("../models");
const Post = db.posts;
const User = db.users;
const Comment = db.comments;


exports.getPosts = (req, res, next) => {
  Post.findAll()
    .then((allPosts) => {
      Comment.findAll()
        .then((allComments) => {
          res.status(200).json({
            result: {
              allPosts: allPosts,
              allComments: allComments
            }
          })
        })
    })
    .catch(error => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
  User.findOne({
    attributes: ['username'],
    where: { id: req.body.userId }
  })
    .then(user => {
      const newPost = {
        userId: req.body.userId,
        title: req.body.title,
        username: user.dataValues.username,
        imgURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      };
      Post.create(newPost)
        .then(() => {
          res.status(201).json({ message: 'Post created !' });
        })
        .catch(error => res.status(500).json({ error })
        );
    })
};

exports.modifyPost = (req, res, next) => {
  User.findOne({
    attributes: ['isAdmin'],
    where: { id: req.body.userId }
  })
    .then(user => {
      Post.findOne({
        attributes: ['userId', 'username', 'imgURL'],
        where: { id: req.params.id }
      })
        .then(post => {
          if (req.body.userId == post.dataValues.userId || user.dataValues.isAdmin == '1') {
            let postObject = {
              title: req.body.title,
              desc: req.body.desc
            }
            const filename = post.dataValues.imgURL.split('/images/')[1];
            if (req.file) {
              postObject['imgURL'] = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
              fs.unlink(`images/${filename}`, (err) => {
                if (err) { console.log(`images/${filename} not found !`); }
                else { console.log(`deleted old images/${filename}`); }
              });
            }
            Post.update(
              postObject,
              { where: { id: req.params.id } }
            )
              .then(() => {
                console.log('Item edited by ' + user.dataValues.username)
                res.status(200).json({ message: 'Item changed!' })
              })
              .catch(error => res.status(500).json({ error }));

          } else { throw new Error('unauthorized') }

        })
        .catch(error => res.status(401).json({ error: 'Invalid user ID' }));
    })
};

exports.deletePost = (req, res, next) => {
  User.findOne({
    attributes: ['isAdmin', 'username'],
    where: { id: req.body.userId }
  })
    .then(user => {
      Post.findOne({
        attributes: ['userId', 'imgURL'],
        where: { id: req.params.id }
      })
        .then(post => {
          if (req.body.userId == post.dataValues.userId || user.dataValues.isAdmin == '1') {
            const filename = post.dataValues.imgURL.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              console.log(`deleted images/${filename}`);

              Post.destroy({
                where: { id: req.params.id }
              })
                .then(() => {
                  Comment.destroy({
                    where: { postId: req.params.id }
                  })
                    .then(() => {
                      console.log('Item deleted by userId ' + user.dataValues.username)
                      res.status(200).json({ message: 'Item deleted!' })
                    })
                })
                .catch(error => res.status(400).json({ error })
                );
            });
          } else { throw new Error('unauthorized') }
        })
        .catch(error => res.status(401).json({ error }));
    })
};