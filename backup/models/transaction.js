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
    static associate(models) {
      // define association here
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
    TransactionTypeId: {
      type :DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Input transaction type transaction"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};