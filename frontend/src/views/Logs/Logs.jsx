import React from 'react';
import Grid from '@toast-ui/react-grid';
import 'tui-grid/dist/tui-grid.css';

import './Logs.scss';

import dummyData from './dummy';

const Logs = () => {
  const columns = [
    { name: 'workout', header: 'Workout', filter: 'select' },
    { name: 'routine', header: 'Routine', filter: 'select' },
    { name: 'weight', header: 'kg' },
    { name: 'reps', header: 'Reps' },
    { name: 'startDate', header: 'Start', sortingType: 'asc', sortable: true },
    { name: 'endDate', header: 'End', sortingType: 'asc', sortable: true },
  ];

  return (
    <div className='logs-view'>
      <div className='view-header'>Logs</div>
      <div className='view-content'>
        <Grid
          data={dummyData}
          columns={columns}
          columnOptions={{
            resizable: true,
          }}
          rowHeight={25}
          header={{
            align: 'left',
          }}
          bodyHeight='fitToParent'
          rowHeaders={['checkbox']}
        />
      </div>
    </div>
  );
};

export default Logs;
