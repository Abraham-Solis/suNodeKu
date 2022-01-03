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
    const user = await User.findOne({ where: { id }, include: [Post, Note] })
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


// Inform Express.js on which template engine to use





// app.use(require('./routes'))

// app.engine('.hbs', require('express-handlebars').engine({ extname: '.hbs' }))
// app.set('view engine', '.hbs');
// app.set('views', './views');




/*
// For testing the compression
let compressTest = () => {
  let newPuzzle  = sudoku.createNewPuzzle("easy");
  console.log(newPuzzle);
  let data = newPuzzle.compress();
  console.log(data.length);
  let decomp = sudoku.createFromDB(data);
  console.log(decomp);
}
compressTest()
*/



// app.listen(3000)
