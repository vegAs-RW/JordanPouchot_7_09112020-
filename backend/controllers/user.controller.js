const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
const db = require ('../models');
const fs = require("fs");

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            db.User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                isAdmin: false,
            })

                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))

                .catch((error) => res.status(400).json({ error }));
        })

        .catch((error) => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {
    db.User.findOne({
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
    db.User.findOne({
        where: {
            id: req.params.id,
        },
    })
        .then(() => { 
            if()
                db.User.destroy({ where: { id: req.params.id } });
                res.status(200).json({ message: "Compte supprimé !" });
        })
        .catch((error) => res.status(500).json({ error }));
};