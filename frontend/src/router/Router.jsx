import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import './Router.scss';

// shared components
import Login from '../shared/Login/Login';
import Sidebar from '../shared/Sidebar/Sidebar';

// views
import Main from '../views/Main/Main';
import Logs from '../views/Logs/Logs';
import Routines from '../views/Routines/Routines';
import Exercises from '../views/Exercises/Exercises';
import Workout from '../views/Workout/Workout';
import NewBlankWorkout from '../views/Workout/NewBlankWorkout/NewBlankWorkout';
import NewRoutineWorkout from '../views/Workout/NewRoutineWorkout/NewRoutineWorkout';

import ExerciseActions from '../redux/exercise/actions';
class RouterApp extends React.Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.getExerciseNames();
    }
  }

  renderProtectedRoute(path, component, exact = true) {
    const OriginalComponent = component;
    return (
      <Route
        exact={exact}
        path={path}
        render={(props) =>
          this.props.isAuthenticated ? (
            <OriginalComponent {...props} />
          ) : (
            <Login {...props} />
          )
        }
      />
    );
  }

  render() {
    return (
      <Router>
        <div className='router'>
          {this.props.isAuthenticated ? <Sidebar /> : null}
          <div className='route'>
            <Switch>
              {this.renderProtectedRoute('/workout/new', NewBlankWorkout)}
              {this.renderProtectedRoute(
                '/workout/:routineId',
                NewRoutineWorkout
              )}
              {/* {this.renderProtectedRoute(
                '/workout/:workoutId/edit',
                EditWorkout
              )} */}
              {this.renderProtectedRoute('/routines', Routines)}
              {this.renderProtectedRoute('/exercises', Exercises)}
              {this.renderProtectedRoute('/logs', Logs)}
              {this.renderProtectedRoute('/', Main, false)}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  getExerciseNames: () => dispatch(ExerciseActions.getNamesRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouterApp);
