const app = require("express").Router()
const sudoku = require('../lib/sudoku.js')
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

// API call for new Puzzle
app.get('/api/sudoku/new/:difficulty', (req, res) => {
  let puzzle = sudoku.createNewPuzzle(req.params.difficulty);
  // Insert into db
  res.json(puzzle);
})


// API call for loading a puzzle from the DB
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

// API call for a move
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


// app.get('/blog', helpers.isLoggedIn, async (req, res) => {
// Route for loading an existing game
app.get('/sudoku/:id', helpers.isLoggedIn, async (req, res) => {

  let viewData = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR",
      state: "load-puzzle",
  }

  res.render('game', viewData)
  
}) 

// Route for starting a new game
app.get('/sudoku/new/:difficulty', helpers.isLoggedIn, async (req, res) => {

  let difficulty = req.params.difficulty;

  let viewData = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR",
      state: "new-puzzle",
      difficulty: difficulty 

  }
  res.render('blog', viewData)

  res.render('game', viewData)
})

// app.get('/game', helpers.isLoggedIn, async (req, res) => {
//   let viewData = {
//       isLoggedIn: req.session.loggedIn ? true : false,
//       username: req.session.loggedIn ? req.session.username : "ERROR"
//   }
//   res.render('game', viewData)
// })

app.get('/leaderboard', helpers.isLoggedIn, async (req, res) => {
  let viewData = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR"
  }
  res.render('leaderboard', viewData)
})
module.exports = app;