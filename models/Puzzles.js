const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Puzzles extends Model { }

Puzzles.init({
  data: {
    type: DataTypes.STRING,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.STRING(7),
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  dateCompleted: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, { sequelize, modelName: 'puzzles' })

module.exports = Puzzles

