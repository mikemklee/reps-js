import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { HiOutlineHome, HiOutlineClipboardList } from 'react-icons/hi';
import { BiAnalyse, BiDumbbell } from 'react-icons/bi';
import { useMediaQuery } from 'react-responsive';
import classnames from 'classnames';

import './Sidebar.scss';

import UserMenu from './UserMenu/UserMenu';

import { useDropdown } from '../../hooks';
import ResponsiveBox from '../ResponsiveBox/ResponsiveBox';

const Sidebar = () => {
  const isSmallDevice = useMediaQuery({ query: '(max-width: 480px)' });
  const [userMenuRef, isUserMenuOpen, setIsUserMenuOpen] = useDropdown();

  const history = useHistory();
  const { pathname } = useLocation();

  const handleClick = (route) => {
    history.push(route);
  };

  return (
    <div className='sideBar'>
      <ResponsiveBox>
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
            {isSmallDevice && <HiOutlineHome size='1.5rem' />}
            {isSmallDevice ? null : <span>Home</span>}
          </button>
          <button
            className={classnames({
              'link-button': true,
              current: pathname === '/routines',
            })}
            onClick={() => handleClick('/routines')}
          >
            {isSmallDevice && <BiAnalyse size='1.5rem' />}
            {isSmallDevice ? null : <span>Routines</span>}
          </button>
          <button
            className={classnames({
              'link-button': true,
              current: pathname === '/exercises',
            })}
            onClick={() => handleClick('/exercises')}
          >
            {isSmallDevice && <BiDumbbell size='1.5rem' />}
            {isSmallDevice ? null : <span>Exercises</span>}
          </button>
          <button
            className={classnames({
              'link-button': true,
              current: pathname === '/logs',
            })}
            onClick={() => handleClick('/logs')}
          >
            {isSmallDevice && <HiOutlineClipboardList size='1.5rem' />}
            {isSmallDevice ? null : <span>Logs</span>}
          </button>
        </div>
        <UserMenu
          menuRef={userMenuRef}
          isOpen={isUserMenuOpen}
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          onForceClose={() => setIsUserMenuOpen(false)}
        />
      </ResponsiveBox>
    </div>
  );
};

export default Sidebar;
