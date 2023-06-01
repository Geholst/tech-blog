const sequelize = require('../config');
const userSeedData = require('./user');
const commentSeedData = require('./comments');
const PostSeedData = require('./post');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await userSeedData();
  await PostSeedData();
  await commentSeedData();

  console.log('added to db');
  process.exit(0);
};

seedDatabase();
