import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BiTimeFive, BiCalendarCheck } from 'react-icons/bi';
import { FaWeightHanging } from 'react-icons/fa';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import './WorkoutMeta.scss';

import { NumberInput } from '../../../../shared';
import { useExercises, useWeightConverter } from '../../../../hooks';

const WorkoutMeta = ({
  item,
  vertical = false,
  showVolume = false,
  editable = false,
}) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedDuration, handleDurationChange] = useState(0);

  const { currentWeightUnit, computeDisplayedWeight } = useWeightConverter();
  const { categoryNames } = useExercises();

  const { presets: exercisePresets } = useSelector((state) => state.exercise);

  const formattedDuration = moment.duration(item.duration, 'seconds').minutes();
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

  const editableDurationField = () => {
    return (
      <>
        <NumberInput /> minutes
      </>
    );
  };

  const staticDurationField = () => {
    return <span>{formattedDuration} minutes</span>;
  };

  return (
    <div className={classnames('workoutMeta', { vertical })}>
      <div className='workoutMeta__completedAt'>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <BiCalendarCheck className='icon' />
          <DateTimePicker
            InputProps={{ disableUnderline: true }}
            className={classnames('picker', { editable })}
            value={selectedDate}
            format='h:mm a EEE, d MMM yyyy'
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className='workoutMeta__duration'>
        <BiTimeFive className='icon' />
        {editable ? editableDurationField() : staticDurationField()}
      </div>
      {showVolume ? (
        <div className='workoutMeta__volume'>
          <FaWeightHanging className='icon' />
          <span>
            {Number(computeDisplayedWeight(totalVolumeInKG).toFixed(2))}{' '}
            {currentWeightUnit}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(WorkoutMeta);
