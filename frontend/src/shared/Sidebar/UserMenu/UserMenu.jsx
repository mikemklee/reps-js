import React from 'react';
import { useSelector } from 'react-redux';
import { IoIosMenu } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';

import './UserMenu.scss';

// import { DualButton } from '../../../shared';

// import AuthActions from '../../../redux/auth/actions';

const UserMenu = ({ menuRef, isOpen, onClick }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' });

  const { userDisplayName, userProfileImage } = useSelector(
    (state) => state.auth
  );

  const handleLogoutClick = () => {
    // Logout using Google passport api
    // Set authenticated state to false in the reducer
    window.open('http://localhost:5000/api/auth/logout', '_self');
  };

  return (
    <div className='userMenu' ref={menuRef} onClick={onClick}>
      {isMobile ? (
        <>
          <IoIosMenu size='1.5rem' />
          {isOpen ? (
            <div
              className='userMenu__actions'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className='userMenu__profile'>
                <div className='userMenu__profileImage'>
                  <img src={userProfileImage} alt='profile' />
                </div>
                <div className='userMenu__profileMeta'>
                  <span className='userMenu__profileMeta--name'>
                    {userDisplayName}
                  </span>
                </div>
              </div>
              {/* <DualButton
            currentValue={currentUnit}
            onClickOption={(value) => dispatch(AuthActions.setDisplayedWeightUnit(value))}
            firstOption={{
              label: 'KG',
              value: 'kg',
            }}
            secondOption={{
              label: 'LB',
              value: 'lb',
            }}
          />; */}
              {/* <div className='userMenu__setUnit'>Preferences</div> */}
              <div className='userMenu__action' onClick={handleLogoutClick}>
                Logout
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div className='userMenu__profile'>
            <div className='userMenu__profileImage'>
              <img src={userProfileImage} alt='profile' />
            </div>
            <div className='userMenu__profileMeta'>
              <span className='userMenu__profileMeta--name'>
                {userDisplayName}
              </span>
            </div>
          </div>
          {isOpen ? (
            <div
              className='userMenu__actions'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {/* <DualButton
            currentValue={currentUnit}
            onClickOption={(value) => dispatch(AuthActions.setDisplayedWeightUnit(value))}
            firstOption={{
              label: 'KG',
              value: 'kg',
            }}
            secondOption={{
              label: 'LB',
              value: 'lb',
            }}
          />; */}
              {/* <div className='userMenu__setUnit'>Preferences</div> */}
              <div className='userMenu__action' onClick={handleLogoutClick}>
                Logout
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default UserMenu;
