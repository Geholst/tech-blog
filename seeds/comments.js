const { Comment } = require('../models');

const commentData = [
  {
    content: 'cool post',
    userId: 1,
    postId: 1,
  },
  {
    content: 'good idea',
    userId: 2,
    postId: 1,
  },
  {
    content: 'is that right?',
    userId: 3,
    postId: 2,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);
module.exports = seedComment;