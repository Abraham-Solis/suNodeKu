const router = require('express').Router()
const { User, Post } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/users/register', (req, res) => {
  console.log("POST",req.body)
  User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    req.session.loggedIn= true
    res.json(user ? {
      username: user.username,
      token: jwt.sign({ id: user.id }, process.env.SECRET)
    } : null)
  })
})

router.get('/users/profile', passport.authenticate('jwt'), (req, res) => res.json(req.user))

// GET one user
// router.get('/users/:id', async function ({ params: { id } }, res) {
//   const user = await User.findOne({ where: { id }, include: [Post] })
//   res.json(user)
// })

// POST one user
// router.post('/users', async function ({ body }, res) {
//   const user = await User.create(body)
//   res.json(user)
// })
router.get('/users/logout', async (req,res) => {
  if(req.session.loggedIn) {
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
