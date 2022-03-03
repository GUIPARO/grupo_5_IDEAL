const modelApi = require("../model/modelApi");
const path = require("path");

const controller = {
    users: async (req, res) => {
        let users = await modelApi.allUsers();
        return res.json(users);
    },
    
    oneUser: async (req, res) => {
        let user = await modelApi.oneUser(req.params);
        let avatarRoute = path.join(
            __dirname,
            "../public/img/users_avatars/" + user.avatar
          );
        user.avatar = avatarRoute;
        
        return res.json(user);
    },
    
    products: async (req, res) => {
        let listProducts = await modelApi.allProducts();
        


        return res.json(listProducts);
    },

    oneProduct: async (req, res) => {
        let product = await modelApi.oneProduct(req.params);
        let avatarRoute = path.join(
            __dirname,
            "../public/img/products_image/" + product.camps.image
        );
        product.image = avatarRoute;

        return res.json(product);
    }
}  

module.exports = controller;