const {
    activities,
    materials,
    products,
    lines,
    subactivities,
    techniques,
    users
  } = require("../database/models");


const controller = {
    allUsers: async () => {
        const user = await users.findAll({
            attributes : ["user_id", "name", "lastname", "email"]
        })

        return user;
    },

    oneUser: async (parametros) => {
        const id = parametros.id;
        const user = await users.findByPk(id, {
            attributes : ["user_id", "name", "lastname", "email", "avatar"]
        })
        
        return user;
    }
}

module.exports = controller;