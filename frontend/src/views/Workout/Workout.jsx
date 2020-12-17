import React, { useState } from 'react';
import Timer from './Timer/TImer';

import './Workout.scss';

const Workout = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className='view-container'>
      <div className='view-header'>Workout</div>
      <div className='view-content'>
        <div className='workout-view'>
          <Timer counter={counter} setCounter={setCounter} />
        </div>
      </div>
    </div>
  );
};

export default Workout;
