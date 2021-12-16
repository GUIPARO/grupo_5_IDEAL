const fs= require ('fs');
const path = require ('path');

const User= {

    getData: function(){
        let datos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/bdUsers.json"), "utf-8"));
		return datos;
    },

    findAll: function(){
        return this.getData();
    },

    newId: function () {
		let allUsers = this.findAll();
		let ultimo = 0
		allUsers.forEach(user =>{
			if(user.id >ultimo){
				ultimo = user.id
			}
		})
		return ultimo + 1
    },

    findbyid: function(id){
		let allUsers = this.findAll()
		let userFind = allUsers.filter(user => { 
			return user.id === id
		})
	},

    findbyField : function(field, text){
		let allUsers = this.findAll()
		let userFind = allUsers.find(user => user[field] === text)
		return userFind
	},
    create:function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.newId(),
            ...userData
        }

        allUsers.push(newUser);
        let userJSON= JSON.stringify (allUsers, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../database/bdUsers.json'),
        userJSON )
        return newUser;
    }
}



module.exports = User;