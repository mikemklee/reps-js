import React, { useState, useEffect } from 'react';
import { useTable, useFlexLayout } from 'react-table';
import { VscClose } from 'react-icons/vsc';

import './Exercise.scss';

import Table from '../../../shared/Table/Table';
import NumberInputCell from '../../../shared/Table/NumberInputCell/NumberInputCell';
import CheckboxCell from '../../../shared/Table/CheckboxCell/CheckboxCell';
import ButtonCell from '../../../shared/Table/ButtonCell/ButtonCell';

const Exercise = ({ exercise }) => {
  const iniitalData = React.useMemo(
    () => [
      {
        id: 1,
        set: 1,
        previous: '15kg x 12',
        kg: 15,
        reps: 12,
        completed: false,
      },
      {
        id: 2,
        set: 2,
        previous: '15kg x 12',
        kg: 15,
        reps: 12,
        completed: false,
      },
      {
        id: 3,
        set: 3,
        previous: '15kg x 12',
        kg: 15,
        reps: 12,
        completed: false,
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Set',
        accessor: 'set',
      },
      {
        Header: 'Previous',
        accessor: 'previous',
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
  const [data, setData] = useState(iniitalData);

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

  const onClickCell = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);

    // no need to update data; what do we want to do here?
    console.log('cell clicked; what do i do?', rowIndex, columnId, value);
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
    onClickCell, // required for ButtonCell
    useFlexLayout,
  });

  return (
    <div className='exercise-section'>
      <div className='exercise-name'>{exercise.name}</div>
      <div className='exercise-sets'>
        <Table instance={tableInstance} />
      </div>
    </div>
  );
};

export default Exercise;
