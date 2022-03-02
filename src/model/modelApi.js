
const {
    activities,
    materials,
    products,
    lines,
    subactivities,
    techniques,
    users,
    sequelize
  } = require("../database/models");

const controller = {
    allUsers: async () => {
        const user = await users.findAll({
            attributes : ["user_id", "name", "lastname", "email"]
        })

        const totalCount = await users.findAll({
            attributes : [[sequelize.fn("COUNT", sequelize.col("user_id")), "totalUsers"]]
        })

        return {totalCount : totalCount[0], users: user};
    },  

    oneUser: async (parametros) => {
        const id = parametros.id;
        const user = await users.findByPk(id, {
            attributes : ["user_id", "name", "lastname", "email", "avatar"]
        })

        return user;
    },

    allProducts: async () => {
        try {
            const totalCount = await products.findAll({
                attributes : [[sequelize.fn("COUNT", sequelize.col("product_id")), "totalProducts"]]
            })
    
            const totalCategories = await products.findAll({
                include : ["line"],
                attributes : [[sequelize.fn("COUNT", sequelize.col("line")), "countByCategory"]],
                group : "line" 
            })

            const listProducts = await products.findAll({
                include: ["line"],
                attributes : ["product_id", "fullname"]
            })

            return {totalcount : totalCount[0], totalCategories, listProducts}

        } catch (error) {
            console.log(error);
        }
    },

    oneProduct: async (parametros) => {

        let camps = await products.findByPk(parametros.id, {
            include : ["line"]
        })

        return {camps}
    }
}

module.exports = controller;