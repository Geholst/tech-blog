const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Comments extends Model {}
  Comments.init(
    {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Comments;