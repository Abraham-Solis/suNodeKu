const User = require('./User.js')
const Post = require('./Post.js')
const Comments = require('./Comments.js')
const Puzzles = require('./Puzzles.js')

User.hasMany(Post, { foreignKey: 'uid' })
Post.belongsTo(User, { foreignKey: 'uid' })

User.hasMany(Comments, { foreignKey: 'uid' })
Comments.belongsTo(User, { foreignKey: 'uid' })

Post.hasMany(Comments, { foreignKey: 'pid' })
Comments.belongsTo(Post, { foreignKey: 'pid' })

User.hasMany(Puzzles, { foreignKey: 'uid'})
Puzzles.belongsTo(User, { foreignKey: 'uid'})

module.exports = {User, Post, Comments, Puzzles }
//setting up Post and User constructors 

// const User = require('./User.js')
// const Post = require('./Post.js')
// const Comment = require('./Comment.js')

// //allows each user to create multiple posts and comments
// User.hasMany(Post, { foreignKey: 'uid' })
// // User.hasMany(Comment { foreignKey: 'uid'} )
// Post.hasMany(Comment, { foreignKey: 'uid' })
// Comment.belongsTo(Post, { foreignKey: 'uid' })
// Post.belongsTo(User, { foreignKey: 'uid' })
// User.hasMany(Achievement, { foreignKey: 'uid '})
// //findAll on achievement (in index.js under public) -- look at ecommerceBackEnd
// User.hasMany(Stats, { foreignKey: 'uid ' })

// module.exports = { User, Post, Comment }
