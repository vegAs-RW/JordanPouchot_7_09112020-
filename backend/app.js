const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const app = express();
const path = require ('path')

// Modifications des Headers pour les Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json());
app.use(helmet());

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});


module.exports = app;