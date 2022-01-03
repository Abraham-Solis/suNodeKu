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
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalGames: {
    type: DataTypes.INTEGER,
  
    default: 0
  },
  averageTime: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fastestTime: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

module.exports = User
