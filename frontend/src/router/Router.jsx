import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import './Router.scss';

// shared components
import { Login, LoadingSpinner, Sidebar, ScrollToTop } from '../shared';

// views
import Main from '../views/Main/Main';
import Logs from '../views/Logs/Logs';
import Routines from '../views/Routines/Routines';
import Exercises from '../views/Exercises/Exercises';
import NewWorkout from '../views/Workout/NewWorkout/NewWorkout';
import EditWorkout from '../views/Workout/EditWorkout/EditWorkout';
import NewRoutine from '../views/Routines/NewRoutine/NewRoutine';
import EditRoutine from '../views/Routines/EditRoutine/EditRoutine';

import AuthActions from '../redux/auth/actions';
class RouterApp extends React.Component {
  componentDidMount() {
    this.props.getUserData();
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
          {this.props.getUserDataPending ? (
            <div className='router__placeholder'>
              <LoadingSpinner />
              <label>Synchronizing data...</label>
              <label>(This may take up to a minute to complete)</label>
            </div>
          ) : (
            <>
              {this.props.isAuthenticated && <Sidebar />}
              <div id='route'>
                <ScrollToTop />
                <Switch>
                  {this.renderProtectedRoute('/workout/:routineId', NewWorkout)}
                  {this.renderProtectedRoute(
                    '/workout/:workoutId/edit',
                    EditWorkout
                  )}
                  {this.renderProtectedRoute('/routines', Routines)}
                  {this.renderProtectedRoute(
                    '/routines/:workoutId',
                    NewRoutine
                  )}
                  {this.renderProtectedRoute(
                    '/routines/:routineId/edit',
                    EditRoutine
                  )}
                  {this.renderProtectedRoute('/exercises', Exercises)}
                  {this.renderProtectedRoute('/logs', Logs)}
                  {!this.props.isAuthenticated && (
                    <Route exact path='/login' component={Login} />
                  )}
                  {this.renderProtectedRoute('/', Main, false)}
                </Switch>
              </div>
            </>
          )}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  getUserDataPending: state.auth.status.getUserDataPending,
});

const mapDispatchToProps = (dispatch) => ({
  getUserData: () => dispatch(AuthActions.getUserDataRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouterApp);
