const express= require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname,'../public')))

app.get('/',(req,res) =>{
    res.sendFile(path.resolve(__dirname,"./views/index.html"))
})

app.get('/login',(req,res) =>{
    res.sendFile(path.resolve(__dirname,"./views/login.html"))
})

app.get('/register',(req,res) =>{
    res.sendFile(path.resolve(__dirname,"./views/register.html"))
})

app.get('/cotizacion',(req,res) =>{
    res.sendFile(path.resolve(__dirname,"./views/cotizacion.html"))
})

app.get('/product',(req,res) =>{
    res.sendFile(path.resolve(__dirname,"./views/product.html"))
})

app.get('/productCart',(req,res) =>{
    res.sendFile(path.resolve(__dirname,"./views/productCart.html"))
})

app.listen(port,()=>{ console.log('El server esta corriendo en el puerto 3000')
})