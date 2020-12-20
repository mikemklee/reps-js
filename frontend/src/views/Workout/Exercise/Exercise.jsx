import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useTable, useFlexLayout } from 'react-table';
import { VscAdd, VscClose } from 'react-icons/vsc';

import './Exercise.scss';

import Table from '../../../shared/Table/Table';
import NumberInputCell from '../../../shared/Table/NumberInputCell/NumberInputCell';
import CheckboxCell from '../../../shared/Table/CheckboxCell/CheckboxCell';
import ButtonCell from '../../../shared/Table/ButtonCell/ButtonCell';

const Exercise = ({ exercise }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Set',
        accessor: 'set',
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: 'Previous',
        accessor: 'previous',
        Cell: () => 'test', // TODO: query previous record?
      },
      {
        Header: 'kg',
        accessor: 'kg',
        Cell: NumberInputCell,
      },
      {
        Header: 'Reps',
        accessor: 'reps',
        Cell: NumberInputCell,
      },
      {
        Header: 'Completed',
        accessor: 'completed',
        Cell: CheckboxCell,
      },
      {
        Header: '',
        accessor: 'id',
        Cell: (props) => (
          <ButtonCell {...props}>
            <VscClose />
          </ButtonCell>
        ),
      },
    ],
    []
  );

  const [skipPageReset, setSkipPageReset] = useState(false);
  const [data, setData] = useState([]);

  const onEditCell = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const onToggleCell = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const onRemoveSet = (rowIndex) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);

    // remove this row
    setData((old) => _.filter(old, (_item, index) => index !== rowIndex));
  };

  const onAddSet = () => {
    setData([
      ...data,
      {
        id: data.length + 1,
        set: data.length + 1,
        previous: '',
        kg: 0,
        reps: 0,
        completed: false,
      },
    ]);
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  const tableInstance = useTable({
    data,
    columns,
    autoResetPage: !skipPageReset, // use `skipPageReset` to disable page reset temporarily
    onEditCell, // required for NumberInputCell
    onToggleCell, // required for CheckboxCell
    onClickCell: onRemoveSet, // required for ButtonCell
    useFlexLayout,
  });

  return (
    <div className='exercise-section'>
      <div className='exercise-name'>{exercise.name}</div>
      {data.length ? (
        <div className='exercise-sets'>
          <Table instance={tableInstance} />
        </div>
      ) : null}
      <button className='add-set-btn' onClick={onAddSet}>
        <VscAdd />
        <span>Add set</span>
      </button>
    </div>
  );
};

export default Exercise;
