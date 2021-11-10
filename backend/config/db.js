const mysql = require("mysql")
require("dotenv").config();

const db = mysql.createConnection({
    host     : 'localhost',
    user     : `${process.env.USER_DB}`,
    password : `${process.env.PASS_DB}`,
    database : `${process.env.DB_NAME}`
  });
  
 module.exports.getDB = () => {
     return db
 }