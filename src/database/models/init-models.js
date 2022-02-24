var DataTypes = require("sequelize").DataTypes;
var _activities = require("./activities");
var _lines = require("./lines");
var _materials = require("./materials");
var _products = require("./products");
var _products_activities = require("./products_activities");
var _products_materials = require("./products_materials");
var _products_subactivities = require("./products_subactivities");
var _products_techniques = require("./products_techniques");
var _roles = require("./roles");
var _subactivities = require("./subactivities");
var _techniques = require("./techniques");
var _users = require("./users");

function initModels(sequelize) {
  var activities = _activities(sequelize, DataTypes);
  var lines = _lines(sequelize, DataTypes);
  var materials = _materials(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var products_activities = _products_activities(sequelize, DataTypes);
  var products_materials = _products_materials(sequelize, DataTypes);
  var products_subactivities = _products_subactivities(sequelize, DataTypes);
  var products_techniques = _products_techniques(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var subactivities = _subactivities(sequelize, DataTypes);
  var techniques = _techniques(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  activities.belongsToMany(products, { as: 'product_id_products', through: products_activities, foreignKey: "activity_id", otherKey: "product_id" });
  materials.belongsToMany(products, { as: 'product_id_products_products_materials', through: products_materials, foreignKey: "material_id", otherKey: "product_id" });
  products.belongsToMany(activities, { as: 'activity_id_activities', through: products_activities, foreignKey: "product_id", otherKey: "activity_id" });
  products.belongsToMany(materials, { as: 'material_id_materials', through: products_materials, foreignKey: "product_id", otherKey: "material_id" });
  products.belongsToMany(subactivities, { as: 'subactivity_id_subactivities', through: products_subactivities, foreignKey: "product_id", otherKey: "subactivity_id" });
  products.belongsToMany(techniques, { as: 'technique_id_techniques', through: products_techniques, foreignKey: "product_id", otherKey: "technique_id" });
  subactivities.belongsToMany(products, { as: 'product_id_products_products_subactivities', through: products_subactivities, foreignKey: "subactivity_id", otherKey: "product_id" });
  techniques.belongsToMany(products, { as: 'product_id_products_products_techniques', through: products_techniques, foreignKey: "technique_id", otherKey: "product_id" });
  products_activities.belongsTo(activities, { as: "activity", foreignKey: "activity_id"});
  activities.hasMany(products_activities, { as: "products_activities", foreignKey: "activity_id"});
  products.belongsTo(lines, { as: "line", foreignKey: "line_id"});
  lines.hasMany(products, { as: "products", foreignKey: "line_id"});
  products_materials.belongsTo(materials, { as: "material", foreignKey: "material_id"});
  materials.hasMany(products_materials, { as: "products_materials", foreignKey: "material_id"});
  products_activities.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(products_activities, { as: "products_activities", foreignKey: "product_id"});
  products_materials.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(products_materials, { as: "products_materials", foreignKey: "product_id"});
  products_subactivities.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(products_subactivities, { as: "products_subactivities", foreignKey: "product_id"});
  products_techniques.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(products_techniques, { as: "products_techniques", foreignKey: "product_id"});
  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});
  products_subactivities.belongsTo(subactivities, { as: "subactivity", foreignKey: "subactivity_id"});
  subactivities.hasMany(products_subactivities, { as: "products_subactivities", foreignKey: "subactivity_id"});
  products_techniques.belongsTo(techniques, { as: "technique", foreignKey: "technique_id"});
  techniques.hasMany(products_techniques, { as: "products_techniques", foreignKey: "technique_id"});

  return {
    activities,
    lines,
    materials,
    products,
    products_activities,
    products_materials,
    products_subactivities,
    products_techniques,
    roles,
    subactivities,
    techniques,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
