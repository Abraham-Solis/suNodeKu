const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Stats extends Model { }
Post.init({
  totalTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  averageTime: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'stats' })

module.exports = Stats