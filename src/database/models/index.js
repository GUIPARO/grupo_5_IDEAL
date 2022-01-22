

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const initModel = require("./init-models")

// const data = {
//   production:{
//   username : `${process.env.DBUSER}`,
//   password : `${process.env.DBPASS}`,
//   database : `${process.env.DBNAME}`,
//   host : `${process.env.DBHOST}`,
//   dialect: "mysql"
// },
//   development:{
//   username: "root",
//   password: 1234,
//   database: "Ideal_DB",
//   host: "127.0.0.1",
//   dialect: "mysql",
//   port: 3307
// }
// }[env]

// const config = JSON.stringify(data, null, 4)

let db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db = initModel(sequelize)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
