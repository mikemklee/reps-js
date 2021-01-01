import React, { useState, useEffect, useCallback } from 'react';
import { useTable, useFlexLayout } from 'react-table';
import { VscAdd, VscClose } from 'react-icons/vsc';

import './Exercise.scss';

import Table from '../Table/Table';
import IntegerInputCell from '../Table/IntegerInputCell/IntegerInputCell';
import DecimalInputCell from '../Table/DecimalInputCell/DecimalInputCell';
import CheckboxCell from '../Table/CheckboxCell/CheckboxCell';
import ButtonCell from '../Table/ButtonCell/ButtonCell';

import useWeightConverter from '../../hooks/useWeightConverter';

const CATEGORIES = {
  BARBELL: 'Barbell',
  DUMBBELL: 'Dumbbell',
  MACHINE: 'Machine',
  OTHERS: 'Others',
  WEIGHTED_BODYWEIGHT: 'Weighted Bodyweight',
  ASSISTED_BODYWEIGHT: 'Assisted Bodyweight',
  DURATION: 'Duration',
  CARDIO: 'Cardio',
  REPS: 'Reps only',
};

const Exercise = ({
  exercise,
  sets,
  onAddSet,
  onEditSet,
  onRemoveSet,
  allowComplete = false,
}) => {
  const [columns, setColumns] = useState([]);

  const { currentUnit } = useWeightConverter();

  const getExerciseFields = useCallback(() => {
    switch (exercise.category) {
      case CATEGORIES.BARBELL:
      case CATEGORIES.DUMBBELL:
      case CATEGORIES.MACHINE:
      case CATEGORIES.OTHERS:
      case CATEGORIES.WEIGHTED_BODYWEIGHT:
      case CATEGORIES.ASSISTED_BODYWEIGHT: {
        let sign;
        if (exercise.category === CATEGORIES.WEIGHTED_BODYWEIGHT) {
          sign = '+';
        } else if (exercise.category === CATEGORIES.ASSISTED_BODYWEIGHT) {
          sign = '-';
        } else {
          sign = '';
        }

        return [
          {
            Header: `${sign}${currentUnit === 'kg' ? 'KG' : 'LB'}`,
            accessor: 'kg',
            Cell: DecimalInputCell,
          },
          {
            Header: 'Reps',
            accessor: 'reps',
            Cell: IntegerInputCell,
          },
        ];
      }
      case CATEGORIES.DURATION: {
        return [
          {
            Header: 'Time',
            accessor: 'duration',
            Cell: () => 'show time',
          },
        ];
      }
      case CATEGORIES.CARDIO: {
        return [
          {
            Header: 'km',
            accessor: 'km', // convert between miles and km
            Cell: DecimalInputCell,
          },
          {
            Header: 'Time',
            accessor: 'duration',
            Cell: () => 'show time',
          },
        ];
      }
      case CATEGORIES.REPS: {
        return [
          {
            Header: 'Reps',
            accessor: 'reps',
            Cell: IntegerInputCell,
          },
        ];
      }
      default: {
        return [];
      }
    }
  }, [exercise, currentUnit]);

  useEffect(() => {
    // TODO: query previous record and show as separate column

    // TODO: define different set of columns for different exercise category
    const exerciseFields = getExerciseFields();

    const displayedColumns = [
      {
        Header: 'Set',
        accessor: 'set',
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: '',
        accessor: 'previous',
        Cell: () => <div style={{ background: 'red' }}></div>, // TODO: query previous record?
      },
      ...exerciseFields,
    ];

    // include column for set complete button, if allowed
    if (allowComplete) {
      displayedColumns.push({
        Header: 'Completed',
        accessor: 'completed',
        Cell: CheckboxCell,
      });
    }

    // finally, include a column for set remove button
    displayedColumns.push({
      Header: '',
      accessor: 'id',
      Cell: (props) => (
        <ButtonCell {...props}>
          <VscClose />
        </ButtonCell>
      ),
    });

    setColumns(displayedColumns);
  }, [currentUnit, exercise]);

  const [skipPageReset, setSkipPageReset] = useState(false);

  const onEditCell = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    onEditSet(exercise, rowIndex, columnId, value);
  };

  const onToggleCell = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    onEditSet(exercise, rowIndex, columnId, value);
  };

  const onClickCell = (rowIndex) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    onRemoveSet(exercise, rowIndex);
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  useEffect(() => {
    setSkipPageReset(false);
  }, [sets]);

  const tableInstance = useTable({
    data: sets,
    columns,
    autoResetPage: !skipPageReset, // use `skipPageReset` to disable page reset temporarily
    onEditCell, // required for NumberInputCell
    onToggleCell, // required for CheckboxCell
    onClickCell, // required for ButtonCell
    useFlexLayout,
  });

  return (
    <div className='exercise-section'>
      <div className='exercise-name'>{exercise.name}</div>
      {sets.length ? (
        <div className='exercise-sets'>
          <Table instance={tableInstance} />
        </div>
      ) : null}
      <button className='add-set-btn' onClick={() => onAddSet(exercise)}>
        <VscAdd />
        <span>Add set</span>
      </button>
    </div>
  );
};

export default Exercise;
