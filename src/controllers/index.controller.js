const path = require('path')


const controller ={
    index:(req,res) =>{
        res.sendFile(path.resolve(__dirname,"../views/index.html"))
    },

    login:(req,res) =>{
    res.sendFile(path.resolve(__dirname,"../views/login.html"))
    },

    register: (req,res) =>{
        res.sendFile(path.resolve(__dirname,"../views/register.html"))
    },

    cotizacion: (req,res) =>{
        res.sendFile(path.resolve(__dirname,"../views/cotizacion.html"))
    },
    
    product:(req,res) =>{
        res.sendFile(path.resolve(__dirname,"../views/product.html"))
    },

    produtCart:(req,res) =>{
        res.sendFile(path.resolve(__dirname,"../views/productCart.html"))
    }
}



module.exports = controller