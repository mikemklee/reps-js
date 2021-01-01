import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import _ from 'lodash';

import './Exercises.scss';

import { ExerciseCardList } from '../../shared';

import ExerciseActions from '../../redux/exercise/actions';

import usePrevious from '../../hooks/usePrevious';

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

  return (
    <div className='exercisesView'>
      <div className='view-header'>Exercises</div>
      <div className='view-content'>
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
      </div>
    </div>
  );
};

export default Exercises;
