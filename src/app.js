const express= require('express')
const path = require('path')
const app = express()
const routes = require('./routes/index.routes')
const port = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname,'../public')))

app.use('/', routes)

app.listen(port,()=>{ console.log('El server esta corriendo en el puerto 3000')
})