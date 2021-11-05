const express = require('express');
const router = express.Router();
const path = require('path')
const controller = require('../controllers/users.controller.js')


router.get('/login', controller.login);

router.get('/register', controller.register);

module.exports = router