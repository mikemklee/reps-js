require('colors');
const dotenv = require('dotenv');

// grant access to env vars
dotenv.config();

const { defineAdminUser } = require('./users');
const User = require('../models/User');
const connectDB = require('../config/db');

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    // create admin user
    const adminUser = defineAdminUser();

    // collect all users
    const allUsers = [adminUser];

    // insert all users in DB
    const createdUsers = await User.insertMany(allUsers);

    console.log('Data imported!'.green.inverse);
    console.log(
      `Created ${createdUsers.length} new user(s) in the DB`.green.inverse
    );
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    console.log('Data destroyed!'.red.inverse);
    console.log('All user data have been deleted from the DB'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
