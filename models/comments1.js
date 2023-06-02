const sequelize = require('../config');
const { Model, DataTypes } = require('sequelize');


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