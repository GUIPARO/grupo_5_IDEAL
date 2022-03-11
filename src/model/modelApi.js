const { Op, fn, col } = require('sequelize');
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
    allUsers: async (protocol, req) => {
        const user = await users.findAll({
            attributes : {
                exclude: [ "password", "user_id", "role_id"],
                include: [[fn('concat', `${protocol}://${req.get('host')}/api/users/`, col('user_id')), 'detail']]
            }
        })

        const totalCount = await users.findAll({
            attributes : [[sequelize.fn("COUNT", sequelize.col("user_id")), "totalUsers"]]
        })

        return {totalCount : totalCount[0].dataValues.totalUsers, users: user};
    },  

    oneUser: async (parametros, protocol, req) => {
        const id = parametros.id;
        const user = await users.findByPk(id, {
            attributes : {
                exclude: [ "password", "user_id", "role_id"],
                include: [[fn('concat', `${protocol}://${req.get('host')}/img/users_avatars/`, col('avatar')), 'url']]
            }
        })

        return user;
    },

    lastUser: async (protocol, req) => {
        try {
            let data = await users.findAll({
                limit: 1,
                
                attributes:{
                    exclude: [ "user_id", "role_id", "password"],
                    include: [[fn('concat', `${protocol}://${req.get('host')}/img/users_avatars/`, col('avatar')), 'url']]
                },
                order: [["user_id", "DESC"]]
                

            } )
            return data;

        } catch(error){
            
            console.log (error)
        }
    },
    allProducts: async (protocol, req) => {
        try {
            const totalCount = await products.findAll({
                attributes : {
                    exclude: [ "product_id"],
                    include: [[sequelize.fn("COUNT", sequelize.col("product_id")), "totalProducts"],[fn('concat', `${protocol}://${req.get('host')}/api/products/`, col('product_id')), 'detail']]
                }    
            })

            console.log(totalCount)
    
            const totalCategories = await products.findAll({
                include : ["line"],
                attributes : [[sequelize.fn("COUNT", sequelize.col("line")), "countByCategory"]],
                group : "line" 
            })
            
            const listProducts = await products.findAll({
                include: ["line"],
                attributes : {
                    exclude: [ "product_id"],
                    include: [[fn('concat', `${protocol}://${req.get('host')}/api/products/`, col('product_id')), 'detail']]
                }    
            })
            
            // const ultimo = listProducts[ totalCount[0].dataValues.totalProducts-1];
            // const lastProduct = await products.findByPk(ultimo.dataValues.product_id)
            // console.log(ultimo)
            let lines = totalCategories.map(line => {
                return {
                    line : line.line.line,
                    totalLine : line.dataValues.countByCategory
                }
            })

            return {totalcount : totalCount[0].dataValues.totalProducts, lines, listProducts, totalLines : lines.length}

        } catch (error) {
            console.log(error);
        }
    },

    oneProduct: async (parametros, protocol, req) => {

        let camps = await products.findByPk(parametros.id, {
            include : ["line"],
            attributes : {
                exclude: [ "product_id"],
                include: [[fn('concat', `${protocol}://${req.get('host')}/img/products_image/`, col('image')), 'url']]
            }
         
        })

        return {camps}
    },
    lastProduct: async (protocol, req) => {
        try {
            let data = await products.findAll({
                limit: 1,
                include: ["line"],
                attributes:{
                    exclude: [ "product_id"],
                    include: [[fn('concat', `${protocol}://${req.get('host')}/img/products_image/`, col('image')), 'url']]
                },
                order: [["product_id", "DESC"]]
                

            } )
            return data;

        } catch(error){
            
            console.log (error)
        }
    }
}

module.exports = controller;