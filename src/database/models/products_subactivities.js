const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products_subactivities', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    subactivity_id: {
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
    tableName: 'products_subactivities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "product_id" },
          { name: "subactivity_id" },
        ]
      },
      {
        name: "fk_products_has_subactivities_subactivities1_idx",
        using: "BTREE",
        fields: [
          { name: "subactivity_id" },
        ]
      },
      {
        name: "fk_products_has_subactivities_products1_idx",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
};
