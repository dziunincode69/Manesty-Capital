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
      // define association here
    }
  }
  Card.init({
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: {
          msg:"Please input Card"
        },
        notNull: {
          msg:"Please input Card"
        },
        isCreditCard: {
          args: true,
          msg: "Please input valid card"
        }
      }
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