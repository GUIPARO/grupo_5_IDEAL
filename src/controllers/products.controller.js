const path = require('path')


const controller ={
        
    cotizacion:(req,res) =>{
        res.render('./products/cotizacion')
    },
    
    product:(req,res) =>{
        res.render('./products/product')
    },

    produtCart:(req,res) =>{
        res.render('./products/productCart')
    },
    admin:(req,res) =>{
        res.render('./products/admin')
    }
}

module.exports = controller;