import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';

import './ExerciseBrowser.scss';

import ExerciseCardList from '../ExerciseCardList/ExerciseCardList';
import ExerciseBrowserControls from './ExerciseBrowserControls/ExerciseBrowserControls';

const ExerciseBrowser = ({
  customExercises,
  presetExercises,
  selectedIds,
  onSelectItem,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultsCustom, setResultsCustom] = useState([]);
  const [resultsPreset, setResultsPreset] = useState([]);
  const [filtersBodyPart, setFiltersBodyPart] = useState([]);
  const [filtersCategory, setFiltersCategory] = useState([]);

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onFilterCategorySelect = (categoryName) => {
    setFiltersCategory((prev) => {
      if (prev.includes(categoryName)) {
        // remove it from existing filters
        return _.filter(prev, (item) => item !== categoryName);
      } else {
        // add it to existing filters
        return [...prev, categoryName];
      }
    });
  };

  const onFilterBodyPartSelect = (bodyPartName) => {
    setFiltersBodyPart((prev) => {
      if (prev.includes(bodyPartName)) {
        // remove it from existing filters
        return _.filter(prev, (item) => item !== bodyPartName);
      } else {
        // add it to existing filters
        return [...prev, bodyPartName];
      }
    });
  };

  const checkSearchAndFiltersMatch = useCallback(
    (item) => {
      const nameMatch = item.name.toLowerCase().includes(searchTerm);

      let categoryMatch;
      if (_.isEmpty(filtersCategory)) {
        // no category filter selected;
        categoryMatch = true;
      } else {
        // category filters selected; check if this exercise matches those categories
        categoryMatch = filtersCategory.includes(item.category);
      }

      let bodyPartMatch;
      if (_.isEmpty(filtersBodyPart)) {
        // no body part filter selected;
        bodyPartMatch = true;
      } else {
        // body part filters selected; check if this exercise matches those body parts
        bodyPartMatch = filtersBodyPart.includes(item.bodyPart);
      }

      return nameMatch && categoryMatch && bodyPartMatch;
    },
    [searchTerm, filtersCategory, filtersBodyPart]
  );

  useEffect(() => {
    const resultsCustom = _.filter(customExercises, checkSearchAndFiltersMatch);
    const resultsPreset = _.filter(presetExercises, checkSearchAndFiltersMatch);
    setResultsCustom(resultsCustom);
    setResultsPreset(resultsPreset);
  }, [searchTerm, filtersCategory, filtersBodyPart]);

  return (
    <div className='exerciseBrowser'>
      <ExerciseBrowserControls
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        filtersBodyPart={filtersBodyPart}
        onFilterBodyPartSelect={onFilterBodyPartSelect}
        filtersCategory={filtersCategory}
        onFilterCategorySelect={onFilterCategorySelect}
      />
      <ExerciseCardList
        exercises={resultsCustom}
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
        exercises={resultsPreset}
        title='Preset exercises'
        placeholder='No matching exercises found.'
        selectedIds={selectedIds}
        onSelectItem={onSelectItem}
      />
    </div>
  );
};

export default ExerciseBrowser;
