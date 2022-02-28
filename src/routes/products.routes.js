const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require("multer");

//*---------CONTROLADOR--------------*//
const controller = require('../controllers/products.controller.js')


//*---------VALIDACIONES--------------*//
const validationsProducts = require('../middlewares/validateProductsMiddleware')


const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')


//*---------CONFIGURACION ALMACENAMIENTO PRODUCT IMAGE--------------*//
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../public/img/products_image"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_"+ file.originalname);
      },
});

const upload = multer({ storage: storage});


//*---------RUTAS--------------*//

router.get('/cotizacion', controller.cotizacion);

router.get('/product/:id', controller.product);

router.get('/productCart',authMiddleware,controller.productCart);

router.get('/admin',adminMiddleware,controller.admin);

//Editar producto
router.get('/adminEdit/:id',controller.adminEdit);
router.put('/adminEdit/:id', upload.single("image"),validationsProducts.editProduct,controller.adminModified);

//Crear producto
router.get('/adminCreate',controller.adminCreate);
router.post('/adminCreate', upload.single("image"),validationsProducts.createProduct, controller.adminStore);

// Lista de productos
router.get('/productsList', controller.productsList);

//Eliminar producto
router.delete ('/delete/:id', controller.adminDelete)

module.exports = router