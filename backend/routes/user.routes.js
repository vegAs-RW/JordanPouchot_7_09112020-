const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user.controller')

router.post('/auth/signup', userCtrl.signup);
router.post('/auth/login', userCtrl.login);
router.delete('/accounts/:id', auth, userCtrl.deleteUser);

module.exports = router;
