const { Sequelize } = require('sequelize')

module.exports = new Sequelize(process.env.JAWSDB || 'mysql://root:rootroot@localhost:3306/sudoku_db')
