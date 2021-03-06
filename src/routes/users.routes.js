const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')


//*---------CONTROLADOR--------------*//
const usersController = require('../controllers/users.controllers.js')//Requerir el modulo de los controladores

//*---------VALIDACIONES--------------*//
const validationsRegister = require('../middlewares/validateRegisterMiddleware'); //Requerir el modulo de las validaciones del register
const validationsLogin = require('../middlewares/validateLoginMiddleware'); //Requerir el modulo de las validaciones del Login
const validationsUserToEdit = require('../middlewares/validateUserEditMiddleware')

const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

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
router.get('/target', usersController.target)
// guestMiddleware
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validationsLogin,usersController.processLogin);

// CREAR USUARIOS
// guestMiddleware
router.get('/register',guestMiddleware, usersController.register);
router.post('/register',  uploadUserFile.single('avatar'), validationsRegister, usersController.processRegister);

// PERFIL DE USUARIOS
router.get('/profile/:id', usersController.showUser);
router.get('/profile',authMiddleware,usersController.profile)


//Cerrar sesion 
router.get('/logout/', usersController.logout)

//Administrador de usuarios
router.get('/admin',adminMiddleware,usersController.admin);

//Editar usuario
router.get('/userEdit/:id',usersController.adminEdit);
router.put('/userEdit/:id', uploadUserFile.single("avatar"), validationsUserToEdit, usersController.userModified);

//Eliminar usuario
router.delete ('/delete/:id', usersController.userDelete)

module.exports = router;