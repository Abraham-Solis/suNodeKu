//sets up Post constructor

const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Post extends Model { }
Post.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'post' })

module.exports = Post
