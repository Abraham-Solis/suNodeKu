const router = require('express').Router()
const { Comment, User, Post } = require('../models')
const passport = require('passport')

// GET all comments
router.get('/commments', passport.authenticate('jwt'), async function (req, res) {
  const comments = await Comment.findAll({ include: [Post] })
  res.json(comments)
})

// POST one comment
router.post('/comments', passport.authenticate('jwt'), async function ({ body, user }, res) {
  const post = await Comment.create({
    ...body,
    uid: user.id
  })
  res.json(comment)
})

// DELETE one comment
router.delete('/comments/:id', passport.authenticate('jwt'), async function ({ params: { id } }, res) {
  await Comment.destroy({ where: { id } })
  res.sendStatus(200)
})

module.exports = router