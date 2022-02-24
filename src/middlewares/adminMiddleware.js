/**
 * Middleware de control de acceso a rutas que son para uso específico de usuarios tipo "administrador".
 */

 module.exports = function(req, res, next){
    if(req.session.userLogged != undefined && req.session.userLogged.role.role == 5 ){
        next();
    }else{
        res.redirect("/");
    }
    
}