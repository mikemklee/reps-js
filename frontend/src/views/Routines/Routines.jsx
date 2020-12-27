import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Routines.scss';

import ExerciseActions from '../../redux/exercise/actions';
import RoutineActions from '../../redux/routine/actions';

const Routines = () => {
  const dispatch = useDispatch();
  const { presets: exercisePresets, status: exerciseStatus } = useSelector(
    (state) => state.exercise
  );
  const { presets: routinePresets, status: routineStatus } = useSelector(
    (state) => state.routine
  );

  useEffect(() => {
    dispatch(ExerciseActions.getPresetsRequest());
    dispatch(RoutineActions.getPresetsRequest());
  }, []);

  const loading =
    exerciseStatus.getPresetsPending || routineStatus.getPresetsPending;

  return (
    <div className='routines-view'>
      <div className='view-header'>Routines</div>
      <div className='view-content'>
        {loading ? (
          'loading'
        ) : (
          <div className='routines'>
            {routinePresets.map((item) => (
              <div key={item._id} className='card'>
                <div className='card__title'>{item.name}</div>
                <div className='card__exerciseList'>
                  {item.exercises.map((exercise) => {
                    const exerciseData = exercisePresets.find(
                      (item) => item._id === exercise.presetId
                    );
                    return (
                      <div
                        key={exercise.presetId}
                        className='card__exerciseItem'
                      >
                        {exerciseData.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Routines;
