import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';

import './Exercise.scss';

const NumberInputCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  onEditCell,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    onEditCell(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

const CheckboxCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  onToggleCell,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = () => {
    setValue(!value);
    onToggleCell(index, id, !value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input type='checkbox' checked={value} onChange={onChange} />;
};

const ButtonCell = ({
  row: { index },
  column: { id },
  onClickCell,
  children,
}) => {
  const onClick = () => {
    onClickCell(index, id);
  };

  return <button onClick={onClick}>{children}</button>;
};

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
        Header: 'Remove',
        accessor: 'id',
        Cell: (props) => <ButtonCell {...props}>Remove</ButtonCell>,
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    // use the skipPageReset option to disable page resetting temporarily
    autoResetPage: !skipPageReset,
    onEditCell,
    onToggleCell,
    onClickCell,
  });

  return (
    <div className='exercise-section'>
      <div className='exercise-name'>{exercise.name}</div>
      {/* Apply the table props */}
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup, headerIndex) => (
              // Apply the header row props
              <tr key={headerIndex} {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column, colIndex) => (
                    // Apply the header cell props
                    <th key={colIndex} {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row, rowIndex) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr key={rowIndex} {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell, cellIndex) => {
                      // Apply the cell props
                      return (
                        <td key={cellIndex} {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Exercise;
