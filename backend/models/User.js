require('colors');
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    givenName: {
      type: String,
      required: true,
    },
    familyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
    exerciseIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Exercise',
      },
    ],
    routineIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Routine',
      },
    ],
    workoutIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Workout',
      },
    ],
    preferences: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   console.log('WARNING: password rehashed!'.red.inverse);
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
