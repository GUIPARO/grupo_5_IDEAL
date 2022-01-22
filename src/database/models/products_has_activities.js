const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products_has_activities', {
    products_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    activities_activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'activities',
        key: 'activity_id'
      }
    }
  }, {
    sequelize,
    tableName: 'products_has_activities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
          { name: "activities_activity_id" },
        ]
      },
      {
        name: "fk_products_has_activities_activities1_idx",
        using: "BTREE",
        fields: [
          { name: "activities_activity_id" },
        ]
      },
      {
        name: "fk_products_has_activities_products1_idx",
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
        ]
      },
    ]
  });
};
