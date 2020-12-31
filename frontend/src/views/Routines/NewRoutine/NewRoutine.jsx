import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import classnames from 'classnames';
import _ from 'lodash';

import './NewRoutine.scss';

import { Exercise, Modal, AddExercise, Confirmation } from '../../../shared';

import RoutineActions from '../../../redux/routine/actions';
import ExerciseActions from '../../../redux/exercise/actions';

import usePrevious from '../../../hooks/usePrevious';
import useExercises from '../../../hooks/useExercises';
import useWeightConverter from '../../../hooks/useWeightConverter';

const NewRoutine = () => {
  const [title, setTitle] = useState('');
  const {
    exercises,
    setsByExercise,
    onAddExercise,
    onAddSet,
    onEditSet,
    onRemoveSet,
    onConvertUnit,
    onFormatExercisesData,
  } = useExercises();

  const { currentUnit, getConversionFactor } = useWeightConverter();

  const addExerciseModalRef = useRef(null);
  const saveRoutineModalRef = useRef(null);

  const { status: routineStatus } = useSelector((state) => state.routine);
  const { presets: exercisePresets, status: exerciseStatus } = useSelector(
    (state) => state.exercise
  );
  const prevRoutineStatus = usePrevious(routineStatus);
  const prevExerciseStatus = usePrevious(exerciseStatus);
  const prevUnit = usePrevious(currentUnit);

  const dispatch = useDispatch();
  const history = useHistory();
  const { workoutId } = useParams();

  useEffect(() => {
    dispatch(ExerciseActions.getPresetsRequest());
  }, []);

  useEffect(() => {
    if (prevRoutineStatus && routineStatus) {
      if (
        !prevRoutineStatus.saveRoutineSuccess &&
        routineStatus.saveRoutineSuccess
      ) {
        history.push('/routines');
        return;
      }
    }

    if (prevExerciseStatus && exerciseStatus) {
      if (
        !prevExerciseStatus.getPresetsSuccess &&
        exerciseStatus.getPresetsSuccess
      ) {
        populateExerciseSections();
      }
    }
  }, [routineStatus, prevRoutineStatus, exerciseStatus, prevExerciseStatus]);

  useEffect(() => {
    if (!_.isEqual(prevUnit, currentUnit)) {
      const conversionFactor = getConversionFactor(prevUnit, currentUnit);
      onConvertUnit(conversionFactor);
    }
  }, [prevUnit, currentUnit]);

  const populateExerciseSections = () => {
    if (workoutId) {
      if (workoutId === 'new') {
        // creating routine from scratch; just update routine title
        setTitle('New routine');
      } else {
        // creating routine from saved workout
        // TODO: populate exercises with workout data
      }
    }
  };

  const onSaveRoutine = () => {
    let conversionFactor = 1;
    if (currentUnit === 'lb') {
      // values are stored as KG in the DB
      // need to convert LB weights to KG before we save them
      conversionFactor = getConversionFactor('lb', 'kg');
    }

    const formattedData = {
      name: title,
      exercises: onFormatExercisesData(conversionFactor),
    };

    dispatch(RoutineActions.saveRoutineRequest(formattedData));
  };

  return (
    <div className='workoutView'>
      <div className='workoutView__header'>
        <input
          className='workoutView__title workoutView__title--editable'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='workoutView__content'>
        <div className='workout-controls'>
          <div className='workout-controls-actions'>
            <button
              className='cancel-workout-btn'
              onClick={() => history.goBack()}
            >
              <span>Cancel</span>
            </button>
            <button
              className={classnames({
                'finish-workout-btn': true,
                disabled: _.isEmpty(setsByExercise),
              })}
              onClick={() => saveRoutineModalRef.current.open()}
            >
              <span>Save</span>
            </button>
          </div>
        </div>
        {exercises.map((exercise) => (
          <Exercise
            key={exercise._id}
            exercise={exercise}
            sets={setsByExercise[exercise._id] || []}
            onAddSet={onAddSet}
            onEditSet={onEditSet}
            onRemoveSet={onRemoveSet}
          />
        ))}
        <button
          className='add-exercise-btn'
          onClick={() => addExerciseModalRef.current.open()}
        >
          <VscAdd />
          <span>Add exercise</span>
        </button>
      </div>
      <Modal ref={addExerciseModalRef}>
        <AddExercise
          exercisePresets={exercisePresets}
          selectedExercises={exercises}
          onAddExercise={(item) => {
            onAddExercise(item);
            addExerciseModalRef.current.close();
          }}
        />
      </Modal>
      <Modal ref={saveRoutineModalRef}>
        <Confirmation
          title='Save routine'
          subtitle={
            <>
              <p>Are you sure you would like to save this routine?</p>
              <p>Any invalid or empty sets will not be saved.</p>
            </>
          }
          onCancel={() => saveRoutineModalRef.current.close()}
          onConfirm={onSaveRoutine}
        />
      </Modal>
    </div>
  );
};

export default NewRoutine;
