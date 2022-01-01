// const router = require('express').Router()
// const { Achievement } = require('../models')
// const passport = require('passport')

// // GET all achievements
// router.get('/achievements', passport.authenticate('jwt'), async function (req, res) {
//   const comments = await Achievement.findAll({ include: [Post] })
//   res.json(comments)
// })

// // POST one achievement
// router.post('/achievements', passport.authenticate('jwt'), async function ({ body, user }, res) {
//   const post = await Achievement.create({
//     ...body,
//     uid: user.id ?????????????????????
//   })
//   res.json(comment)
// })
