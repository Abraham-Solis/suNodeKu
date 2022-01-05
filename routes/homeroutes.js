const app = require("express").Router()
const passport = require('passport')
const helpers = require('../helpers')

app.get('/', async (req, res) => {
    let viewData = {
        isLoggedIn: req.session.loggedIn ? true : false,
        username: req.session.loggedIn ? req.session.username : "ERROR"
    }
    res.render('index', viewData)
  })

app.get('/mainmenu', helpers.isLoggedIn, async (req, res) => {
  let viewData = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR"
  }
  res.render('mainmenu', viewData)
})

app.get('/difficulty', (req, res) => {
  res.render('difficulty')
})

app.get('/continuedgame', (req, res) => {
  res.render('continuedgame')
})

app.get('/blog', helpers.isLoggedIn, async (req, res) => {
  let viewData = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR"
  }
  res.render('blog', viewData)
})


app.get('/leaderboard', helpers.isLoggedIn, async (req, res) => {
  let viewData = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR"
  }
  res.render('leaderboard', viewData)
})
module.exports = app;