const fs= require ('fs');
const path = require ('path');

const User= {
    filename: './database/bdUsers.json',
    
    
    getData: function(){
        let data= JSON.parse(fs.readFileSync(path.resolve (__dirname, this.filename),'utf-8'))
        return data;
       
    },

   
    
    findAll: function(){
        return this.getData;
    },

    //aqui falta el ID

    create:function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            //id: this.newId(),
            ...userData
        }
        allUsers.push(newUser);
        let userJSON= JSON.stringify (allUsers, null, 2);
        fs.writeFileSync(path.resolver(__dirname, './database/bdUsers.json'),
        userJSON )
        return newUser;
    }


}


module.exports = User;