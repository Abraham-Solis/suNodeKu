const app = require("express").Router()
const sudoku = require('../lib/sudoku.js')
const passport = require('passport')
const helpers = require('../helpers')
const { Puzzles } = require('../models')

// API call for new Puzzle
app.get('/api/sudoku/new/:difficulty', (req, res) => {
  let puzzle = sudoku.createNewPuzzle(req.params.difficulty);
  
  let compressedData = puzzle.compress().join('');
  console.log("Data Length: " + compressedData.length)
  let puzzleDBEntry = Puzzles.create({difficulty: req.params.difficulty, data: compressedData})
  
  res.json(puzzle);
})


// API call for loading a puzzle from the DB
app.get('/api/sudoku/:id', async (req, res) => {
    // Fetch puzzle from mysql by req.param.db
    let puzzleDBEntry = Puzzles.findOne({where: {id: req.params.id}}).then(dbEntry => {
        let puzzle = sudoku.createFromDB(dbEntry.dataValues.data);
        res.json(puzzle);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500)
    });
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


// Route for loading an existing game
app.get('/sudoku/:id', helpers.isLoggedIn, async (req, res) => {

  let viewData = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR",
      state: "load-puzzle",
      puzzleId: req.params.id
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

  res.render('game', viewData)
})

module.exports = app