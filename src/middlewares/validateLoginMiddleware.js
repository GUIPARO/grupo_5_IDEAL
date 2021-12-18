const path = require('path');
const bcrypt = require('bcryptjs');//Requiero el paquete para comparar las contraseñas  que tengo hash (Pueden instalar el paquete bcrypt o bcryptjs)
const { body } = require('express-validator');
const fs = require('fs');
const modelUser = require('../model/modelUsers')

//Aquí aperturo mi archivo de usuarios, ya que al registrarse un usuario es conveniente buscar que no exista una ya registrado con el mismo email o id o el campo que utlicen para identificar al usuario.

//Aquí ejecuto mis validaciones
module.exports= [
    body('email').isEmail().withMessage('Agregar un email válido'),
    body('password').isLength({min: 8 }).withMessage('La contraseña debe tener un mínimo de 8 caractéres'),
    body('email').custom( (value) =>{
      for (let i = 0; i < modelUser.findAll().length; i++) {
          if (modelUser.findAll()[i].email == value) {
              return true    
          }
      }
      return false
    }).withMessage('Usuario no se encuentra registrado...'),
  
    //Aquí valido si la contraseña colocada es la misma a la que tenemos hasheada
    body('password').custom( (value, {req}) =>{
        for (let i = 0; i < modelUser.findAll().length; i++) {
            if (modelUser.findAll()[i].email == req.body.email) {
                if(bcrypt.compareSync(value, modelUser.findAll()[i].password)){
                  return true;
                }else{
                  return false;
                }
            }
        }
        
    }).withMessage('Usuario o contraseña no coinciden')
]  