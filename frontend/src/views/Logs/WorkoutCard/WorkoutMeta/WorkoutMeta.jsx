import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BiTimeFive, BiCalendarCheck } from 'react-icons/bi';
import { FaWeightHanging } from 'react-icons/fa';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';

// MUI
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';

import './WorkoutMeta.scss';

import { useExercises, useWeightConverter } from '../../../../hooks';

// define MUI theme
const defaultMaterialTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#0078ff',
    },
    background: {
      default: '#21252b',
      paper: '#282c34',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Open Sans',
      'Noto Sans KR',
    ],
  },
});

const WorkoutMeta = ({ item, vertical = false, showVolume = false }) => {
  const [selectedDate, handleDateChange] = useState(new Date());

  const { currentWeightUnit, computeDisplayedWeight } = useWeightConverter();
  const { categoryNames } = useExercises();

  const { presets: exercisePresets } = useSelector((state) => state.exercise);

  const formattedCompletedAt = moment(item.completedAt).format(
    'h:mm A dddd, Do MMM YYYY'
  );
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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classnames('workoutMeta', { vertical })}>
        <ThemeProvider theme={defaultMaterialTheme}>
          <DateTimePicker
            className='workoutMeta__dateAndTime'
            value={selectedDate}
            format='h:mm a EEE, d MMM yyyy'
            onChange={handleDateChange}
          />
        </ThemeProvider>
        {/* <div className='workoutMeta__completedAt'>
          <BiCalendarCheck />
          <span>{formattedCompletedAt}</span>
        </div> */}
        <div className='workoutMeta__duration'>
          <BiTimeFive />
          <span>{formattedDuration} minutes</span>
        </div>
        {showVolume ? (
          <div className='workoutMeta__volume'>
            <FaWeightHanging />
            <span>
              {Number(computeDisplayedWeight(totalVolumeInKG).toFixed(2))}{' '}
              {currentWeightUnit}
            </span>
          </div>
        ) : null}
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default React.memo(WorkoutMeta);
