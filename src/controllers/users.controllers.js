const path = require('path')
const modelUser = require('../model/modelUsers')

const controller ={
    
    login:(req,res) =>{
        res.render("./users/login");
    },
    
    register:(req,res) =>{
        res.render('./users/register');
    }, 
   

   //PROCESAMIENTO DE REGISTRO DE USUARIO
    processRegister: (req, res) => {
   
    // let createUser = {
     //   ...req.body 
   // }
    modelUser.create(req.body );
    res.redirect ("./users/login");

    
}
    

    }

module.exports= controller;