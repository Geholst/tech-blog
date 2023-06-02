const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

Comment.belongsTo(Post, {
  onDelete: "CASCADE",
});
Post.belongsToMany(User, {
  through: "PostUsers",
});
User.belongsToMany(Post, {
  through: "PostUsers",
});

Post.hasMany(Comment);
Comment.belongsTo(User);
User.hasMany(Comment);

module.exports = {
    User,
    Post,
    Comment,
  };
  