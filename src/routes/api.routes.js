const express = require('express');
const router = express.Router();
const controller = require('../controllers/api.controller.js')


router.get('/users', controller.users);
router.get('/users/:id', controller.oneUser);
router.get('/products', controller.products);
router.get('/products/:id', controller.oneProduct);

module.exports = router