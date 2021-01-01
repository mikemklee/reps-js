import React from 'react';
import { useSelector } from 'react-redux';

import './UserMenu.scss';

// import { DualButton } from '../../../shared';

// import AuthActions from '../../../redux/auth/actions';

const UserMenu = ({ menuRef, isOpen, onClick }) => {
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
      <div className='userMenu__profileImage'>
        <img src={userProfileImage} alt='profile' />
      </div>
      <div className='userMenu__profileMeta'>
        <span className='userMenu__profileMeta--name'>{userDisplayName}</span>
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
          <div className='userMenu__logout' onClick={handleLogoutClick}>
            Logout
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserMenu;
