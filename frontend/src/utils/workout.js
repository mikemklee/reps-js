import _ from 'lodash';

const Utils = {
  formatExercisesData: (setsByExercise) => {
    return _.map(setsByExercise, (sets, exerciseId) => ({
      exerciseId,
      sets: _.map(sets, (set) => ({
        kg: parseInt(set.kg, 10),
        reps: parseInt(set.reps, 10),
      })),
    }));
  },
};

export default Utils;
