const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const modelUser = require('../model/modelUsers')

//Aquí requiero a la función que trae los errores desde la ruta, de llegar a existir
const { validationResult } = require('express-validator');

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
            avatar:  req.file ? req.file.filename : '',
          }
  
            modelUser.create(userCreate)
  
            res.redirect('/users/login');

        }else {
          return res.render('./users/register', {errors: errors.mapped(),old: req.body});
        }
    },
    profile:(req,res) => {
      res.render('./users/profile')
      
    },
}

module.exports= controller;