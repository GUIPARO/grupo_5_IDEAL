const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('techniques', {
    technique_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    technique: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'techniques',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "technique_id" },
        ]
      },
    ]
  });
};
