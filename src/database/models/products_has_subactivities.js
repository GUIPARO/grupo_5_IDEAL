const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products_has_subactivities', {
    products_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    subactivities_subactivity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'subactivities',
        key: 'subactivity_id'
      }
    }
  }, {
    sequelize,
    tableName: 'products_has_subactivities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
          { name: "subactivities_subactivity_id" },
        ]
      },
      {
        name: "fk_products_has_subactivities_subactivities1_idx",
        using: "BTREE",
        fields: [
          { name: "subactivities_subactivity_id" },
        ]
      },
      {
        name: "fk_products_has_subactivities_products1_idx",
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
        ]
      },
    ]
  });
};
