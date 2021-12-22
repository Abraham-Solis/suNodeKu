require('dotenv').config()

const express = require('express')
const { join } = require('path')

const passport = require('passport')
const { User, Post } = require('./models')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, async function ({ id }, cb) {
  try {
    const user = await User.findOne({ where: { id }, include: [Post] })
    cb(null, user)
  } catch (err) {
    cb(err, null)
  }
}))

app.use(require('./public'))

async function init() {
  await require('./db').sync()
  app.listen(3000)
}

init()
