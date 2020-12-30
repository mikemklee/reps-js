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
  const SQUAT_DUMBBELL_ID = createdExercisePresets.find(
    (item) => item.name === 'Squat (Dumbbell)'
  )._id;

  return [
    {
      name: 'Push day',
      exercises: [
        {
          exerciseId: BENCH_PRESS_DUMBBELL_ID,
          sets: [
            { kg: 12, reps: 12 },
            { kg: 12, reps: 12 },
            { kg: 12, reps: 12 },
          ],
        },
        {
          exerciseId: SHOULDER_PRESS_DUMBBELL_ID,
          sets: [
            { kg: 12, reps: 12 },
            { kg: 12, reps: 12 },
            { kg: 12, reps: 12 },
          ],
        },
      ],
      isPreset: true,
    },
    {
      name: 'Pull day',
      exercises: [
        {
          exerciseId: DEADLIFT_DUMBBELL_ID,
          sets: [
            { kg: 12, reps: 12 },
            { kg: 12, reps: 12 },
            { kg: 12, reps: 12 },
            { kg: 12, reps: 12 },
            { kg: 12, reps: 12 },
          ],
        },
      ],
      isPreset: true,
    },
    {
      name: 'Leg day',
      exercises: [
        {
          exerciseId: SQUAT_DUMBBELL_ID,
          sets: [
            { kg: 12, reps: 12 },
            { kg: 12, reps: 12 },
            { kg: 12, reps: 12 },
            { kg: 12, reps: 12 },
            { kg: 12, reps: 12 },
          ],
        },
      ],
      isPreset: true,
    },
  ];
};

module.exports = { defineRoutinePresets };
