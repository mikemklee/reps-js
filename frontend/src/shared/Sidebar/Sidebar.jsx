import React from 'react';
import classnames from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';
import { HiOutlineHome, HiOutlineClipboardList } from 'react-icons/hi';
import { BiAnalyse, BiDumbbell } from 'react-icons/bi';

import './Sidebar.scss';

import UserMenu from './UserMenu/UserMenu';

import useDropdown from '../../hooks/useDropdown';

const Sidebar = () => {
  const [dropdownRef, isOpen, setIsOpen] = useDropdown();

  const history = useHistory();
  const { pathname } = useLocation();

  const handleClick = (route) => {
    history.push(route);
  };

  return (
    <div className='sidebar'>
      <div className='siteLogo' onClick={() => handleClick('/')}>
        <span className='siteLogo__name'>REPS</span>
        <span className='siteLogo__badge'>Alpha</span>
      </div>
      <UserMenu
        menuRef={dropdownRef}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />
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
    </div>
  );
};

export default Sidebar;
