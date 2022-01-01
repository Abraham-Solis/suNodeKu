const User = require('./User.js')
const Post = require('./Post.js')
const Comments = require('./Comments.js')

User.hasMany(Post, { foreignKey: 'uid' })
Post.belongsTo(User, { foreignKey: 'uid' })

User.hasMany(Comments, { foreignKey: 'uid' })
Comments.belongsTo(User, { foreignKey: 'uid' })

Post.hasMany(Comments, { foreignKey: 'pid' })
Comments.belongsTo(Post, { foreignKey: 'pid' })


module.exports = {User, Post, Comments }