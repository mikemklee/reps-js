import React from 'react';
import classnames from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';
import { HiOutlineHome, HiOutlineClipboardList } from 'react-icons/hi';
import { BiAnalyse, BiDumbbell } from 'react-icons/bi';
import { useMediaQuery } from 'react-responsive';

import './Sidebar.scss';

import UserMenu from './UserMenu/UserMenu';

import useDropdown from '../../hooks/useDropdown';

const Sidebar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' });
  const [userMenuRef, isUserMenuOpen, setIsUserMenuOpen] = useDropdown();

  const history = useHistory();
  const { pathname } = useLocation();

  const handleClick = (route) => {
    history.push(route);
  };

  return (
    <div className='sideBar'>
      <div className='siteLogo' onClick={() => handleClick('/')}>
        <span className='siteLogo__name'>REPS</span>
        <span className='siteLogo__badge'>Alpha</span>
      </div>
      <UserMenu
        menuRef={userMenuRef}
        isOpen={isUserMenuOpen}
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
      />
      <div className='link-button-container'>
        <button
          className={classnames({
            'link-button': true,
            current: pathname === '/',
          })}
          onClick={() => handleClick('/')}
        >
          {isMobile ? null : <HiOutlineHome size='1.5rem' />}
          <span>Home</span>
        </button>
        <button
          className={classnames({
            'link-button': true,
            current: pathname === '/routines',
          })}
          onClick={() => handleClick('/routines')}
        >
          {isMobile ? null : <BiAnalyse size='1.5rem' />}
          <span>Routines</span>
        </button>
        <button
          className={classnames({
            'link-button': true,
            current: pathname === '/exercises',
          })}
          onClick={() => handleClick('/exercises')}
        >
          {isMobile ? null : <BiDumbbell size='1.5rem' />}
          <span>Exercises</span>
        </button>
        <button
          className={classnames({
            'link-button': true,
            current: pathname === '/logs',
          })}
          onClick={() => handleClick('/logs')}
        >
          {isMobile ? null : <HiOutlineClipboardList size='1.5rem' />}
          <span>Logs</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
