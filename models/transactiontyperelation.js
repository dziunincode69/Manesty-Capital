'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionTypeRelation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionTypeRelation.belongsTo(models.Transaction, { foreignKey: 'TransactionId' });
      TransactionTypeRelation.belongsTo(models.TransactionType, { foreignKey: 'TransactionTypeId' });
    }
    static GetTotalTransactionPerType(includes,includes2){
      return TransactionTypeRelation.findAll({
        include: [
          {
            model: includes
          },
          {
            model: includes2
          }
        ]
      })
    }
  }
  TransactionTypeRelation.init({
    TransactionId: DataTypes.INTEGER,
    TransactionTypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionTypeRelation',
  });
  return TransactionTypeRelation;
};