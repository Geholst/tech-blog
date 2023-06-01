const router = require('express').Router()

const apiRoutes = require('./api')
router.use('/api', apiRoutes);

const pageRoutes = require('./pages')
router.use('/', pageRoutes)

module.exports = router