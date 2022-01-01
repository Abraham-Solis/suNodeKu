// require('dotenv').config()

const express = require('express')
const { join } = require('path')
const sudoku = require('./lib/sudoku.js')

// const passport = require('passport')
// const { User, Post, Comments } = require('./models')
// const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const app = express()

app.use(express.static(join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(passport.initialize())
// app.use(passport.session())

// passport.use(User.createStrategy())

// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

// passport.use(new JWTStrategy({
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.SECRET
// }, async function ({ id }, cb) {
//   try {
//     const user = await User.findOne({ where: { id }, include: [Post, Comments] })
//     cb(null, user)
//   } catch (err) {
//     cb(err, null)
//   }
// }))

// app.use(require('./routes'))

app.engine('.hbs', require('express-handlebars').engine({ extname: '.hbs' }))
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index')
  })

app.get('/mainmenu', (req, res) => {
  res.render('mainmenu')
})

app.get('/difficulty', (req, res) => {
  res.render('difficulty')
})

app.get('/api/sudoku/new/:difficulty', (req, res) => {
  let puzzle = sudoku.createNewPuzzle(req.params.difficulty);
  // Insert into db
  res.json(puzzle);
})

app.get('/api/sudoku/:id', async (req, res) => {
  // Fetch puzzle from mysql by req.param.db
  /*
    let game = await Game.fetchAll({where: {id: req.param.id}}).then();
    let puzzle = sudoku.createFromDB(game.gameData);
    res.json(puzzle)
  */
  let puzzle = {}
  res.json(puzzle);
})

app.put('/api/sudoku/:id/:cellIndex/:number', async (req, res) => {
  /*
  let game = await Game.fetchAll({where: {id: req.param.id}}) 
  let puzzle = sudoku.createFromDB(game.gameData)
  if(puzzle.given[req.params.cellIndex] === 0) {
    puzzle.board[req.params.cellIndex] = req.params.number
  }
  let gameData = puzzle.compress()
  Game.update({gameData: puzzle.compress}, {where: {id: req.params.id}}) 
  */
  res.sendStatus(200);
})

app.get('/game', (req, res) => {
  res.render('game')
})

app.get('/leaderboard', (req, res) => {
  res.render('leaderboard')
})



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


async function init() {
  await require('./db').sync() 
  app.listen(process.env.PORT ||3000)
}

init();



// app.listen(3000)
