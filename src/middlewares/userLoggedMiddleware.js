const modelUser = require('../model/modelUsers')

async function userLoggedMiddleware(req,res,next){
    res.locals.islogged = false;

    let emailInCookie = req.cookies.userEmail;

    let userCookie = await modelUser.findbyField('email', emailInCookie)
    
    // console.log(emailInCookie)
    // console.log(userCookie)
    if(userCookie){
       req.session.userLogged = userCookie
    }


    if(req.session && req.session.userLogged){
    res.locals.islogged = true;
    res.locals.userLogged = req.session.userLogged
    
    }

     
     next()
    }

module.exports = userLoggedMiddleware