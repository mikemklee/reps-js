import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import useWeightConverter from './useWeightConverter';
import useDistanceConverter from './useDistanceConverter';

// custom hook for managing workout exercises and sets data
function useExercises() {
  const categoryNames = useMemo(() => ({
    BARBELL: 'Barbell',
    DUMBBELL: 'Dumbbell',
    WEIGHTED_BODYWEIGHT: 'Weighted Bodyweight',
    ASSISTED_BODYWEIGHT: 'Assisted Bodyweight',
    DURATION: 'Duration',
    CARDIO: 'Cardio',
    REPS: 'Reps only',
    MACHINE: 'Machine',
    OTHER: 'Other',
  }));
  const bodyPartNames = useMemo(() => ({
    CORE: 'Core',
    ARMS: 'Arms',
    LEGS: 'Legs',
    BACK: 'Back',
    CHEST: 'Chest',
    SHOULDERS: 'Shoulders',
    FULL_BODY: 'Full body',
    CARDIO: 'Cardio',
    OLYMPIC: 'Olympic',
    OTHER: 'Other',
  }));

  const [exercises, setExercises] = useState([]);
  const [setsByExercise, setExerciseSets] = useState({});
  const [anySetCompleted, setAnySetCompleted] = useState(false);

  const { currentWeightUnit, getWeightConversionFactor } = useWeightConverter();
  const {
    currentDistanceUnit,
    getDistanceConversionFactor,
  } = useDistanceConverter();

  const { presets: exercisePresets } = useSelector((state) => state.exercise);

  useEffect(() => {
    const allSets = _.flatMap(setsByExercise);
    setAnySetCompleted(_.some(allSets, (set) => set.completed));
  }, [setsByExercise]);

  const onAddExercise = (exercise, numSets = 1) => {
    setExercises((prev) => [...prev, exercise]);
    for (let i = 0; i < numSets; i++) {
      onAddSet(exercise);
    }
  };

  const onAddSavedExercise = (
    savedExercise,
    exercisePreset,
    markAsCoplete = false
  ) => {
    let weightConversionFactor = 1;
    if (currentWeightUnit === 'lb') {
      // values are stored as KG in the DB
      // need to convert KG weights to LB before we use them
      weightConversionFactor = getWeightConversionFactor('kg', 'lb');
    }

    let distanceConversionFactor = 1;
    if (currentDistanceUnit === 'mi') {
      // values are stored as KM in the DB
      // need to convert KM distances to MI before we use them
      distanceConversionFactor = getDistanceConversionFactor('km', 'mi');
    }

    setExercises((prev) => [...prev, exercisePreset]);
    for (let i = 0; i < savedExercise.sets.length; i++) {
      const currentSet = savedExercise.sets[i];
      onAddSet(
        exercisePreset,
        currentSet.kg * weightConversionFactor,
        currentSet.reps,
        currentSet.km * distanceConversionFactor,
        currentSet.duration,
        markAsCoplete
      );
    }
  };

  const onAddSet = (
    exercise,
    kg = 0,
    reps = 0,
    km = 0,
    duration = 0,
    completed = false
  ) => {
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
            kg,
            reps,
            km,
            duration,
            completed,
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
    let deleteExercise = false;

    setExerciseSets((prev) => {
      const existingSets = prev[exercise._id];
      const updatedSets = _.filter(
        existingSets,
        (_item, index) => index !== rowIndex
      );

      if (_.isEmpty(updatedSets)) {
        // that was the last set; remove this exercise from sets map
        deleteExercise = true;
        return _.omit(prev, exercise._id);
      } else {
        // otherwise, just update the sets
        return {
          ...prev,
          [exercise._id]: updatedSets,
        };
      }
    });

    if (deleteExercise) {
      // remove this exercise from exercises array as well
      setExercises((prev) => {
        return _.filter(prev, (item) => item._id !== exercise._id);
      });
    }
  };

  const onConvertWeightUnit = (weightConversionFactor) => {
    setExerciseSets((prev) => {
      const updatedSetsByExercise = {};

      _.forEach(prev, (sets, exerciseId) => {
        const exercisePreset = exercisePresets[exerciseId];

        // only convert units for the following exercises
        switch (exercisePreset.category) {
          case categoryNames.BARBELL:
          case categoryNames.DUMBBELL:
          case categoryNames.MACHINE:
          case categoryNames.OTHER:
          case categoryNames.WEIGHTED_BODYWEIGHT:
          case categoryNames.ASSISTED_BODYWEIGHT: {
            updatedSetsByExercise[exerciseId] = sets.map((row) => {
              return {
                ...row,
                kg: row.kg * weightConversionFactor,
              };
            });
            break;
          }
          default: {
            updatedSetsByExercise[exerciseId] = sets;
          }
        }
      });

      return updatedSetsByExercise;
    });
  };

  const onConvertDistanceUnit = (distanceConversionFactor) => {
    setExerciseSets((prev) => {
      const updatedSetsByExercise = {};

      _.forEach(prev, (sets, exerciseId) => {
        const exercisePreset = exercisePresets[exerciseId];

        // only convert units for cardio exercises
        if (exercisePreset.category === categoryNames.CARDIO) {
          updatedSetsByExercise[exerciseId] = sets.map((row) => {
            return {
              ...row,
              km: row.km * distanceConversionFactor,
            };
          });
        } else {
          updatedSetsByExercise[exerciseId] = sets;
        }
      });

      return updatedSetsByExercise;
    });
  };

  const onFormatExercisesData = (filterCompleted = false) => {
    let weightConversionFactor = 1;
    if (currentWeightUnit === 'lb') {
      // values are stored as KG in the DB
      // need to convert LB weights to KG before we save them
      weightConversionFactor = getWeightConversionFactor('lb', 'kg');
    }

    let distanceConversionFactor = 1;
    if (currentDistanceUnit === 'mi') {
      // values are stored as KM in the DB
      // need to convert MI distances to KM before we save them
      distanceConversionFactor = getDistanceConversionFactor('mi', 'km');
    }

    return _.map(setsByExercise, (sets, exerciseId) => {
      let setsToInclude = sets;

      if (filterCompleted) {
        setsToInclude = _.filter(sets, (set) => set.completed);
      }

      const currentExercise = _.find(
        exercises,
        (item) => item._id === exerciseId
      );

      // each exercise category has different set fields
      let setsData;
      switch (currentExercise.category) {
        case categoryNames.BARBELL:
        case categoryNames.DUMBBELL:
        case categoryNames.MACHINE:
        case categoryNames.OTHER:
        case categoryNames.WEIGHTED_BODYWEIGHT:
        case categoryNames.ASSISTED_BODYWEIGHT: {
          setsData = _.map(setsToInclude, (set) => ({
            kg: set.kg * weightConversionFactor,
            reps: set.reps,
          }));
          break;
        }
        case categoryNames.DURATION: {
          setsData = _.map(setsToInclude, (set) => ({
            duration: set.duration,
            reps: set.reps,
          }));
          break;
        }
        case categoryNames.CARDIO: {
          setsData = _.map(setsToInclude, (set) => ({
            km: set.km * distanceConversionFactor,
            duration: set.duration,
          }));
          break;
        }
        case categoryNames.REPS: {
          setsData = _.map(setsToInclude, (set) => ({
            reps: set.reps,
          }));
          break;
        }
        default: {
          setsData = [];
        }
      }

      return {
        exerciseId,
        sets: setsData,
      };
    });
  };

  return {
    exercises,
    categoryNames,
    bodyPartNames,
    setsByExercise,
    anySetCompleted,
    onAddExercise,
    onAddSavedExercise,
    onAddSet,
    onEditSet,
    onRemoveSet,
    onConvertWeightUnit,
    onConvertDistanceUnit,
    onFormatExercisesData,
  };
}

export default useExercises;
