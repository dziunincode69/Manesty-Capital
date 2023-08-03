'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get TransactionDate(){
      let year = this.createdAt.getFullYear();
      let month = String(this.createdAt.getMonth() + 1).padStart(2, '0'); // JavaScript months are 0-11
      let day = String(this.createdAt.getDate()).padStart(2, '0');

      let formattedDate = `${year}-${month}-${day}`;
      return formattedDate
    }
    static associate(models) {
      Transaction.belongsToMany(models.TransactionType, {
        through: models.TransactionTypeRelation,
        foreignKey: 'TransactionId',
      });
      Transaction.belongsTo(models.Account, {foreignKey: "AccountId"})
    }
  }
  Transaction.init({
    title: {
      type :DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Input title transaction"
        },
        notNull: {
          msg: "Input title transaction"
        }
      }
    },
    amount: {
      type :DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Input amount transaction"
        },
        isInt: {
          msg: "Please input in Number"
        }
      }
    },
    AccountId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};