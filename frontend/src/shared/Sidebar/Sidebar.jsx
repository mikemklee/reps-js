import React from 'react';
import classnames from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';
import { HiOutlineHome, HiOutlineClipboardList } from 'react-icons/hi';
import { BiAnalyse } from 'react-icons/bi';

import './Sidebar.scss';

const Sidebar = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const handleClick = (route) => {
    history.push(route);
  };

  return (
    <div className='sidebar'>
      <div className='site-logo'>REPS</div>

      <div className='link-button-container'>
        <button
          className={classnames({
            'link-button': true,
            current: pathname === '/',
          })}
          onClick={() => handleClick('/')}
        >
          <HiOutlineHome size='1.5rem' />
          <label>Home</label>
        </button>
        <button
          className={classnames({
            'link-button': true,
            current: pathname === '/logs',
          })}
          onClick={() => handleClick('/logs')}
        >
          <HiOutlineClipboardList size='1.5rem' />
          <label>Logs</label>
        </button>
        <button
          className={classnames({
            'link-button': true,
            current: pathname === '/routines',
          })}
          onClick={() => handleClick('/routines')}
        >
          <BiAnalyse size='1.5rem' />
          <label>Routines</label>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
