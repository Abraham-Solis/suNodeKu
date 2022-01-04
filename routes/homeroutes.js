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


app.get('/blog', (req, res) => {
  res.render('blog')
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

app.get('/game', helpers.isLoggedIn, async (req, res) => {
  let viewData = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR"
  }
  res.render('game', viewData)
})

app.get('/leaderboard', helpers.isLoggedIn, async (req, res) => {
  let viewData = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR"
  }
  res.render('leaderboard', viewData)
})
module.exports = app;