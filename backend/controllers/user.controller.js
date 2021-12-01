/*const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
const db = require ('../models');
const fs = require("fs");
const user = require('../models/user');
const User = db.users;

exports.signup = (req, res) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                isAdmin: false,
            })

                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))

                .catch((error) => res.status(400).json({ error }));
        })

        .catch((error) => res.status(500).json({ message: ' lololo' }));
};


exports.login = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username,
        },
    }).then((user) => {
        if (!user) {
            return res.status(401).json({ error: "Utilisateur inexistant !" });
        }
        bcrypt
            .compare(req.body.password, user.password) 
            .then((valid) => {
                if (!valid) {
                    return res.status(401).json({ error: "Mot de passe incorrect !" });
                }
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        "RANDOM_TOKEN_SECRET",
                        { expiresIn: "24h" }
                    )
                });
            })
            .catch((error) => res.status(500).json({ error }));
    });
};


exports.deleteUser = (req, res, next) => {
    User.findOne({
        where: {
            id: req.params.id,
        },
    })
        .then((user) => { 
            if(user == user.id && user.isAdmin == true) {
                User.destroy({ where: { id: req.params.id } });
                res.status(200).json({ message: "Compte supprimé !" });
            }     
        })
        .catch((error) => res.status(500).json({ error }));
};*/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require("../models");
const User = db.users
const Post = db.posts;
const Comment = db.comments;
const Op = db.Sequelize.Op;

exports.signup = (req, res, next) => {
  User.findOne({
    attributes: ['email'],
    where: { email: req.body.email }
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10)
          .then(hash => {
            const newUser = {
              password: hash,
              username: req.body.username,
              email: req.body.email,
              isAdmin: false,
            };
            User.create(newUser)
              .then(() => {
                res.status(201).json({ message: 'User created !' });
              })
          })
          .catch(error => res.status(500).json({ error }));
      } else {
        res.status(409).json({ error: 'Email already used!' })
      }
    })
};

exports.login = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email }
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User not found!' });
      }
      bcrypt.compare(req.body.password, user.dataValues.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password !' });
          }
          res.status(200).json({
            username: user.dataValues.username,
            id: user.dataValues.id,
            isAdmin: user.dataValues.isAdmin,
            token: jwt.sign(
              { userId: user.dataValues.id },
              'MY_SECRET_TOKEN',
              { expiresIn: '1h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


exports.delete = (req, res, next) => {
  User.findOne({
    where: { id: req.body.userId }
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User not found!' });
      }
      bcrypt.compare(req.body.password, user.dataValues.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password !' });
          }

          User.destroy({ where: { id: req.body.userId } })
          Post.findAll({ where: { userId: req.body.userId } })
            .then((result) => {
              let postsId = [];
              let postsUrlImage = []
              for (let i = 0; i < result.length; i++) {
                postsId.push(result[i].id)
                postsUrlImage.push(result[i].imgURL.split('/images/')[1])
              }
              //get the links of the images linked to the posts and delete them
              for (let i = 0; i < postsUrlImage.length; i++) {
                fs.unlink(`images/${postsUrlImage[i]}`, (err) => {
                  if (err) { console.log(`images/${postsUrlImage[i]} not found !`); }
                  else { console.log(`deleted old images/${postsUrlImage[i]}`); }
                })
              }
              //and removes user comments, as well as comments related to posts that have been deleted
              Comment.destroy({
                where: { [Op.or]: [{ authorId: req.body.userId }, { postId: postsId }] }
              })
              //delete user posts
              Post.destroy({ where: { userId: req.body.userId } })
                .then(() => {
                  res.status(200).json({ message: 'User deleted' })
                })
            })
            .catch(error => res.status(401).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ error }));
};