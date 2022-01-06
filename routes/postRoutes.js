const router = require('express').Router()
const { Post, User, Comments } = require('../models')
const passport = require('passport')

// GET all posts
router.get('/posts', passport.authenticate('jwt'), async function (req, res) {
  const postData = await Post.findAll({ include: [User, Comments] })
  res.json(postData)
})

router.get('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.findOne({ where: { id: req.params.id }, include: [User, Comments] })
  res.json(posts)
})


// POST one post
router.post('/posts', passport.authenticate('jwt'), async function ({ body, user }, res) {
  console.log(body)
  if (body.puzzle) {
    const postData = await Post.create({
      body: body.body,
      title: body.title,
      uid: user.id,
      data: new Buffer.from(body.puzzle)
    })
    res.json(postData)
  }
  else {
    const postData = await Post.create({
      body: body.body,
      title: body.title,
      uid: user.id,
    })
    res.json(postData)
  }
})

// DELETE one post
router.delete('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
  await Post.destroy({ where: { id: req.params.id } })
  res.sendStatus(200)
})

module.exports = router
