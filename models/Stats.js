const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Stats extends Model { }
Stats.init({
  totalTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  averageTime: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'stats' })

module.exports = Stats