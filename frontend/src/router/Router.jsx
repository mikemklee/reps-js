import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import './Router.scss';

// shared components
// import Login from '../shared/Login/Login';
import Header from '../shared/Header/Header';
import Sidebar from '../shared/Sidebar/Sidebar';

// views
import Main from '../views/Main/Main';
import Logs from '../views/Logs/Logs';
import Routines from '../views/Routines/Routines';

class RouterApp extends React.Component {
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
            <OriginalComponent {...props} />
          )
        }
      />
    );
  }

  render() {
    return (
      <Router>
        <div className='router'>
          <Header />
          <div className='route'>
            <Sidebar />
            <Switch>
              {this.renderProtectedRoute('/routines', Routines)}
              {this.renderProtectedRoute('/logs', Logs)}
              {this.renderProtectedRoute('/', Main, false)}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default RouterApp;
