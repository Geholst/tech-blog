const sequelize = require('../config');
const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');



class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}



User.init(
  {
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  
  {

    sequelize,
    hooks: {
      beforeCreate: async (userObj) => {
        userObj.password = await bcrypt.hash(userObj.password, 3);
        return userObj;
      },
    },
  }
);

module.exports = User;