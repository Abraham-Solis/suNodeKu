// const router = require('express').Router()
// const { Comments, User, Post } = require('../models')
// const passport = require('passport')

// // GET all stat
// router.get('/stats', passport.authenticate('jwt'), async function (req, res) {
//   const stats = await Stats.findAll({ include: [User] })
//   res.json(stats)
// })

// // POST one stat
// router.post('/stats', passport.authenticate('jwt'), async function ({ body, user }, res) {
//   const stats = await Stats.create({
//     ...body,
//     uid: user.id
//   })
//   res.json(stats)
// })

