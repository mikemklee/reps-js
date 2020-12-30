const NAME = require('../constants/exerciseName');
const CATEGORY = require('../constants/exerciseCategory');
const BODY_PART = require('../constants/bodyPart');

const defineExercisePresets = () => [
  {
    name: NAME.BENCH_PRESS_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyParts: [BODY_PART.CHEST],
    isPreset: true,
  },
  {
    name: NAME.BENCH_PRESS_BARBELL,
    category: CATEGORY.BARBELL,
    bodyParts: [BODY_PART.CHEST],
    isPreset: true,
  },
  {
    name: NAME.SHOULDER_PRESS_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyParts: [BODY_PART.SHOULDER],
    isPreset: true,
  },
  {
    name: NAME.SHOULDER_PRESS_BARBELL,
    category: CATEGORY.BARBELL,
    bodyParts: [BODY_PART.SHOULDER],
    isPreset: true,
  },
  {
    name: NAME.SIDE_LATERAL_RAISE_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyParts: [BODY_PART.SHOULDER],
    isPreset: true,
  },
  {
    name: NAME.DEADLIFT_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyParts: [BODY_PART.BACK],
    isPreset: true,
  },
  {
    name: NAME.DEADLIFT_BARBELL,
    category: CATEGORY.BARBELL,
    bodyParts: [BODY_PART.BACK],
    isPreset: true,
  },
  {
    name: NAME.SQUAT_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyParts: [BODY_PART.LEGS],
    isPreset: true,
  },
  {
    name: NAME.LUNGE_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyParts: [BODY_PART.LEGS],
    isPreset: true,
  },
];

module.exports = { defineExercisePresets };
