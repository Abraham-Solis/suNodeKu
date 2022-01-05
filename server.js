require('dotenv').config()

const express = require('express')
const { join } = require('path')

const passport = require('passport')
const { User, Post, Comments } = require('./models')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.engine('.hbs', require('express-handlebars').engine({ extname: '.hbs' }))
app.set('view engine', '.hbs');
app.set('views', './views');

const session = require('express-session')
app.use(session({ secret: process.env.SECRET, maxAge:60*60*1000, resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60*60*1000 } }));
  
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
    const user = await User.findOne({ where: { id }, include: [Post, Comments] })
    cb(null, user)
  } catch (err) {
    cb(err, null)
  }
}))

app.use(require('./routes'))

async function init () {
  await require('./db').sync()
  app.listen(process.env.PORT || 3000)
}

init()

