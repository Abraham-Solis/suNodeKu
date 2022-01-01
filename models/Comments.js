const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Comments extends Model { }
Comments.init({
  body: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'comment' })

module.exports = Comments