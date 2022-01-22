var DataTypes = require("sequelize").DataTypes;
var _activities = require("./activities");
var _lines = require("./lines");
var _materials = require("./materials");
var _products = require("./products");
var _products_has_activities = require("./products_has_activities");
var _products_has_lines = require("./products_has_lines");
var _products_has_materials = require("./products_has_materials");
var _products_has_subactivities = require("./products_has_subactivities");
var _products_has_techniques = require("./products_has_techniques");
var _roles = require("./roles");
var _subactivities = require("./subactivities");
var _techniques = require("./techniques");
var _users = require("./users");

function initModels(sequelize) {
  var activities = _activities(sequelize, DataTypes);
  var lines = _lines(sequelize, DataTypes);
  var materials = _materials(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var products_has_activities = _products_has_activities(sequelize, DataTypes);
  var products_has_lines = _products_has_lines(sequelize, DataTypes);
  var products_has_materials = _products_has_materials(sequelize, DataTypes);
  var products_has_subactivities = _products_has_subactivities(sequelize, DataTypes);
  var products_has_techniques = _products_has_techniques(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var subactivities = _subactivities(sequelize, DataTypes);
  var techniques = _techniques(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  activities.belongsToMany(products, { as: 'products_product_id_products', through: products_has_activities, foreignKey: "activities_activity_id", otherKey: "products_product_id" });
  lines.belongsToMany(products, { as: 'products_product_id_products_products_has_lines', through: products_has_lines, foreignKey: "lines_lines_id", otherKey: "products_product_id" });
  materials.belongsToMany(products, { as: 'products_product_id_products_products_has_materials', through: products_has_materials, foreignKey: "materials_material_id", otherKey: "products_product_id" });
  products.belongsToMany(activities, { as: 'activities_activity_id_activities', through: products_has_activities, foreignKey: "products_product_id", otherKey: "activities_activity_id" });
  products.belongsToMany(lines, { as: 'lines_lines_id_lines', through: products_has_lines, foreignKey: "products_product_id", otherKey: "lines_lines_id" });
  products.belongsToMany(materials, { as: 'materials_material_id_materials', through: products_has_materials, foreignKey: "products_product_id", otherKey: "materials_material_id" });
  products.belongsToMany(subactivities, { as: 'subactivities_subactivity_id_subactivities', through: products_has_subactivities, foreignKey: "products_product_id", otherKey: "subactivities_subactivity_id" });
  products.belongsToMany(techniques, { as: 'techniques_technique_id_techniques', through: products_has_techniques, foreignKey: "products_product_id", otherKey: "techniques_technique_id" });
  subactivities.belongsToMany(products, { as: 'products_product_id_products_products_has_subactivities', through: products_has_subactivities, foreignKey: "subactivities_subactivity_id", otherKey: "products_product_id" });
  techniques.belongsToMany(products, { as: 'products_product_id_products_products_has_techniques', through: products_has_techniques, foreignKey: "techniques_technique_id", otherKey: "products_product_id" });
  products_has_activities.belongsTo(activities, { as: "activities_activity", foreignKey: "activities_activity_id"});
  activities.hasMany(products_has_activities, { as: "products_has_activities", foreignKey: "activities_activity_id"});
  products_has_lines.belongsTo(lines, { as: "lines_line", foreignKey: "lines_lines_id"});
  lines.hasMany(products_has_lines, { as: "products_has_lines", foreignKey: "lines_lines_id"});
  products_has_materials.belongsTo(materials, { as: "materials_material", foreignKey: "materials_material_id"});
  materials.hasMany(products_has_materials, { as: "products_has_materials", foreignKey: "materials_material_id"});
  products_has_activities.belongsTo(products, { as: "products_product", foreignKey: "products_product_id"});
  products.hasMany(products_has_activities, { as: "products_has_activities", foreignKey: "products_product_id"});
  products_has_lines.belongsTo(products, { as: "products_product", foreignKey: "products_product_id"});
  products.hasMany(products_has_lines, { as: "products_has_lines", foreignKey: "products_product_id"});
  products_has_materials.belongsTo(products, { as: "products_product", foreignKey: "products_product_id"});
  products.hasMany(products_has_materials, { as: "products_has_materials", foreignKey: "products_product_id"});
  products_has_subactivities.belongsTo(products, { as: "products_product", foreignKey: "products_product_id"});
  products.hasMany(products_has_subactivities, { as: "products_has_subactivities", foreignKey: "products_product_id"});
  products_has_techniques.belongsTo(products, { as: "products_product", foreignKey: "products_product_id"});
  products.hasMany(products_has_techniques, { as: "products_has_techniques", foreignKey: "products_product_id"});
  users.belongsTo(roles, { as: "roles_role", foreignKey: "roles_role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "roles_role_id"});
  products_has_subactivities.belongsTo(subactivities, { as: "subactivities_subactivity", foreignKey: "subactivities_subactivity_id"});
  subactivities.hasMany(products_has_subactivities, { as: "products_has_subactivities", foreignKey: "subactivities_subactivity_id"});
  products_has_techniques.belongsTo(techniques, { as: "techniques_technique", foreignKey: "techniques_technique_id"});
  techniques.hasMany(products_has_techniques, { as: "products_has_techniques", foreignKey: "techniques_technique_id"});

  return {
    activities,
    lines,
    materials,
    products,
    products_has_activities,
    products_has_lines,
    products_has_materials,
    products_has_subactivities,
    products_has_techniques,
    roles,
    subactivities,
    techniques,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
