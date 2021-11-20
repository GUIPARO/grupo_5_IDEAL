const express= require('express');
const path = require('path');
const app = express();
const indexRoutes = require('./routes/index.routes');
const productsRoutes = require('./routes/products.routes');
const usersRoutes = require("./routes/users.routes.js");
const port = process.env.PORT || 3000;

// Indica a express donde está la carpeta views
app.set('views', path.resolve(__dirname,"views"));


// Indica a express donde se encuentran los recursos estáticos
app.use(express.static(path.resolve(__dirname,'../public')))

// Indica a express el template engine que se va a utilizar
app.set('view engine','ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Rutas
app.use("/", indexRoutes)
app.use("/products", productsRoutes)
app.use("/users", usersRoutes)


// Servidor funcionando
app.listen(port,()=>{ console.log('El server esta corriendo en el puerto 3000')
});