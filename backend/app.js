const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const path = require('path');


const app = express();


const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//1er middleware : CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Auth-Token, X-CSRF-TOKEN, Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(express.json());
app.use(helmet());

//Routes
app.use('/api/users', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;