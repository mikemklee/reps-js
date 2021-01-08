import React from 'react';
import { useSelector } from 'react-redux';
import { BiTimeFive, BiCalendarCheck } from 'react-icons/bi';
import { FaWeightHanging } from 'react-icons/fa';
import { format, subMinutes, differenceInMinutes } from 'date-fns';
import _ from 'lodash';

import './WorkoutMeta.scss';

import { useExercises, useWeightConverter } from '../../../../hooks';

const WorkoutMeta = ({ item }) => {
  const { currentWeightUnit, computeDisplayedWeight } = useWeightConverter();
  const { categoryNames } = useExercises();
  const { presets: exercisePresets } = useSelector((state) => state.exercise);

  const completedTime = new Date(item.completedAt);
  const startedTime = subMinutes(completedTime, item.duration);
  const minutesElapsed = differenceInMinutes(completedTime, startedTime);

  const formattedCompletedAt = format(
    new Date(item.completedAt),
    'h:mm a EEE, d MMM yyyy'
  );

  const totalVolumeInKG = _.reduce(
    item.exercises,
    (exerciseVolume, exercise) => {
      const exercisePreset = exercisePresets[exercise.exerciseId];

      // don't calculate towards total volumne if exercise category was assisted bodyweight
      if (
        exercisePreset &&
        exercisePreset.category === categoryNames.ASSISTED_BODYWEIGHT
      )
        return exerciseVolume;

      exerciseVolume += _.reduce(
        exercise.sets,
        (setVolume, set) => {
          setVolume += set.kg * set.reps;
          return setVolume;
        },
        0
      );
      return exerciseVolume;
    },
    0
  );

  return (
    <div className='workoutMeta'>
      <div className='workoutMeta__completedAt'>
        <BiCalendarCheck />
        <span>{formattedCompletedAt}</span>
      </div>
      <div className='workoutMeta__duration'>
        <BiTimeFive />
        <span>{minutesElapsed} minutes</span>
      </div>
      <div className='workoutMeta__volume'>
        <FaWeightHanging />
        <span>
          {Number(computeDisplayedWeight(totalVolumeInKG).toFixed(2))}{' '}
          {currentWeightUnit}
        </span>
      </div>
    </div>
  );
};

export default React.memo(WorkoutMeta);
