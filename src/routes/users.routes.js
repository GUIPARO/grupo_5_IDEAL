const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const controller = require('../controllers/users.controllers.js')

// CONFIGURACION ALMACENAMIENTO USERS AVATARS
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join (__dirname, '../public/img/users_avatars'));
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + "_"+ file.originalname);
    }
});

const uploadUserFile = multer({ storage});


router.get('/login', controller.login);

// CREAR USUARIOS
router.get('/register', controller.register);
router.post('/register', uploadUserFile.single('avatar'), controller.processRegister);


module.exports = router;