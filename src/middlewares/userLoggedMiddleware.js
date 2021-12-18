const modelUser = require('../model/modelUsers')

function userLoggedMiddleware(req,res,next){
     res.locals.islogged = false; 

   
     if(req.session && req.session.userLogged)
     res.locals.islogged = true;
     res.locals.userLogged = req.session.userLogged // pasar a las variables locals el usuario logueado y al ser un middleware de app estará disponible en todas las vistas

    


     
     next()
    }

module.exports = userLoggedMiddleware