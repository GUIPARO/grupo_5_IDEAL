const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products_has_lines', {
    products_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    lines_lines_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'lines',
        key: 'lines_id'
      }
    }
  }, {
    sequelize,
    tableName: 'products_has_lines',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
          { name: "lines_lines_id" },
        ]
      },
      {
        name: "fk_products_has_lines_lines1_idx",
        using: "BTREE",
        fields: [
          { name: "lines_lines_id" },
        ]
      },
      {
        name: "fk_products_has_lines_products1_idx",
        using: "BTREE",
        fields: [
          { name: "products_product_id" },
        ]
      },
    ]
  });
};
