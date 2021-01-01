const NAME = require('../constants/exerciseName');
const CATEGORY = require('../constants/exerciseCategory');
const BODY_PART = require('../constants/bodyPart');

const defineExercisePresets = () => [
  {
    name: NAME.BENCH_PRESS_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyPart: BODY_PART.CHEST,
    isPreset: true,
  },
  {
    name: NAME.BENCH_PRESS_BARBELL,
    category: CATEGORY.BARBELL,
    bodyPart: BODY_PART.CHEST,
    isPreset: true,
  },
  {
    name: NAME.SHOULDER_PRESS_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyPart: BODY_PART.SHOULDERS,
    isPreset: true,
  },
  {
    name: NAME.SHOULDER_PRESS_BARBELL,
    category: CATEGORY.BARBELL,
    bodyPart: BODY_PART.SHOULDERS,
    isPreset: true,
  },
  {
    name: NAME.SIDE_LATERAL_RAISE_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyPart: BODY_PART.SHOULDERS,
    isPreset: true,
  },
  {
    name: NAME.DEADLIFT_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyPart: BODY_PART.BACK,
    isPreset: true,
  },
  {
    name: NAME.DEADLIFT_BARBELL,
    category: CATEGORY.BARBELL,
    bodyPart: BODY_PART.BACK,
    isPreset: true,
  },
  {
    name: NAME.SQUAT_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyPart: BODY_PART.LEGS,
    isPreset: true,
  },
  {
    name: NAME.LUNGE_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyPart: BODY_PART.LEGS,
    isPreset: true,
  },
  {
    name: NAME.CABLE_CROSSOVER,
    category: CATEGORY.MACHINE,
    bodyPart: BODY_PART.CHEST,
    isPreset: true,
  },
  {
    name: NAME.FRONT_RAISE_PLATE,
    category: CATEGORY.OTHER,
    bodyPart: BODY_PART.SHOULDERS,
    isPreset: true,
  },
  {
    name: NAME.PULL_UP,
    category: CATEGORY.WEIGHTED_BODYWEIGHT,
    bodyPart: BODY_PART.BACK,
    isPreset: true,
  },
  {
    name: NAME.PULL_UP_ASSISTED,
    category: CATEGORY.ASSISTED_BODYWEIGHT,
    bodyPart: BODY_PART.BACK,
    isPreset: true,
  },
  {
    name: NAME.JUMPING_JACK,
    category: CATEGORY.REPS,
    bodyPart: BODY_PART.FULL_BODY,
    isPreset: true,
  },
  {
    name: NAME.RUNNING,
    category: CATEGORY.CARDIO,
    bodyPart: BODY_PART.CARDIO,
    isPreset: true,
  },
  {
    name: NAME.PLANK,
    category: CATEGORY.DURATION,
    bodyPart: BODY_PART.CORE,
    isPreset: true,
  },
];

module.exports = { defineExercisePresets };
