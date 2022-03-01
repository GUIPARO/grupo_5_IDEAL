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
        console.log(user)
        
        return res.json(user);
    }
}  

module.exports = controller;