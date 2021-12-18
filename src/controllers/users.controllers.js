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
        
        return res.redirect('/users/profile');  

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
    }


}

module.exports= controller;