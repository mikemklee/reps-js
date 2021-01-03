import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import _ from 'lodash';

import './ExerciseBrowser.scss';

import ExerciseCardList from '../ExerciseCardList/ExerciseCardList';

const ExerciseBrowser = ({
  customExercises,
  presetExercises,
  selectedIds,
  onSelectItem,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResultsCustom, setSearchResultsCustom] = useState([]);
  const [searchResultsPreset, setSearchResultsPreset] = useState([]);

  const onChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const resultsCustom = _.filter(customExercises, (item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    const resultsPreset = _.filter(presetExercises, (item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setSearchResultsCustom(resultsCustom);
    setSearchResultsPreset(resultsPreset);
  }, [searchTerm]);

  return (
    <div className='exerciseBrowser'>
      <div className='exerciseBrowser__searchBar'>
        <input
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={onChange}
        />
        <FiSearch className='exerciseBrowser__searchBar__icon' />
      </div>
      <ExerciseCardList
        exercises={searchResultsCustom}
        title='Custom exercises'
        placeholder={
          _.isEmpty(customExercises)
            ? "You don't have any custom exercises yet."
            : 'No matching exercises found.'
        }
        selectedIds={selectedIds}
        onSelectItem={onSelectItem}
      />
      <ExerciseCardList
        exercises={searchResultsPreset}
        title='Preset exercises'
        placeholder='No matching exercises found.'
        selectedIds={selectedIds}
        onSelectItem={onSelectItem}
      />
    </div>
  );
};

export default ExerciseBrowser;
