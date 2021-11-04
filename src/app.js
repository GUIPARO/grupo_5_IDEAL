const express= require('express')
const path = require('path')
const app = express()
const routes = require('./routes/index.routes')
const port = process.env.PORT || 3000

// Indica a express donde está la carpeta views
app.set('views',path.resolve(__dirname,'views'))

// Indica a express donde se encuentran los recursos estáticos
app.use(express.static(path.resolve(__dirname,'../public')))

// Indica a express el template engine que se va a utilizar
app.set('view engine','ejs');

// Rutas
app.use('/', routes)


// Servidor funcionando
app.listen(port,()=>{ console.log('El server esta corriendo en el puerto 3000')
})