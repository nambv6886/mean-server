const express = require('express');
const UserController = require('../controller/user');

const router = express.Router();

router.post('/signup', UserController.createUser);
router.post('/login', UserController.userLoginFunction);
router.post('/logout', UserController.logout);
router.post('/refresh', UserController.refresh);

module.exports = router;
