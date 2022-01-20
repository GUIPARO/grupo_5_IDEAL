const express= require('express');
const path = require('path');
const app = express();
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const cookieParser = require('cookie-parser');
const session = require('express-session')
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')// requerir middleware de aplicación




// ************ Middlewares ********************//
app.use(cookieParser());
app.use(session({secret : 'secreto',
resave: false,
saveUninitialized:false}))
app.use(methodOverride('_method'));// Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'./public')))// Indica a express donde se encuentran los recursos estáticos
app.use(userLoggedMiddleware)


// ************ Template Engine ************//
app.set('view engine','ejs');// Indica a express el template engine que se va a utilizar
app.set('views', path.resolve(__dirname,"views"));// Indica a express donde está la carpeta views




// ************Rutas*******************//
const indexRoutes = require('./routes/index.routes');
const productsRoutes = require('./routes/products.routes');
const usersRoutes = require("./routes/users.routes.js");


app.use("/", indexRoutes)
app.use("/products", productsRoutes)
app.use("/users", usersRoutes)

module.exports = app;
