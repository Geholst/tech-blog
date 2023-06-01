const { User } = require('../models');

const userData =
[
  {
    "userName": "George",
    "password": "password",
    "email": "george@george.com"
  },
  {
    "userName": "Derrick",
    "password": "password",
    "email": "derrick@derrick.com"
  },
  {
    "userName": "Brian",
    "password": "password",
    "email": "brian@brian.com"
  },
  {
    "userName": "Josh",
    "password": "password",
    "email": "josh@josh.com"
  }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;