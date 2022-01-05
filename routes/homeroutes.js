const app = require("express").Router()
const passport = require('passport')
const helpers = require('../helpers')
const {Puzzles, User} = require('../models')

app.get('/', async (req, res) => {

    if(req.session.loggedIn) {
      res.redirect("/mainmenu")
    } else {
      let viewData = {
          isLoggedIn: req.session.loggedIn ? true : false,
          username: req.session.loggedIn ? req.session.username : "ERROR"
      }
      res.render('index', viewData)

    }
})

app.get('/mainmenu', helpers.isLoggedIn, async (req, res) => {

  let easyGameCountCompleted = await Puzzles.count({where: {
    uid: req.session.userId, 
    difficulty:"easy",
    completed: true
  }});
  
  let totalEasyGames = await Puzzles.count({where: {
    uid: req.session.userId, 
    difficulty:"easy",
  }});

let mediumGameCountCompleted = await Puzzles.count({where: {
    uid: req.session.userId, 
    difficulty:"medium",
    completed: true
  }});
  
  let totalMediumGames = await Puzzles.count({where: {
    uid: req.session.userId, 
    difficulty:"medium",
  }});

  let hardGameCountCompleted = await Puzzles.count({where: {
    uid: req.session.userId, 
    difficulty:"hard",
    completed: true
  }});
  
  let totalHardGames = await Puzzles.count({where: {
    uid: req.session.userId, 
    difficulty:"hard",
  }});

  let expertGameCountCompleted = await Puzzles.count({where: {
    uid: req.session.userId, 
    difficulty:"expert",
    completed: true
  }});
  
  let totalExpertGames = await Puzzles.count({where: {
    uid: req.session.userId, 
    difficulty:"expert",
  }});

  let viewData = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR",
      easyGamesCompleted: easyGameCountCompleted,
      totalEasyGames: totalEasyGames,
      mediumGamesCompleted: mediumGameCountCompleted,
      totalMediumGames: totalMediumGames,
      hardGamesCompleted: hardGameCountCompleted,
      totalHardGames: totalHardGames,
      expertGamesCompleted: expertGameCountCompleted,
      totalExpertGames: totalExpertGames,
  }
  res.render('mainmenu', viewData)
})

app.get('/difficulty', (req, res) => {
  res.render('difficulty')
})

app.get('/continuedgame', helpers.isLoggedIn, async (req, res) => {
  let puzzles = await Puzzles.findAll({raw:true, where: {uid: req.session.userId, completed:false}})

  let viewData = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR",
      puzzles:puzzles
  }

  res.render('continuedgame', viewData)
})

app.get('/blog', helpers.isLoggedIn, async (req, res) => {
  let viewData = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR"
  }
  res.render('blog', viewData)
})


app.get('/leaderboard', helpers.isLoggedIn, async (req, res) => {


  let eachUserStats = []
  let leaderboard = {
    mostGamesPlayed: {
      username: "No one has finished a game",
      count: 0
    },
    easyGamesPlayed: {
      username: "No one has finished a game",
      count: 0
    },
    mediumGamesPlayed: {
      username: "No one has finished a game",
      count: 0
    },
    hardGamesPlayed: {
      username: "No one has finished a game",
      count: 0
    },
    expertGamesPlayed: {
      username: "No one has finished a game",
      count: 0
    },

  }

  User.findAll({raw:true}).then(async data => {
    for(let userIndex = 0; userIndex < data.length; userIndex++) {
      let userData = data[userIndex];
      console.log(data)
      
      let userPuzzleCount = await Puzzles.count({where: {uid: userData.id, completed:true}})
      let userEasyPuzzleCount = await Puzzles.count({where: {uid: userData.id, completed:true, difficulty: "easy"}})
      let userMedPuzzleCount = await Puzzles.count({where: {uid: userData.id, completed:true, difficulty: "medium"}})
      let userHardPuzzleCount = await Puzzles.count({where: {uid: userData.id, completed:true, difficulty: "hard"}})
      let userExpertPuzzleCount = await Puzzles.count({where: {uid: userData.id, completed:true, difficulty: "expert"}})

      let userHighScore = {
        username: userData.username,
        totalCompletedPuzzles: userPuzzleCount,
        totalEasyPuzzles: userEasyPuzzleCount,
        totalMedPuzzles: userMedPuzzleCount,
        totalHardPuzzles: userHardPuzzleCount,
        totalExpertPuzzles: userExpertPuzzleCount,
      }

      eachUserStats.push(userHighScore)
    }

    for(let userScoreIndex = 0; userScoreIndex < eachUserStats.length; userScoreIndex++) {
      let scores = eachUserStats[userScoreIndex];

      if(scores.totalCompletedPuzzles > leaderboard.mostGamesPlayed.count) {
        leaderboard.mostGamesPlayed.count = scores.totalCompletedPuzzles;
        leaderboard.mostGamesPlayed.username = scores.username;
      }

      if(scores.totalEasyPuzzles > leaderboard.easyGamesPlayed.count) {
        leaderboard.easyGamesPlayed.count = scores.totalEasyPuzzles;
        leaderboard.easyGamesPlayed.username = scores.username;
      }

      if(scores.totalMedPuzzles > leaderboard.mediumGamesPlayed.count) {
        leaderboard.mediumGamesPlayed.count = scores.totalMedPuzzles;
        leaderboard.mediumGamesPlayed.username = scores.username;
      }

      if(scores.totalHardPuzzles > leaderboard.hardGamesPlayed.count) {
        leaderboard.hardGamesPlayed.count = scores.totalHardPuzzles;
        leaderboard.hardGamesPlayed.username = scores.username;
      }

      if(scores.totalExpertPuzzles > leaderboard.expertGamesPlayed.count) {
        leaderboard.expertGamesPlayed.count = scores.totalExpertPuzzles;
        leaderboard.expertGamesPlayed.username = scores.username;
      }

    }

    let viewData = {
        isLoggedIn: req.session.loggedIn ? true : false,
        username: req.session.loggedIn ? req.session.username : "ERROR",
        eachUserStats: eachUserStats,
        leaderboard: leaderboard
    }
    res.render('leaderboard', viewData)

  })

})

module.exports = app;