import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import './Router.scss';

// shared components
import { Login, Sidebar } from '../shared';

// views
import Main from '../views/Main/Main';
import Logs from '../views/Logs/Logs';
import Routines from '../views/Routines/Routines';
import Exercises from '../views/Exercises/Exercises';
import NewWorkout from '../views/Workout/NewWorkout/NewWorkout';
import EditWorkout from '../views/Workout/EditWorkout/EditWorkout';
import NewRoutine from '../views/Routines/NewRoutine/NewRoutine';
import EditRoutine from '../views/Routines/EditRoutine/EditRoutine';

import ExerciseActions from '../redux/exercise/actions';
class RouterApp extends React.Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.getExerciseNames();
    }

    fetch('http://localhost:5000/api/auth/login/success', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error('failed to authenticate user');
      })
      .then((responseJson) => {
        console.log('what do?', responseJson);
        // this.setState({
        //   authenticated: true,
        //   user: responseJson.user,
        // });
      })
      .catch((error) => {
        console.log('error!', error);
        // this.setState({
        //   authenticated: false,
        //   error: 'Failed to authenticate user',
        // });
      });
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
              {this.renderProtectedRoute('/workout/:routineId', NewWorkout)}
              {this.renderProtectedRoute(
                '/workout/:workoutId/edit',
                EditWorkout
              )}
              {this.renderProtectedRoute('/routines', Routines)}
              {this.renderProtectedRoute('/routines/:workoutId', NewRoutine)}
              {this.renderProtectedRoute(
                '/routines/:routineId/edit',
                EditRoutine
              )}
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
