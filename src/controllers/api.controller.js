const modelApi = require("../model/modelApi");
const path = require("path");

const controller = {
    users: async (req, res) => {
        let users = await modelApi.allUsers(req.protocol, req);
        return res.json(users);
    },
    
    oneUser: async (req, res) => {
        let user = await modelApi.oneUser(req.params, req.protocol, req);
        // let avatarRoute = path.join(
        //     __dirname,
        //     "../public/img/users_avatars/" + user.avatar
        //   );
        // user.avatar = avatarRoute;
        
        return res.json(user);
    },
    lastUser: async (req, res) => {
        try{
            let data = await modelApi.lastUser(req.protocol, req)
            console.log(data)
            return res.json (data[0])

        }catch(error){console.log(error)}
        
    },

    products: async (req, res) => {
        let listProducts = await modelApi.allProducts(req.protocol, req);
        // let ultimo = listProducts.listProducts[listProducts.listProducts.length-1];
        // let api1 = await modelApi.oneProduct(ultimo.dataValues.product_id);
        // console.log(ultimo.dataValues.product_id);
        // console.log(listProducts.listProducts)


        return res.json(listProducts);
    },

  

    oneProduct: async (req, res) => {
        let product = await modelApi.oneProduct(req.params, req.protocol, req);
        

        return res.json(product);
    },

    lastProduct: async (req, res) => {
        try{
            let data = await modelApi.lastProduct(req.protocol, req)
            console.log(data)
            return res.json(data[0])

        }catch(error){console.log(error)}
        
    }
}  

module.exports = controller;