const { Sequelize } = require('sequelize')

module.exports = new Sequelize('mysql://root:rootroot@localhost:3306/sudoku_db')
