const router = require('express').Router()
const { User, Post } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/users/register', (req, res) => {
  console.log("POST", req.body)
  User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    req.session.loggedIn = true
    req.session.userId = user.id
    req.session.username = user.username
    res.json(user ? {
      username: user.username,
      token: jwt.sign({ id: user.id }, process.env.SECRET)
    } : null)
  })
})

router.get('/users/get/:id', passport.authenticate('jwt'), (req, res) => {
  User.findOne({raw:true, where: {id: req.params.id}}).then(entry => {
    res.json(entry);
  })
})

router.get('/users/profile', passport.authenticate('jwt'), (req, res) => res.json(req.user))

router.get('/users/logout', async (req, res) => {
  if (req.session.loggedIn) {
    console.log("Logging out")
    req.session.destroy(() => {
      res.render('logout')
    })
  } else {
    console.log("Not logged in??")
    res.redirect('/');
  }
})


module.exports = router
