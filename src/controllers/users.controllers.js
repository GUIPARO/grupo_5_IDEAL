const path = require('path')


const controller ={
    
    login:(req,res) =>{
    res.render(path.resolver (__dirname, '../views/users/login'))
    },
    
    register:(req,res) =>{
        res.render('/users/register')
    },
   
}

module.exports= controller;