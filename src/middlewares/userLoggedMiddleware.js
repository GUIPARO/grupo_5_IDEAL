const modelUser = require('../model/modelUsers')

function userLoggedMiddleware(req,res,next){
    res.locals.islogged = false;

    let emailInCookie = req.cookies.userEmail;

    let userCookie = modelUser.findbyField('email', emailInCookie)

    if(userCookie){
       req.session.userLogged = userCookie
    }


    if(req.session && req.session.userLogged)
    res.locals.islogged = true;
    res.locals.userLogged = req.session.userLogged
 

     
     next()
    }

module.exports = userLoggedMiddleware