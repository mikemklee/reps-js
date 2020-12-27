const defineRoutinePresets = (createdExercisePresets) => {
  const BENCH_PRESS_DUMBBELL_ID = createdExercisePresets.find(
    (item) => item.name === 'Bench Press (Dumbbell)'
  )._id;
  const SHOULDER_PRESS_DUMBBELL_ID = createdExercisePresets.find(
    (item) => item.name === 'Shoulder Press (Dumbbell)'
  )._id;
  const DEADLIFT_DUMBBELL_ID = createdExercisePresets.find(
    (item) => item.name === 'Deadlift (Dumbbell)'
  )._id;

  return [
    {
      name: 'Push day',
      exercises: [
        {
          presetId: BENCH_PRESS_DUMBBELL_ID,
          numSets: 3,
        },
        {
          presetId: SHOULDER_PRESS_DUMBBELL_ID,
          numSets: 3,
        },
      ],
    },
    {
      name: 'Pull day',
      exercises: [
        {
          presetId: DEADLIFT_DUMBBELL_ID,
          numSets: 5,
        },
      ],
    },
  ];
};

module.exports = { defineRoutinePresets };
