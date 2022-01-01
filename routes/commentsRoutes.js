const router = require('express').Router()
const { Post, User, Comments } = require('../models')
const passport = require('passport')

// GET all posts
router.get('/comments', passport.authenticate('jwt'), async function (req, res) {
  const comments = await Comments.findAll({ include: [User, Post] })
  res.json(comments)
})



// POST one post
router.post('/comments', passport.authenticate('jwt'), async function (req, res) {
  const comment = await Comments.create({
    body: req.body.body,
    pid: req.body.pid,
    uid: req.user.id
  })
  res.json(comment)
})

// DELETE one post
// router.delete('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
//   await Post.destroy({ where: { id: req.params.id } })
//   res.sendStatus(200)
// })

module.exports = router