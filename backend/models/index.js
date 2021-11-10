const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, { // Nouvelle instance Sequelize
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/User') (sequelize, Sequelize)
db.Post = require('../models/Post') (sequelize, Sequelize)
db.Comment = require('../models/Comment') (sequelize, Sequelize)
db.like = require ('../models/Like') (sequelize, Sequelize)