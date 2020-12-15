import React from 'react';
import classnames from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';

import './Sidebar.scss';

const Sidebar = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const handleClick = (route) => {
    history.push(route);
  };

  return (
    <div className='sidebar'>
      <button
        className={classnames({ current: pathname === '/' })}
        onClick={() => handleClick('/')}
      >
        Home
      </button>
      <button
        className={classnames({ current: pathname === '/logs' })}
        onClick={() => handleClick('/logs')}
      >
        Logs
      </button>
      <button
        className={classnames({ current: pathname === '/routines' })}
        onClick={() => handleClick('/routines')}
      >
        Routines
      </button>
    </div>
  );
};

export default Sidebar;
