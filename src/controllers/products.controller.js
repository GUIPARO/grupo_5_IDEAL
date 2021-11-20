const path = require('path')


const controller ={
        
    cotizacion:(req,res) =>{
        res.render('./products/cotizacion')
    },
    
    product:(req,res) =>{
        res.render('./products/product')
    },
    products:(req,res) =>{
        res.render('./products/productsList')
    },

    produtCart:(req,res) =>{
        res.render('./products/productCart')
    },

    admin:(req,res) =>{
        res.render('./products/admin')
    
    },
    adminCreate:(req,res) =>{
        res.render('./products/adminCreate')
    },

    adminEdit:(req,res) =>{
        res.render('./products/adminEdit')
    }

}

module.exports = controller;