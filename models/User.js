const { Model, Datatypes} = require('sequelize')
const sequelize = require('../db')

class User extends Model { }
User.init ({
    username: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    email: {
        type: Datatypes.STRING,
        allowNull: false,
    }
},
{ sequelize, modelName: 'user'})

module.exports = User