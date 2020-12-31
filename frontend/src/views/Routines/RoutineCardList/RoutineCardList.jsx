import React from 'react';
import _ from 'lodash';

import './RoutineCardList.scss';

import RoutineCard from '../RoutineCard/RoutineCard';

const RoutineCardList = ({
  title,
  routines,
  exerciseNames,
  placeholder,
  onDeleteRoutine = () => {},
}) => {
  return (
    <div className='routineCardList'>
      <div className='routineCardList__title'>{title}</div>
      <div className='routineCardList__routines'>
        {_.isEmpty(routines) ? (
          <div className='routineCardList__placeholder'>{placeholder}</div>
        ) : (
          _.map(routines, (item) => (
            <RoutineCard
              key={item._id}
              routine={item}
              exerciseNames={exerciseNames}
              onClickDelete={onDeleteRoutine}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RoutineCardList;
