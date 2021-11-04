const express = require('express');
const router = express.Router();
const path = require('path')
const controller = require('../controllers/index.controller')


router.get('/', controller.index);

router.get('/login', controller.login);

router.get('/register', controller.register);

router.get('/cotizacion', controller.cotizacion);

router.get('/product', controller.product);

router.get('/productCart',controller.produtCart);

module.exports = router