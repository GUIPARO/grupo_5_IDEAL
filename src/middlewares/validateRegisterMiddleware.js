const fs = require('fs');
const path = require('path');
const { body } = require('express-validator');//Requiero el paquete expres-validator
  

module.exports = [
    //Aquí incoporé otras validaciones, para que las tengan de guía para sus proyectos  
    body('name').isLength({min: 2}).withMessage('El campo nombre no puede estar vacío'),
    body('lastName').isLength({min: 2}).withMessage('El campo apellido no puede estar vacío'),
    body('email').isEmail().withMessage('Agregar un email válido'),
    //Aquí valido el Password   
    body('password').isLength({min: 8 }).withMessage('La contraseña debe tener al menos 8 caractéres'),
    //Aquí valido la confimación del password dispuesto por el usuario
    body('confirm_password').isLength({min: 8 }).withMessage('La confirmación de la contraseña debe tener al menos 8 caractéres'),
    //Aquí valido si las contraseñas son iguales o no
    body('confirm_password').custom((value, {req}) =>{
      if(req.body.password == value ){
        return true    // Si yo retorno un true  no se muestra el error     
      }else{
        return false   // Si retorno un false si se muestra el error
      }    
      }).withMessage('Las contraseñas no coinciden'),

      //Aquí obligo a que el usuario seleccione su avatar
    body('avatar').custom((value, {req}) =>{
      let file = req.file;
      let acceptedExtensions = [".jpg",".jpeg", ".png", ".gif"];
      
    if(!file){
     throw new Error ('Tienes que subir una imagen')
    }else {
      let fileExtensions = path.extname(file.originalname)
      if(!acceptedExtensions.includes(fileExtensions)){
        throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
    }
    }
    
    return true;
    })
    
]
