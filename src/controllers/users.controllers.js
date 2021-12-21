const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const modelUser = require('../model/modelUsers')
const { validationResult } = require('express-validator'); //Aquí requiero a la función que trae los errores desde la ruta, de llegar a existir

const controller ={
    
    login:(req,res) =>{
        res.render("./users/login");
    },
    
    register:(req,res) =>{
        res.render('./users/register');
    }, 
//PROCESAMIENTO DE REGISTRO DE USUARIO
    processRegister: (req, res) => {
        let errors = validationResult(req);
        let userInDB = modelUser.findbyField('email', req.body.email)
  
        if(userInDB){
          return res.render('./users/register',{
            errors: {
              email: {
                msg: 'Este email esta registrado'
              }
            },
            old: req.body
          })
        }
  
        if (errors.isEmpty()) {
  
          let userCreate ={
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            confirm_password: bcrypt.hashSync(req.body.confirm_password, 10),
            avatar:  req.file ? req.file.filename : '',
            role : 1 
          }
  
            modelUser.create(userCreate)
  
            res.redirect('/users/login');

        }else {
          return res.render('./users/register', {errors: errors.mapped(),old: req.body});
        }
    },
//PROCESAMIENTO DE LOGIN DE USUARIO
    processLogin: (req,res) =>{
      let errors = validationResult(req);

      if(errors.isEmpty()){
        let usersDB = modelUser.findAll()
        let userLog = usersDB.find(usuario => usuario.email == req.body.email)
        
        //Como podemos modificar nuestros req.body
        delete userLog.password;
        delete userLog.confirm_password;
        
        //Guardar del lado del servidor (Guardar al usuario en sesion)
        req.session.userLogged = userLog;  
        console.log(req.session.userLogged)

        //Aquí voy a guardar las cookies del usuario que se loguea
        if(req.body.remember){
          res.cookie('userEmail',req.body.email,{ maxAge: (1000 * 60) * 60 })
        }
        return res.redirect('/');  

        }else{
        //Devolver a la vista los errores
        res.render(path.resolve(__dirname, '../views/users/login'),{errors:errors.mapped(),old:req.body});        
      }
    },
    profile:(req,res) => {
      res.render('./users/profile',{
        user: req.session.userLogged
      })
      
    },
    logout:(req,res)=>{
      res.clearCookie('userEmail');//Eliminar la cookie
		  req.session.destroy();
		  return res.redirect('/');
    }, 
    showUser: (req,res) =>{
      const id = req.params.id;
      let usersDB = modelUser.findAll()
      const user = usersDB.filter(user =>{
      return user.id == id
      })

      res.render("./users/profile", { user });
   },
    admin: (req, res) => {
      let usersDB = modelUser.findAll()
      res.render('./users/admin' , {users: usersDB});
    },
    userEdit:(req,res)=>{
      let usersDB = modelUser.findAll()
      const id = req.params.id;

      const userEdit = usersDB.filter(user => {
        return user.id == id;
      })

      const indice = usersDB.findIndex(user => {
        return user == userEdit[0];
      })

      if (indice >= 0) {
        res.render('./users/userEdit', { userEdit })
      }else{
        res.send('No insista')
      }

    },
    userModified: (req, res) => {
      const id = parseInt(req.params.id)
      const edit = req.body;
      let usersDB = modelUser.findAll()
      
      const userEdit = usersDB.filter(user => {
        return user.id == id;
      })

      const indice = usersDB.findIndex(user => {
        return user == userEdit[0];
      })

      const avatarFile = req.file == undefined ? userEdit[0].avatar : req.file.filename;

      if (req.file != undefined) {
          let routeImage = path.resolve(__dirname, "../public/img/users_avatars/" + userEdit[0].avatar);
          fs.unlinkSync(routeImage);
      }
      
      usersDB[indice] = {
          id: id,
          ...edit,
          password: bcrypt.hashSync(req.body.password, 10),
          confirm_password: bcrypt.hashSync(req.body.confirm_password, 10),
          avatar: avatarFile,
          role : parseInt(req.body.role)
      }

    modelUser.writeInDatabase(usersDB)
    res.redirect('/');

    },
    userDelete:(req,res) => {
        const id = req.params.id;  
        let usersDB = modelUser.findAll()
        const user = usersDB.filter(user =>{
          return user.id == id
        })
        const userEdit = usersDB.filter(user => {
          return user.id == id;
        });

       
    
        let image = path.join(__dirname, "../public/img/users_avatars/" + userEdit[0].avatar);
        fs.unlinkSync(image);

        const data = usersDB.filter(user =>{
          return user.id != id
        });

        modelUser.writeInDatabase(data)

      res.redirect('/users/admin');
  }


}

module.exports= controller;