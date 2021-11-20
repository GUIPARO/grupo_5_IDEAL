const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require("multer");
const controller = require('../controllers/products.controller.js')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public/img"));
    },
    filename: function(req, file, cb) {
        console.log(file)
        cb(null, file.fieldname + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage});

router.get('/cotizacion', controller.cotizacion);

router.get('/product/:id', controller.product);

router.get('/productCart',controller.produtCart);

router.get('/admin',controller.admin);

router.get('/adminEdit',controller.adminEdit);

router.get('/adminCreate',controller.adminCreate);

router.post('/adminCreate', upload.single("file"), controller.adminStore);

router.get('/productsList', controller.products);


module.exports = router