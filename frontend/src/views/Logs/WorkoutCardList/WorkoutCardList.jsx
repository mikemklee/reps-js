import React from 'react';
import _ from 'lodash';

import WorkoutCard from '../WorkoutCard/WorkoutCard';

import './WorkoutCardList.scss';

const WorkoutCardList = ({
  title,
  workoutLogs,
  placeholder,
  onDeleteWorkout,
}) => {
  return (
    <div className='workoutCardList'>
      <div className='workoutCardList__title'>{title}</div>
      <div className='workoutCardList__workouts'>
        {_.isEmpty(workoutLogs) ? (
          <div className='workoutCardList__placeholder'>{placeholder}</div>
        ) : (
          _.map(
            _.orderBy(workoutLogs, (log) => log.completedAt, 'desc'),
            (workout, index) => (
              <WorkoutCard
                key={index}
                workout={workout}
                onClickDelete={onDeleteWorkout}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default WorkoutCardList;
