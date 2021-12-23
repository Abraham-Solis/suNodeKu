const express = require('express')
const { join } = require('path')
const sudoku = require('./lib/sudoku.js')

const app = express()

app.use(express.static(join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('.hbs', require('express-handlebars').engine({ extname: '.hbs' }))
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index')
  })


app.get('/api/sudoku/new/:difficulty', (req, res) => {
  let puzzle = sudoku.createNewPuzzle(req.params.difficulty);
  // Insert into db
  res.json(puzzle);
})

app.get('/api/sudoku/:id', (req, res) => {
  // Fetch puzzle from mysql by req.param.db
  // let puzzle = sudoku.createFromDB(game.gameData)
  let puzzle = {}
  res.json(puzzle);
})

app.put('/api/sudoku/:id/:cellIndex/:number', (req, res) => {
  /*
  // fetch from db using req.param.id
  let puzzle = sudoku.createFromDB(game.gameData)
  if(puzzle.given[req.params.cellIndex] === 0) {
    puzzle.board[req.params.cellIndex] = req.params.number
  }
  // let gameData = puzzle.compress()
  // update game table by req.param.id set gameData to ${gameData}
  */
  res.sendStatus(200);
})

app.get('/game', (req, res) => {
  res.render('game')
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

app.listen(3000)