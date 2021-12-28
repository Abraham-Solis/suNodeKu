//sets up User constructor

const pls = require('passport-local-sequelize')
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

// class User extends Model { }
// User.init({
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, { sequelize, modelName: 'user' })

const User = pls.defineUser(sequelize, {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalGames: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 0
  },
  averageTime: {
    type: DataTypes.TIME,
    allowNull: true
  },
  fastestTime: {
    type: DataTypes.TIME,
    allowNull: true
  }
})

module.exports = User
