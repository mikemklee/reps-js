import React from 'react';
import classnames from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HiOutlineHome, HiOutlineClipboardList } from 'react-icons/hi';
import { BiAnalyse, BiDumbbell } from 'react-icons/bi';

import './Sidebar.scss';

import { DualButton } from '../../shared';

import AuthActions from '../../redux/auth/actions';

import useWeightConverter from '../../hooks/useWeightConverter';

const Sidebar = () => {
  const { currentUnit } = useWeightConverter();

  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();

  const handleClick = (route) => {
    history.push(route);
  };

  const handleLogoutClick = () => {
    // Logout using Google passport api
    // Set authenticated state to false in the reducer
    window.open('http://localhost:5000/api/auth/logout', '_self');
  };

  return (
    <div className='sidebar'>
      <div className='siteLogo' onClick={() => handleClick('/')}>
        <span className='siteLogo__name'>REPS</span>
        <span className='siteLogo__badge'>Alpha</span>
      </div>

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
            current: pathname === '/routines',
          })}
          onClick={() => handleClick('/routines')}
        >
          <BiAnalyse size='1.5rem' />
          <label>Routines</label>
        </button>
        <button
          className={classnames({
            'link-button': true,
            current: pathname === '/exercises',
          })}
          onClick={() => handleClick('/exercises')}
        >
          <BiDumbbell size='1.5rem' />
          <label>Exercises</label>
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
      </div>
      <div className='userSettings'>
        <DualButton
          currentValue={currentUnit}
          onClickOption={(value) =>
            dispatch(AuthActions.setDisplayedWeightUnit(value))
          }
          firstOption={{
            label: 'KG',
            value: 'kg',
          }}
          secondOption={{
            label: 'LB',
            value: 'lb',
          }}
        />
        <button className='logout' onClick={handleLogoutClick}>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
