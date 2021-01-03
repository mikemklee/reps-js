import classnames from 'classnames';
import { FiCheck } from 'react-icons/fi';
import _ from 'lodash';

import './ExerciseCardList.scss';

const ExerciseCardList = ({
  exercises,
  title,
  placeholder,
  selectedIds = [],
  onSelectItem = () => {},
}) => {
  return (
    <div className='exerciseCardList'>
      <div className='exerciseCardList__title'>{title}</div>
      <div className='exerciseCardList__cards'>
        {_.isEmpty(exercises) ? (
          <div className='exerciseCardList__placeholder'>{placeholder}</div>
        ) : (
          _.map(exercises, (item) => (
            <div
              key={item._id}
              className={classnames('exerciseCard', {
                selected: selectedIds.includes(item._id),
              })}
              onClick={() => onSelectItem(item)}
            >
              <div className='exerciseCard__title'>{item.name}</div>
              <div className='exerciseCard__details'>
                <span className='exerciseCard__detailValue exerciseCard__detailValue--bodyPart'>
                  {item.bodyPart}
                </span>
              </div>
              <div className='exerciseCard__details'>
                <span className='exerciseCard__detailValue exerciseCard__detailValue--category'>
                  {item.category}
                </span>
              </div>
              {selectedIds.includes(item._id) ? (
                <div className='selectedIcon'>
                  <FiCheck />
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExerciseCardList;
