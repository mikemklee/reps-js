import React from 'react';
import { useHistory } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import _ from 'lodash';

import './LogItem.scss';
import LogItemExercise from './LogItemExercise/LogItemExercise';
import LogItemMeta from './LogItemMeta/LogItemMeta';

const LogItem = ({ item }) => {
  const history = useHistory();

  return (
    <div className='logs-item'>
      <div className='logs-item-name'>{item.name}</div>
      <LogItemMeta showVolume item={item} />
      <div className='logs-item-exercises'>
        {_.map(item.exercises, (exercise) => (
          <LogItemExercise key={exercise.presetId} exercise={exercise} />
        ))}
      </div>
      <div className='logs-item-buttons'>
        <div
          className='logs-item__button'
          onClick={() => history.push(`/workout/${item._id}/edit`)}
        >
          <BiEditAlt />
        </div>
      </div>
    </div>
  );
};

export default LogItem;
