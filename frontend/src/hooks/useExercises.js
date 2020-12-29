import { useEffect, useState } from 'react';
import _ from 'lodash';

// custom hook for managing workout exercises and sets data
function useExercises() {
  const [exercises, setExercises] = useState([]);
  const [setsByExercise, setExerciseSets] = useState({});
  const [anySetCompleted, setAnySetCompleted] = useState(false);

  useEffect(() => {
    const allSets = _.flatMap(setsByExercise);
    setAnySetCompleted(_.some(allSets, (set) => set.completed));
  }, [setsByExercise]);

  const onAddExercise = (exercise, numSets = 1, setsCompleted = false) => {
    setExercises((prev) => [...prev, exercise]);
    for (let i = 0; i < numSets; i++) {
      onAddSet(exercise, setsCompleted);
    }
  };

  const onAddSet = (exercise, setCompleted = false) => {
    setExerciseSets((prev) => {
      const existingSets = prev[exercise._id] || [];
      return {
        ...prev,
        [exercise._id]: [
          ...existingSets,
          {
            id: existingSets.length + 1,
            set: existingSets.length + 1,
            previous: '',
            kg: 0,
            reps: 0,
            completed: setCompleted,
          },
        ],
      };
    });
  };

  const onEditSet = (exercise, rowIndex, columnId, value) => {
    setExerciseSets((prev) => {
      const existingSets = prev[exercise._id];
      return {
        ...prev,
        [exercise._id]: existingSets.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...existingSets[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        }),
      };
    });
  };

  const onRemoveSet = (exercise, rowIndex) => {
    setExerciseSets((prev) => {
      const existingSets = prev[exercise._id];
      return {
        ...prev,
        [exercise._id]: _.filter(
          existingSets,
          (_item, index) => index !== rowIndex
        ),
      };
    });
  };

  return [
    exercises,
    setsByExercise,
    anySetCompleted,
    onAddExercise,
    onAddSet,
    onEditSet,
    onRemoveSet,
  ];
}

export default useExercises;
