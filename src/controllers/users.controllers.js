const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const modelUser = require("../model/modelUsers");
const { validationResult } = require("express-validator"); //Aquí requiero a la función que trae los errores desde la ruta, de llegar a existir

const controller = {
  target: (req,res)=>{
    res.render("./users/target")
  },
  login: (req, res) => {
    res.render("./users/login");
  },

  register: (req, res) => {
    res.render("./users/register");
  },
  //PROCESAMIENTO DE REGISTRO DE USUARIO
  processRegister: async (req, res) => {
    const createUser = await modelUser.create(
      req.body,
      req.file,
      validationResult(req)
    );
    // console.log(createUser);
    if (createUser == 1) {
      return res.render("./users/register", {
        errors: {
          email: {
            msg: "Este email esta registrado",
          },
        },
        old: req.body,
      });
    }

    let errors = validationResult(req);

    if (errors.isEmpty()) {
      res.redirect("/users/login");
    } else {
      res.render("./users/register", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  //PROCESAMIENTO DE LOGIN DE USUARIO
  processLogin: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (errors.isEmpty() == false) {
        return res.render("../views/users/login", {
          errors: errors.mapped(),
          oldData: req.body,
        });
      } else {
        let usersDB = await modelUser.findAll();

        let userLogged = usersDB.filter((user) => {
          return (
            user.email == req.body.email &&
            bcrypt.compareSync(req.body.password, user.password)
          );
        });

        // console.log( userLogged)

        if (userLogged == "") {
          res.render(path.resolve(__dirname, "../views/users/login"), {
            errors: { msg: "Credenciales invalidas" },
            old: req.body,
          });
        } else {
          let userLog = await usersDB.find(
            (usuario) => usuario.email == req.body.email
          );

          //Guardar del lado del servidor (Guardar al usuario en sesion)
          if (userLog != "undefined") {
            //Como podemos modificar nuestros req.body
            delete userLog.password;
            delete userLog.confirm_password;
            req.session.userLogged = userLog;
          }
          //Aquí voy a guardar las cookies del usuario que se loguea
          if (req.body.remember) {
            res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });
          }
          return res.redirect("/");
        }
      }
    } catch (error) {
      console.log(`En el controlador de usuarios ocurrio un error ${error.message}`);
    }
  },
  profile: (req, res) => {
    res.render("./users/profile", {
      user: req.session.userLogged,
    });
  },
  logout: (req, res) => {
    res.clearCookie("userEmail"); //Eliminar la cookie
    req.session.destroy();
    return res.redirect("/");
  },
  showUser: async(req, res) => {
    let user = await modelUser.findUserById(req.params)
    res.render("./users/profile", { user });
  },
  admin: async (req, res) => {
    let usersDB = await modelUser.findAll();
    res.render("./users/admin", { users: usersDB });
  },
  adminEdit: async(req, res) => {
    
    const userEdit = await modelUser.adminEdit(req.params)
    // console.log(userEdit)

    

    if (userEdit) {
      res.render("./users/userEdit", { userEdit });
    } else {
      res.send("No insista");
    }
  },
  userModified1: (req, res) => {
    const id = parseInt(req.params.id);
    const edit = req.body;
    let usersDB = modelUser.findAll();

    const userEdit = usersDB.filter((user) => {
      return user.id == id;
    });

    const indice = usersDB.findIndex((user) => {
      return user == userEdit[0];
    });

    const avatarFile =
      req.file == undefined ? userEdit[0].avatar : req.file.filename;

    if (req.file != undefined) {
      let routeImage = path.resolve(
        __dirname,
        "../public/img/users_avatars/" + userEdit[0].avatar
      );
      fs.unlinkSync(routeImage);
    }

    usersDB[indice] = {
      id: id,
      ...edit,
      password: bcrypt.hashSync(req.body.password, 10),
      confirm_password: bcrypt.hashSync(req.body.confirm_password, 10),
      avatar: avatarFile,
      role: parseInt(req.body.role),
    };

    modelUser.writeInDatabase(usersDB);
    res.redirect("/");
  },
  userModified: async(req, res) => {
    
    let foundUser = await modelUser.findUserById(req.params)
    let id = foundUser.user_id
    // let role = foundUser.role.role
    // console.log("resultado", role)
    req.body.avatar = req.file == undefined ? foundUser.avatar : req.file.filename;
    
  
    let errors = validationResult(req)
    if(errors.isEmpty() == false){
      // console.log(req.body)
      return res.render("../views/users/userEdit", {
        errors: errors.mapped(),
        userEdit: req.body,
        id
        
      });
    }else{

    await modelUser.adminModified(req.params, req.body, req.file);

    let usersDB = await modelUser.findAll();
    let userLog = await usersDB.find((usuario) => usuario.email == req.body.email
    );

    delete userLog.password;
    delete userLog.confirm_password;
    req.session.userLogged = userLog;

    res.redirect("/");
  }
  },
  userDelete1: async(req, res) => {
    const id = req.params.id;
    let usersDB = await modelUser.findAll();
    const user = usersDB.filter((user) => {
      return user.id == id;
    });
    const userEdit = usersDB.filter((user) => {
      return user.id == id;
    });

    let image = path.join(
      __dirname,
      "../public/img/users_avatars/" + userEdit[0].avatar
    );
    fs.unlinkSync(image);

    const data = usersDB.filter((user) => {
      return user.id != id;
    });

    modelUser.writeInDatabase(data);

    res.redirect("/users/admin");
  },

  userDelete: async (req,res) => {
       await  modelUser.adminDelete(req.params)
        res.redirect('/users/admin');
    }
};

module.exports = controller;
