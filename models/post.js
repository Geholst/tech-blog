const sequelize = require("../config");
const { Model, DataTypes } = require("sequelize");

class Post extends Model {}
Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Post;
