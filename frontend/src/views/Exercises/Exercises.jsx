import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import _ from 'lodash';

import './Exercises.scss';

import { ExerciseCardList, ContentPlaceholder } from '../../shared';

import ExerciseActions from '../../redux/exercise/actions';

import { usePrevious } from '../../hooks';

const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();
  const { presets, status: exerciseStatus } = useSelector(
    (state) => state.exercise
  );
  const prevExerciseStatus = usePrevious(exerciseStatus);

  const onChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = _.filter(presets, (item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  useEffect(() => {
    dispatch(ExerciseActions.getPresetsRequest());
  }, []);

  useEffect(() => {
    if (prevExerciseStatus && exerciseStatus) {
      if (
        !prevExerciseStatus.getPresetsSuccess &&
        exerciseStatus.getPresetsSuccess
      ) {
        setSearchResults(_.map(presets));
      }
    }
  }, [exerciseStatus, prevExerciseStatus]);

  const loading = exerciseStatus.getPresetsPending;

  return (
    <div className='exercisesView'>
      <div className='exercisesView__header'>Exercises</div>
      <div className='exercisesView__content'>
        {loading ? (
          <div className='exercisesView__placeholders'>
            {Array(10)
              .fill()
              .map((val, index) => (
                <ContentPlaceholder key={index} />
              ))}
          </div>
        ) : (
          <>
            <div className='exercisesView__searchBar'>
              <input
                type='text'
                placeholder='Search'
                value={searchTerm}
                onChange={onChange}
              />
              <FiSearch className='exercisesView__searchBar__icon' />
            </div>
            <ExerciseCardList
              presets={searchResults}
              title='Preset exercises'
              placeholder='No matching exercises found.'
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Exercises;
