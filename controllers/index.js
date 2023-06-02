const router = require('express').Router()

const pageRoutes = require('./pages')
router.use('/', pageRoutes)

const apiRoutes = require('./api')
router.use('/api', apiRoutes);

module.exports = router
