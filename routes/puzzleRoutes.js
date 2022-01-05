const app = require("express").Router()
const sudoku = require('../lib/sudoku.js')
const passport = require('passport')
const helpers = require('../helpers')
const { Puzzles } = require('../models')
const { Sequelize } = require("../db/index.js")

// API call for new Puzzle
app.get('/api/sudoku/new/:difficulty', (req, res) => {
  let puzzle = sudoku.createNewPuzzle(req.params.difficulty);
  console.log(puzzle)
  let compressedData = new Buffer.from(puzzle.compress());
  let puzzleDBEntry = Puzzles.create({difficulty: req.params.difficulty, data: compressedData, uid: req.session.userId}).then(dbEntry => {
    puzzle.puzzleId = dbEntry.dataValues.id;
    res.json(puzzle);
  })
  
})


// API call for loading a puzzle from the DB
app.get('/api/sudoku/:id', async (req, res) => {
    // Fetch puzzle from mysql by req.param.db
    let puzzleDBEntry = Puzzles.findOne({where: {id: req.params.id}}).then(dbEntry => {
        let puzzle = sudoku.createFromDB(new Uint8Array(dbEntry.dataValues.data));
        console.log(puzzle);
        puzzle.puzzleId = dbEntry.dataValues.id;
        res.json(puzzle);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500)
    });
})

// API call for a move
app.put('/api/sudoku/:id', async (req, res) => {
    let cellIndex = req.body.cellIndex;
    let number = req.body.number;

    let puzzleDBEntry = Puzzles.findOne({where: {id: req.params.id}}).then(async dbEntry => {
        let puzzle = sudoku.createFromDB(new Uint8Array(dbEntry.dataValues.data));
        console.log(puzzle)
        if(puzzle.given[cellIndex] > 0) {
            console.log(`!! Invalid move! Puzzle id: ${req.params.id} at cell ${cellIndex}` );
            res.json({invalidMove: cellIndex});
        } else {
            puzzle.board[cellIndex] = number;
            puzzle.blank[cellIndex] = 0;
            let compressedData = new Buffer.from(puzzle.compress())
            await Puzzles.update({data: compressedData}, {where: {id: req.params.id}});

            console.log(puzzle.board)
            console.log(puzzle.solution)

            let filledCellCount = 0;
            // Check to see if all of the cells are full
            for(let i = 0; i < puzzle.board.length; i++) {
                if(puzzle.board[i] !== 255) {
                    filledCellCount++;
                }
            }

            // The "won" variable is set to true by default to make the logic below simpler
            let won = true;

            console.log(filledCellCount + " / " + puzzle.board.length)

            // If all the cells have been filled out
            if(filledCellCount == puzzle.board.length) {
                // Check each cell's answer
                for(let i = 0; i < puzzle.board.length; i++) {
                    // If one cell is wrong, then they lost
                    if(puzzle.board[i] != puzzle.solution[i]) {
                        // One cell is wrong, so won = false and break out of the loop
                        won = false;
                        console.log("Incorrect number at " + i)
                        break;
                    }
                }
            } else {
                // If not all the cells are full, then they haven't won
                won = false;
                console.log(filledCellCount + " / " + puzzle.board.length)
            }

            // We need to communicate to the user what the status is of the game.
            // Such as if the game is still running, if they won and got all the answers right,
            // or if all the cells are full but one or more cell is wrong
            let response = {}

            // "continue" just means if the player hasn't won, the game will keep going.
            // if continue = false, then the game has been completed.
            if(won) {
                response.continue = false;
                // Update the database to say that the game was completed
                await Puzzles.update({completed: true, dateCompleted: Sequelize.fn('NOW')}, {where: {id: req.params.id}})
            } else {
                response.continue = true;                
            }

            res.json(response);
        }

    }).catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
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