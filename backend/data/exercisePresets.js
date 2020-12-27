const CHEST = 'chest';
const SHOULDER = 'shoulder';
const BACK = 'back';
const LEG = 'leg';

const DUMBBELL = 'dumbbell';
const BARBELL = 'barbell';

const defineExercisePresets = () => [
  {
    name: 'Bench Press (Dumbbell)',
    bodyPart: CHEST,
    category: DUMBBELL,
  },
  {
    name: 'Bench Press (Barbell)',
    bodyPart: CHEST,
    category: BARBELL,
  },
  {
    name: 'Shoulder Press (Dumbbell)',
    bodyPart: SHOULDER,
    category: DUMBBELL,
  },
  {
    name: 'Shoulder Press (Barbell)',
    bodyPart: SHOULDER,
    category: BARBELL,
  },
  {
    name: 'Side Lateral Raise (Dumbbell)',
    bodyPart: SHOULDER,
    category: DUMBBELL,
  },
  {
    name: 'Deadlift (Dumbbell)',
    bodyPart: BACK,
    category: DUMBBELL,
  },
  {
    name: 'Deadlift (Barbell)',
    bodyPart: BACK,
    category: BARBELL,
  },
  {
    name: 'Squat (Dumbbell)',
    bodyPart: LEG,
    category: DUMBBELL,
  },
  {
    name: 'Lunge (Dumbbell)',
    bodyPart: LEG,
    category: DUMBBELL,
  },
];

module.exports = { defineExercisePresets };
