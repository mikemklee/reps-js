import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import './ExerciseSummary.scss';

import WeightSet from './WeightSet/WeightSet';
import DurationSet from './DurationSet/DurationSet';
import CardioSet from './CardioSet/CardioSet';
import RepsSet from './RepsSet/RepsSet';

import { useExercises } from '../../../../hooks';

const ExerciseSummary = ({ exercise, isExpanded }) => {
  const { presets } = useSelector((state) => state.exercise);
  const { categoryNames } = useExercises();

  const exercisePreset = presets[exercise.exerciseId];
  if (!exercisePreset) return null;

  return (
    <div className='exerciseSummary'>
      <div className='exerciseSummary__name'>
        {!isExpanded && <span>{exercise.sets.length} x </span>}
        {exercisePreset.name}
      </div>
      <div className='exerciseSummary__setList'>
        {isExpanded &&
          _.map(exercise.sets, (set, index) => {
            // check assosiated preset's category
            switch (exercisePreset.category) {
              case categoryNames.BARBELL:
              case categoryNames.DUMBBELL:
              case categoryNames.MACHINE:
              case categoryNames.OTHER:
              case categoryNames.WEIGHTED_BODYWEIGHT:
              case categoryNames.ASSISTED_BODYWEIGHT: {
                let sign;
                if (
                  exercisePreset.category === categoryNames.WEIGHTED_BODYWEIGHT
                ) {
                  sign = '+';
                } else if (
                  exercisePreset.category === categoryNames.ASSISTED_BODYWEIGHT
                ) {
                  sign = '-';
                } else {
                  sign = '';
                }

                return (
                  <WeightSet key={index} index={index} set={set} sign={sign} />
                );
              }
              case categoryNames.DURATION: {
                return <DurationSet key={index} index={index} set={set} />;
              }
              case categoryNames.CARDIO: {
                return <CardioSet key={index} index={index} set={set} />;
              }
              case categoryNames.REPS: {
                return <RepsSet key={index} index={index} set={set} />;
              }
              default: {
                return null;
              }
            }
          })}
      </div>
    </div>
  );
};

export default ExerciseSummary;
