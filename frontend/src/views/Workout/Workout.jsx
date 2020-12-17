import React, { useState } from 'react';
import Timer from './Timer/TImer';

import './Workout.scss';

const Workout = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className='workout-view'>
      <div className='view-header'>Workout</div>
      <div className='view-content'>
        <Timer counter={counter} setCounter={setCounter} />
      </div>
    </div>
  );
};

export default Workout;
