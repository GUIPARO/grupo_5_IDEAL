const express= require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname,'./src/public')))

app.get('/',(req,res) =>{
    res.sendFile(path.resolve(__dirname,"./src/views/index.html"))
})

app.get('/login',(req,res) =>{
    res.sendFile(path.resolve(__dirname,"./src/views/login.html"))
})

app.listen(port,()=>{ console.log('El server esta corriendo en el puerto 3000')
})