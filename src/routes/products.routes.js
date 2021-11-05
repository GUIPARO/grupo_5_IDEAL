const express = require('express');
const router = express.Router();
const path = require('path')
const controller = require('../controllers/products.controller.js')


router.get('/cotizacion', controller.cotizacion);

router.get('/product', controller.product);

router.get('/productCart',controller.produtCart);

router.get('/admin',controller.admin);


module.exports = router