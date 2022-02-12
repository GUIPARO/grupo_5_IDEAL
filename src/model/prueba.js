const db = require("../database/models")
const sequelize = db.sequelize
const userModel = {
    getAll: async ()=>{
        try {
            const result = await db.users.findAll()
        console.log(result)
        } catch (error) {
            console.log(`ocurrio un error ${error.message}`)
        }
        
    }
}

  
