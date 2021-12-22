const router = require('express').Router()
const { Achievement } = require('../models')
const passport = require('passport')

// GET all comments
router.get('/achievements', passport.authenticate('jwt'), async function (req, res) {
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
