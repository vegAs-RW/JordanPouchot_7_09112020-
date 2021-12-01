/*module.exports = app => {
    const users = require("../controllers/user.controller");
    const auth = require('../middleware/auth');

    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/register", users.signup);
  
    // Retrieve all Tutorials
    router.post("/login", users.login);

    // Delete a Tutorial with id
    router.delete("/:id", auth, users.deleteUser);
  
  
    app.use('/api/users', router);
  };*/

  const express = require('express');
  const router = express.Router();
  const auth = require('../middleware/auth');
  const userCtrl = require('../controllers/user.controller');
  
  
  router.post('/register', userCtrl.signup);
  router.post('/login', userCtrl.login);
  router.delete('/', auth, userCtrl.delete);
  
  module.exports = router;