'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionType.belongsToMany(models.Transaction, {
        through: models.TransactionTypeRelation,
        foreignKey: 'TransactionTypeId',
      });
    }
  }
  TransactionType.init({
    typeName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TransactionType',
  });
  return TransactionType;
};