const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products_techniques', {
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
    technique_id: {
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
    tableName: 'products_techniques',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "product_id" },
          { name: "technique_id" },
        ]
      },
      {
        name: "fk_products_has_techniques_techniques1_idx",
        using: "BTREE",
        fields: [
          { name: "technique_id" },
        ]
      },
      {
        name: "fk_products_has_techniques_products1_idx",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
};
