require('colors');
const dotenv = require('dotenv');

// grant access to env vars
dotenv.config();

// const { defineAdminUser } = require('./users');
const { defineExercisePresets } = require('./exercisePresets');
const { defineRoutinePresets } = require('./routines');
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const Routine = require('../models/Routine');
const Workout = require('../models/Workout');
const connectDB = require('../config/db');

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    // // define admin user
    // const adminUser = defineAdminUser();
    // // collect all users
    // const allUsers = [adminUser];
    // // insert all users in DB
    // const createdUsers = await User.insertMany(allUsers);

    // define exercise presets
    const exercisePresets = defineExercisePresets();
    // insert all exercise presets in DB
    const createdExercisePresets = await Exercise.insertMany(exercisePresets);

    // define routine presets
    const routinePresets = defineRoutinePresets(createdExercisePresets);
    const createdRoutinePresets = await Routine.insertMany(routinePresets);

    console.log('Data imported!'.green.inverse);
    // console.log(
    //   `Created ${createdUsers.length} new user(s) in the DB`.green.inverse
    // );
    console.log(
      `Created ${createdExercisePresets.length} new exercise preset(s) in the DB`
        .green.inverse
    );
    console.log(
      `Created ${createdRoutinePresets.length} new routine preset(s) in the DB`
        .green.inverse
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
    await Exercise.deleteMany();
    await Routine.deleteMany();
    await Workout.deleteMany();
    console.log('Data destroyed!'.red.inverse);
    console.log('All user data have been deleted from the DB'.red.inverse);
    console.log('All exercise data have been deleted from the DB'.red.inverse);
    console.log('All routine data have been deleted from the DB'.red.inverse);
    console.log('All workout logs have been deleted from the DB'.red.inverse);
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
