'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Card.belongsTo(models.Account, {
        foreignKey: 'AccountId',
      });
    }
    static GenerateDebit() {
      let baseCard = "4";
      let currentDate = new Date();
      let expYear = String(currentDate.getFullYear()).substr(-2);
      let expMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
      let cvv = ""
      for (let index = 0; index < 15; index++) {
        baseCard += Math.floor(Math.random() * 10);
      }
      for (let index = 0; index < 3; index++) {
       cvv += Math.floor(Math.random() * 10);
      }
      const data = {
        cardNumber: baseCard,
        expMonth: expMonth,
        expYear: expYear,
        cvv: cvv
      }
    
      return data
    }
  }
  Card.sensorCard = function(value) {
    return value.substr(-4)
  }
  Card.init({
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    expMonth: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: {
          msg:"Please input Exp Month"
        },
        notNull: {
          msg:"Please input Exp Month"
        },
        len: {
          args: [2],
          msg: "Please input correct exp month"
        }
      }
    },
    expYear: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: {
          msg:"Please input Exp Year"
        },
        notNull: {
          msg:"Please input Exp Year"
        },
        len: {
          args: [2],
          msg: "Please input correct exp Year"
        }
      }
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: {
          msg:"Please input CVV"
        },
        notNull: {
          msg:"Please input CVV"
        },
        len: {
          args: [3,4],
          msg: "Please input correct CVV"
        }
      }
    },
    AccountId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};