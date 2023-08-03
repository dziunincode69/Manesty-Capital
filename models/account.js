'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.belongsTo(models.Role)
      Account.hasOne(models.Card, {
        foreignKey: 'AccountId',
      });
      Account.hasMany(models.Transaction)
    }
    static FindAccount(email,includes){
      return Account.findAll({
        include: {
          model: includes
        },
        where: {
          email
        }
      })
    }
  }
  Account.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args:true,
          msg: "please input name "
        },
        notNull: {
          args: true,
          msg: "please input name "
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Email cannot null"
        },
        isEmail: {
          args: true,
          msg: "Please input correct email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args:true,
          msg: "please input password "
        },
        notNull: {
          args: true,
          msg: "please input password "
        }
      }
    },
    balance: DataTypes.INTEGER,
    RoleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};