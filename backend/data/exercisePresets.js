const NAME = require('../constants/exerciseName');
const CATEGORY = require('../constants/exerciseCategory');
const BODY_PART = require('../constants/bodyPart');

const defineExercisePresets = () => [
  {
    name: NAME.BENCH_PRESS_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyParts: [BODY_PART.CHEST],
  },
  {
    name: NAME.BENCH_PRESS_BARBELL,
    category: CATEGORY.BARBELL,
    bodyParts: [BODY_PART.CHEST],
  },
  {
    name: NAME.SHOULDER_PRESS_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyParts: [BODY_PART.SHOULDER],
  },
  {
    name: NAME.SHOULDER_PRESS_BARBELL,
    category: CATEGORY.BARBELL,
    bodyParts: [BODY_PART.SHOULDER],
  },
  {
    name: NAME.SIDE_LATERAL_RAISE_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyParts: [BODY_PART.SHOULDER],
  },
  {
    name: NAME.DEADLIFT_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyParts: [BODY_PART.BACK],
  },
  {
    name: NAME.DEADLIFT_BARBELL,
    category: CATEGORY.BARBELL,
    bodyParts: [BODY_PART.BACK],
  },
  {
    name: NAME.SQUAT_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyParts: [BODY_PART.LEGS],
  },
  {
    name: NAME.LUNGE_DUMBBELL,
    category: CATEGORY.DUMBBELL,
    bodyParts: [BODY_PART.LEGS],
  },
];

module.exports = { defineExercisePresets };
