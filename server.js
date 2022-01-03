
// const sudoku = require('./lib/sudoku.js')
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const helpers = require('./utils/helpers');

const sequelize = require('./db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('.hbs', require('express-handlebars').engine({ extname: '.hbs' }))
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


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
