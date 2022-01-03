const router = require('express').Router()
const { Post, User, Comments } = require('../models')
const passport = require('passport')

// GET all posts
router.get('/posts', passport.authenticate('jwt'), async function (req, res) {
  const postData = await Post.findAll({ include: [User] })
  res.json(postData)
})

// POST one post
router.post('/posts', passport.authenticate('jwt'), async function ({ body, user }, res) {
  const postData = await Post.create({
    ...body,
    uid: user.id
  })
  res.json(postData)
})

// DELETE one post
router.delete('/posts/:id', passport.authenticate('jwt'), async function ({ params: { id } }, res) {
  await Post.destroy({ where: { id } })
  res.sendStatus(200)
})

module.exports = router
