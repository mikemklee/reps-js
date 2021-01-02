import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import { FaStopwatch } from 'react-icons/fa';
import classnames from 'classnames';
import _ from 'lodash';

import './WorkoutTemplate.scss';

import WorkoutMeta from '../../views/Logs/WorkoutCard/WorkoutMeta/WorkoutMeta';

import {
  DurationTimer,
  RestTimer,
  Exercise,
  Modal,
  AddExercise,
  Confirmation,
} from '../../shared';

import { InterfaceUtils } from '../../utils';

import WorkoutActions from '../../redux/workout/actions';
import RoutineActions from '../../redux/routine/actions';
import ExerciseActions from '../../redux/exercise/actions';

import usePrevious from '../../hooks/usePrevious';
import useExercises from '../../hooks/useExercises';
import useWeightConverter from '../../hooks/useWeightConverter';

const WorkoutTemplate = ({ useFor }) => {
  const [templateName, setTemplateName] = useState('');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [workout, setWorkout] = useState(null);

  const {
    exercises,
    setsByExercise,
    anySetCompleted,
    onAddExercise,
    onAddSavedExercise,
    onAddSet,
    onEditSet,
    onRemoveSet,
    onConvertUnit,
    onFormatExercisesData,
  } = useExercises();

  const { currentWeightUnit, getWeightConversionFactor } = useWeightConverter();

  const counterRef = useRef(null);
  const restTimerModalRef = useRef(null);
  const addExerciseModalRef = useRef(null);
  const cancelModalRef = useRef(null);
  const saveModalRef = useRef(null);

  const { workoutLogs, status: workoutStatus } = useSelector(
    (state) => state.workout
  );
  const { presetRoutines, customRoutines, status: routineStatus } = useSelector(
    (state) => state.routine
  );
  const { presets: exercisePresets, status: exerciseStatus } = useSelector(
    (state) => state.exercise
  );

  const prevWorkoutStatus = usePrevious(workoutStatus);
  const prevRoutineStatus = usePrevious(routineStatus);
  const prevExerciseStatus = usePrevious(exerciseStatus);
  const prevWeightUnit = usePrevious(currentWeightUnit);

  const dispatch = useDispatch();
  const history = useHistory();
  const { workoutId, routineId } = useParams();

  const [
    saveModalTitle,
    saveModalSubtitle,
    cancelModalTitle,
    cancelModalSubtitle,
  ] = useMemo(() => {
    if (useFor === 'NEW_WORKOUT') {
      return [
        'Finish workout',
        <>
          <p>Are you sure you would like to finish this workout session?</p>
          <p>Any invalid or empty sets will not be saved.</p>
        </>,
        'Cancel workout',
        <>
          <p>Are you sure you would like to cancel this workout session?</p>
          <p>Any recorded data for the session will be lost.</p>
        </>,
      ];
    }
    if (useFor === 'EDIT_WORKOUT') {
      return [
        'Edit workout',
        <>
          <p>Are you sure you would like to edit this workout session?</p>
          <p>Any existing data will be overriden.</p>
        </>,
      ];
    }
    if (useFor === 'NEW_ROUTINE') {
      return [
        'Save routine',
        <>
          <p>Are you sure you would like to save this routine?</p>
          <p>Any invalid or empty sets will not be saved.</p>
        </>,
      ];
    }
    if (useFor === 'EDIT_ROUTINE') {
      return [
        'Edit routine',
        <>
          <p>Are you sure you would like to edit this routine?</p>
          <p>Any invalid or empty sets will not be saved.</p>
        </>,
      ];
    }
  }, [useFor]);

  useEffect(() => {
    dispatch(ExerciseActions.getPresetsRequest());
  }, []);

  useEffect(() => {
    // redirect logic for workout actions
    if (prevWorkoutStatus && workoutStatus) {
      if (useFor === 'NEW_WORKOUT' || useFor === 'EDIT_WORKOUT') {
        const workoutCreated =
          !prevWorkoutStatus.saveWorkoutSuccess &&
          workoutStatus.saveWorkoutSuccess;
        const workoutEdited =
          !prevWorkoutStatus.editWorkoutSuccess &&
          workoutStatus.editWorkoutSuccess;
        if (workoutCreated || workoutEdited) {
          history.push('/logs');
          return;
        }
      }
    }

    // redirect logic for routine actions
    if (prevRoutineStatus && routineStatus) {
      if (useFor === 'NEW_ROUTINE' || useFor === 'EDIT_ROUTINE') {
        const routineCreated =
          !prevRoutineStatus.saveRoutineSuccess &&
          routineStatus.saveRoutineSuccess;
        const routineEdited =
          !prevRoutineStatus.editCustomRoutineSuccess &&
          routineStatus.editCustomRoutineSuccess;
        if (routineCreated || routineEdited) {
          history.push('/routines');
          return;
        }
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
  }, [
    workoutStatus,
    prevWorkoutStatus,
    routineStatus,
    prevRoutineStatus,
    exerciseStatus,
    prevExerciseStatus,
  ]);

  useEffect(() => {
    if (!_.isEqual(prevWeightUnit, currentWeightUnit)) {
      const conversionFactor = getWeightConversionFactor(
        prevWeightUnit,
        currentWeightUnit
      );
      onConvertUnit(conversionFactor);
    }
  }, [prevWeightUnit, currentWeightUnit]);

  const populateExerciseSections = () => {
    if (useFor === 'NEW_WORKOUT') {
      setTemplateName('New workout');
      if (routineId) {
        if (routineId === 'new') {
          // blank workout; just update workout title
          setTitle(`New ${InterfaceUtils.getTimeOfDay()} workout`);
        } else {
          // routine workout; populate exercises with routine data
          const allRoutines = {
            ...presetRoutines,
            ...customRoutines,
          };

          const currentRoutine = allRoutines[routineId];
          if (!currentRoutine) {
            // no routine data available; redirect to home page
            history.push('/');
          } else {
            let conversionFactor = 1;
            if (currentWeightUnit === 'lb') {
              // values are stored as KG in the DB
              // need to convert KG weights to LB before we use them
              conversionFactor = getWeightConversionFactor('kg', 'lb');
            }

            // update workout title
            setTitle(currentRoutine.name);

            // add exercises
            _.forEach(currentRoutine.exercises, (item) => {
              // DX: skip exercises that are already included
              if (setsByExercise[item.exerciseId]) return;
              const exercisePreset = exercisePresets[item.exerciseId];
              onAddSavedExercise(item, exercisePreset, conversionFactor, false);
            });
          }
        }
      }
      return;
    }
    if (useFor === 'EDIT_WORKOUT') {
      setTemplateName('Edit workout');
      if (workoutId) {
        if (_.isEmpty(workoutLogs)) {
          // no workout data available; redirect to home page
          history.push('/');
        } else {
          const currentWorkout = workoutLogs[workoutId];

          let conversionFactor = 1;
          if (currentWeightUnit === 'lb') {
            // values are stored as KG in the DB
            // need to convert KG weights to LB before we use them
            conversionFactor = getWeightConversionFactor('kg', 'lb');
          }

          // set workout
          setTitle(currentWorkout.name);
          setDuration(currentWorkout.duration);
          setWorkout(currentWorkout);

          // add exercises
          _.forEach(currentWorkout.exercises, (item) => {
            // DX: skip exercises that are already included
            if (setsByExercise[item.exerciseId]) return;
            const exercisePreset = exercisePresets[item.exerciseId];
            onAddSavedExercise(item, exercisePreset, conversionFactor, true);
          });
        }
      }
      return;
    }
    if (useFor === 'NEW_ROUTINE') {
      setTemplateName('New routine');
      if (workoutId) {
        if (workoutId === 'new') {
          // creating routine from scratch; just update routine title
          setTitle('New routine');
        } else {
          // creating routine from saved workout
          // TODO: populate exercises with workout data
        }
      }
      return;
    }
    if (useFor === 'EDIT_ROUTINE') {
      setTemplateName('Edit routine');
      if (routineId) {
        if (_.isEmpty(customRoutines)) {
          // no routine data available; redirect to home page
          history.push('/');
        } else {
          const currentRoutine = customRoutines[routineId];

          let conversionFactor = 1;
          if (currentWeightUnit === 'lb') {
            // values are stored as KG in the DB
            // need to convert KG weights to LB before we use them
            conversionFactor = getWeightConversionFactor('kg', 'lb');
          }

          // update routine title
          setTitle(currentRoutine.name);
          // add exercises
          _.forEach(currentRoutine.exercises, (item) => {
            // DX: skip exercises that are already included
            if (setsByExercise[item.exerciseId]) return;
            const exercisePreset = exercisePresets[item.exerciseId];
            onAddSavedExercise(item, exercisePreset, conversionFactor, true);
          });
        }
      }
      return;
    }
  };

  const onClickCancel = () => {
    if (useFor === 'NEW_WORKOUT') {
      cancelModalRef.current.open();
    } else {
      history.goBack();
    }
  };

  const onConfirmSave = () => {
    let conversionFactor = 1;
    if (currentWeightUnit === 'lb') {
      // values are stored as KG in the DB
      // need to convert LB weights to KG before we save them
      conversionFactor = getWeightConversionFactor('lb', 'kg');
    }

    let filterCompleted = false;
    let exerciseDuration;
    if (useFor === 'NEW_WORKOUT' || useFor === 'EDIT_WORKOUT') {
      filterCompleted = true;
      exerciseDuration =
        useFor === 'NEW_WORKOUT' ? counterRef.current : duration;
    }
    const formattedData = {
      name: title,
      exercises: onFormatExercisesData(conversionFactor, filterCompleted),
      duration: exerciseDuration,
    };

    if (useFor === 'NEW_WORKOUT') {
      dispatch(WorkoutActions.saveWorkoutRequest(formattedData));
      return;
    }
    if (useFor === 'EDIT_WORKOUT') {
      dispatch(WorkoutActions.editWorkoutRequest(workoutId, formattedData));
      return;
    }

    if (useFor === 'NEW_ROUTINE') {
      dispatch(RoutineActions.saveRoutineRequest(formattedData));
      return;
    }
    if (useFor === 'EDIT_ROUTINE') {
      dispatch(
        RoutineActions.editCustomRoutineRequest(routineId, formattedData)
      );
      return;
    }
  };

  return (
    <div className='workoutTemplate'>
      <div className='workoutTemplate__header'>
        <div className='workoutTemplate__name'>{templateName}</div>
        <input
          className='workoutTemplate__title workoutTemplate__title--editable'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='workoutTemplate__content'>
        <div className='workout-controls'>
          {useFor === 'NEW_WORKOUT' && (
            <>
              <div className='workout-controls-duration-timer'>
                <label>Time elapsed: </label>
                <DurationTimer ref={counterRef} />
              </div>
              <div
                className='workout-controls-rest-timer'
                onClick={() => restTimerModalRef.current.open()}
              >
                <button>
                  <FaStopwatch />
                </button>
              </div>
            </>
          )}
          {useFor === 'EDIT_WORKOUT' && workout && (
            <WorkoutMeta vertical item={workout} />
          )}
          <div className='workout-controls-actions'>
            <button className='cancel-workout-btn' onClick={onClickCancel}>
              <span>Cancel</span>
            </button>
            <button
              className={classnames({
                'finish-workout-btn': true,
                disabled:
                  useFor === 'NEW_WORKOUT' || useFor === 'EDIT_WORKOUT'
                    ? !anySetCompleted
                    : _.isEmpty(setsByExercise),
              })}
              onClick={() => saveModalRef.current.open()}
            >
              <span>{useFor === 'NEW_WORKOUT' ? 'Finish' : 'Save'}</span>
            </button>
          </div>
        </div>
        {exercises.map((exercise) => (
          <Exercise
            allowComplete={
              useFor === 'NEW_WORKOUT' || useFor === 'EDIT_WORKOUT'
            }
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
      <Modal ref={cancelModalRef}>
        <Confirmation
          isWarning
          title={cancelModalTitle}
          subtitle={cancelModalSubtitle}
          onCancel={() => cancelModalRef.current.close()}
          onConfirm={() => history.goBack()}
        />
      </Modal>
      <Modal ref={saveModalRef}>
        <Confirmation
          title={saveModalTitle}
          subtitle={saveModalSubtitle}
          onCancel={() => saveModalRef.current.close()}
          onConfirm={onConfirmSave}
        />
      </Modal>
      {useFor === 'NEW_WORKOUT' && (
        <Modal ref={restTimerModalRef}>
          <RestTimer onClose={() => restTimerModalRef.current.close()} />
        </Modal>
      )}
    </div>
  );
};

export default WorkoutTemplate;
