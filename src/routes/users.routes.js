const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const { body } = require('express-validator');//Requiero el paquete expres-validator
//*---------CONTROLADOR--------------*//
const usersController = require('../controllers/users.controllers.js')//Requerir el modulo de los controladores

//*---------VALIDACIONES--------------*//
const validationsRegister = require('../middlewares/validateRegisterMiddleware'); //Requerir el modulo de las validaciones del register
const validationsLogin = require('../middlewares/validateLoginMiddleware'); //Requerir el modulo de las validaciones del Login

const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')


//*---------CONFIGURACION ALMACENAMIENTO USERS AVATARS--------------*//
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join (__dirname, '../public/img/users_avatars'));
    },
    filename: function (req, file, cb){
        cb(null,'foto' + '-' + Date.now() + "_"+ file.originalname);
    }
});

const uploadUserFile = multer({ storage});


//*---------RUTAS--------------*//

//loguear usuarios
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validationsLogin,usersController.processLogin);

// CREAR USUARIOS
router.get('/register',guestMiddleware, usersController.register);
router.post('/register', uploadUserFile.single('avatar'),validationsRegister,usersController.processRegister);

// PERFIL DE USUARIOS
router.get('/profile',authMiddleware,usersController.profile)


//Cerrar sesion 
router.get('/logout/', usersController.logout)





module.exports = router;