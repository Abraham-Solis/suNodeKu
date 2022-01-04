const { Sequelize } = require('sequelize')

module.exports = new Sequelize('mysql://root:bobby@localhost:3306/sudoku_db')
