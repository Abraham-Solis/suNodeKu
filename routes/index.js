const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./postRoutes.js'))
router.use('/api', require('./commentRoutes.js'))

module.exports = router
