import React from 'react';
import classnames from 'classnames';
import { FiCheck } from 'react-icons/fi';

import './ExerciseCardList.scss';

const ExerciseCardList = ({
  presets,
  selectedIds = [],
  onSelectItem = () => {},
}) => {
  return (
    <div className='exerciseCardList'>
      {presets.map((item) => (
        <div
          key={item._id}
          className={classnames('exerciseCard', {
            selected: selectedIds.includes(item._id),
          })}
          onClick={() => onSelectItem(item)}
        >
          <div className='exerciseCard__title'>{item.name}</div>
          <div className='exerciseCard__details'>
            <span className='exerciseCard__detailKey'>Targets</span>
            {item.bodyParts.map((part, index) => (
              <span
                key={index}
                className='exerciseCard__detailValue exerciseCard__detailValue--bodypart'
              >
                {part}
              </span>
            ))}
          </div>
          <div className='exerciseCard__details'>
            <span className='exerciseCard__detailKey'>Category</span>
            <span className='exerciseCard__detailValue exerciseCard__detailValue--category'>
              {item.category}
            </span>
          </div>
          {selectedIds.includes(item._id) ? (
            <div className='selected-icon'>
              <FiCheck />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default ExerciseCardList;
