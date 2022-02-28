const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { users, roles } = require("../database/models");
const { Console } = require("console");

const User = {
  findAll: async function () {
    try {
      const allUsers = await users.findAll({
        include: ["role"],
      });

      return allUsers;
    } catch (error) {
      console.log(`ocurrio un error ${error.message}`);
    }
  },
  findUserById: async function (parametros) {
    try {
      const user = await users.findByPk(parametros.id, {
        include: ["role"],
      });

      return user;
    } catch (error) {
      console.log(`ocurrio un error ${error.message}`);
    }
  },

  findbyField: async function (field, text) {
    let allUsers = await this.findAll();
    let userFind = await allUsers.find((user) => user[field] === text);
    
    // console.log(userFind.email);
    return userFind;
  },
  create: async function (body, image, errors) {
    try {
      let userInDB = await this.findbyField("email", body.email);

      let userCreate = {
        name: body.name,
        lastname: body.lastName,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        avatar: image.filename,
        role_id: 1,
      };

      // console.log(userInDB);
      if (userInDB && userInDB != "undefined") {
        return 1;
      } else if (errors.isEmpty()) {
        return await users.create(userCreate);
      }

    } catch (error) {
      console.log(`ocurrio un error ${error.message}`);
    }
  },
  adminEdit: async function (parametros) {
    try {
      const userEdit = this.findUserById(parametros);
      const findrole = roles.findAll();

      const AllPromise = [
        userEdit,
        findrole
      ];

      const result = await Promise.all(AllPromise);

      return result;
    } catch (error) {
      console.log(`ocurrio un error ${error.message}`);
    }
  },
  adminModified: async function (parametros, body, image) {
    try {
      
      let foundUser = await this.findUserById(parametros);
     
      const avatarFile = image == undefined ? foundUser.avatar : image.filename;
      const password = body.password == ""? foundUser.password : bcrypt.hashSync(body.password, 10);

      const userEdit = {
        name: body.name,
        lastname:body.lastName,
        password: password,
        email:body.email,
        avatar: avatarFile,
        role_id: body.role
      };

      console.log(userEdit)


      if (image != undefined){
        let routeImage = path.resolve(
          __dirname,
          "../public/img/users_avatars/" + foundUser.avatar
        );
        fs.unlinkSync(routeImage);

        console.log(routeImage)
      }

      const user = await foundUser.update(userEdit, {
        where: {
          user_id: parametros.id
        }
      });

      
      
    } catch (error) {
      console.log(`ocurrio un error ${error.message}`);
    }
    },
    adminDelete: async function (parametros) {
      try {
        const foundUser = await this.findUserById(parametros);
  
        let rutaImage = path.resolve(
          __dirname,
          "../public/img/users_avatars/" + foundUser.avatar
        );
        fs.unlinkSync(rutaImage);
  
        await foundUser.destroy();
      } catch (error) {
        console.log(`ocurrio un error ${error.message}`);
      }
    },
};

// User.findAll();
// User.findbyField("email", "pru@gmail.com")


module.exports = User;
