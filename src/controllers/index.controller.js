const path = require('path')


const controller ={
    index:(req,res) =>{
        res.render('index')
    },

    login:(req,res) =>{
    res.render('login')
    },
    
    register:(req,res) =>{
        res.render('register')
    },

    cotizacion:(req,res) =>{
        res.render('cotizacion')
    },
    
    product:(req,res) =>{
        res.render('product')
    },

    produtCart:(req,res) =>{
        res.render('productCart')
    }
}



module.exports = controller