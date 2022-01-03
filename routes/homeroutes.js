const app = require("express").Router()
// const sudoku = require('./lib/sudoku.js')

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
module.exports = app;