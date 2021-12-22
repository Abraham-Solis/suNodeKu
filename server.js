const express = require('express')
const { join } = require('path')
const sudoku = require('sudoku-gen')

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
  let puzzle = sudoku.getSudoku(req.params.difficulty);
  // Insert into db
  res.json(puzzle);
})

app.get('/api/sudoku/:id', (req, res) => {
  // Fetch puzzle from mysql by req.param.db
  let puzzle = {}
  // Insert into db
  res.json(puzzle);
})

app.put('/api/sudoku/:cellIndex/:number', (req, res) => {
  // Insert req.params.number into req.params.cellIndex
  // Insert into db
  res.sendStatus(200);
})

app.get('/game', (req, res) => {
  res.render('game')
})






app.listen(3000)