const { Post } = require('../models');

const PostData =
[
  {
    "title": "How to do something cool",
    "content": "Be cool!",
   
  },
  {
    "title": "Techy stuffs",
    "content": "techy stuffs is important",
   
  },
  {
    "title": "PC or Mac?",
    "content": "I prefer PC",
  
  }
];

const seedPost = () => Post.bulkCreate(PostData);

module.exports = seedPost;