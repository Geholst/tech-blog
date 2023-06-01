const router = require('express').Router();
const PostRoutes = require('./post');
const userRoutes = require('./user');


router.use('/posts', PostRoutes);
router.use('/user', userRoutes);

module.exports = router;