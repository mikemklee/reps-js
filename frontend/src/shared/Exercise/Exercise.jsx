import React, { useState, useEffect } from 'react';
import { useTable, useFlexLayout } from 'react-table';
import { VscAdd, VscClose } from 'react-icons/vsc';

import './Exercise.scss';

import Table from '../Table/Table';
import NumberInputCell from '../Table/NumberInputCell/NumberInputCell';
import CheckboxCell from '../Table/CheckboxCell/CheckboxCell';
import ButtonCell from '../Table/ButtonCell/ButtonCell';

import useWeightConverter from '../../hooks/useWeightConverter';

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

  useEffect(() => {
    // TODO: define different set of columns for different exercise category
    // TODO: query previous record and show as separate column
    const displayedColumns = [
      {
        Header: 'Set',
        accessor: 'set',
        Cell: ({ row }) => row.index + 1,
      },
      // {
      //   Header: 'Previous',
      //   accessor: 'previous',
      //   Cell: () => 'test', // TODO: query previous record?
      // },
      {
        Header: currentUnit === 'kg' ? 'KG' : 'LB',
        accessor: 'kg',
        Cell: NumberInputCell,
      },
      {
        Header: 'Reps',
        accessor: 'reps',
        Cell: NumberInputCell,
      },
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
  }, [currentUnit]);

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
