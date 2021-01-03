import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { BiFilterAlt } from 'react-icons/bi';
import classnames from 'classnames';
import _ from 'lodash';

import './ExerciseBrowserControls.scss';

import { useExercises, useDropdown } from '../../../hooks';

const ExerciseBrowserControls = ({
  searchTerm,
  filtersBodyPart,
  filtersCategory,
  onSearchChange,
  onFilterSelect,
}) => {
  const { bodyPartNames, categoryNames } = useExercises();
  const [
    bodyPartFilterRef,
    isBodyPartFilterOpen,
    setIsBodyPartFilterOpen,
  ] = useDropdown();
  const [
    categoryFilterRef,
    isCategoryFilterOpen,
    setIsCategoryFilterOpen,
  ] = useDropdown();

  return (
    <div className='exerciseBrowserControls'>
      <div className='exerciseBrowserControls__searchBar'>
        <input
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={onSearchChange}
        />
        <FiSearch className='exerciseBrowserControls__searchBar__icon' />
      </div>
      <div className='exerciseBrowserControls__filters'>
        <div
          className={classnames(
            'exerciseBrowserControls__filter exerciseBrowserControls__filter--bodyPart',
            { active: !_.isEmpty(filtersBodyPart) }
          )}
          ref={bodyPartFilterRef}
          onClick={() => setIsBodyPartFilterOpen(!isBodyPartFilterOpen)}
        >
          <BiFilterAlt />
          <span>Body part</span>
          {isBodyPartFilterOpen ? (
            <div
              className='filterSelection'
              onClick={(e) => e.stopPropagation()}
            >
              {_.map(bodyPartNames, (bodyPartName) => (
                <div
                  key={bodyPartName}
                  className={classnames('filterSelection__item', {
                    selected: filtersBodyPart.includes(bodyPartName),
                  })}
                  onClick={() => onFilterSelect(bodyPartName, 'bodyPart')}
                >
                  {bodyPartName}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div
          className={classnames(
            'exerciseBrowserControls__filter exerciseBrowserControls__filter--category',
            { active: !_.isEmpty(filtersCategory) }
          )}
          ref={categoryFilterRef}
          onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
        >
          <BiFilterAlt />
          <span>Category</span>
          {isCategoryFilterOpen ? (
            <div
              className='filterSelection'
              onClick={(e) => e.stopPropagation()}
            >
              {_.map(categoryNames, (categoryName) => (
                <div
                  key={categoryName}
                  className={classnames('filterSelection__item', {
                    selected: filtersCategory.includes(categoryName),
                  })}
                  onClick={() => onFilterSelect(categoryName, 'category')}
                >
                  {categoryName}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ExerciseBrowserControls;
