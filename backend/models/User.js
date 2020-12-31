require('colors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
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
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log('WARNING: password rehashed!'.red.inverse);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
