const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products_has_techniques', {
    products_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    techniques_technique_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'techniques',
        key: 'technique_id'
      }
    }
  }, {
    sequelize,
    tableName: 'products_has_techniques',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
          { name: "techniques_technique_id" },
        ]
      },
      {
        name: "fk_products_has_techniques_techniques1_idx",
        using: "BTREE",
        fields: [
          { name: "techniques_technique_id" },
        ]
      },
      {
        name: "fk_products_has_techniques_products1_idx",
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
        ]
      },
    ]
  });
};
