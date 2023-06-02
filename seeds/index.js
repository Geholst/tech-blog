const userSeedData = require('./user');
const sequelize = require('../config');
const PostSeedData = require('./post');
const commentSeedData = require('./comments');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await userSeedData();
  await PostSeedData();
  await commentSeedData();
  
  console.log('added to database');
  process.exit(0);
};

seedDatabase();


