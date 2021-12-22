
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Comment extends Model { }
Comment.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'comment' })

module.exports = Comment
