const express = require('express')
const { join } = require('path')

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

app.get('/mainmenu', (req, res) => {
  res.render('mainmenu')
})

app.listen(3000)
