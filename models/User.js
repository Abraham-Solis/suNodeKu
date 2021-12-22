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
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = User
