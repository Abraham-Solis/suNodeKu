
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Comment extends Model { }
Comment.init({
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
  body: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'comment' })

module.exports = Comment
