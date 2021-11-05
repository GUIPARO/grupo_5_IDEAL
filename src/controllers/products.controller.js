const path = require('path')


const controller ={
        
    cotizacion:(req,res) =>{
        res.render('cotizacion')
    },
    
    product:(req,res) =>{
        res.render('product')
    },

    produtCart:(req,res) =>{
        res.render('productCart')
    },
    admin:(req,res) =>{
        res.render('admin')
    }
}

module.exports = controller;