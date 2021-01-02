import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosMenu } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';

import './UserMenu.scss';

import { DualButton, Modal } from '../../../shared';

import AuthActions from '../../../redux/auth/actions';

import useWeightConverter from '../../../hooks/useWeightConverter';
import useDistanceConverter from '../../../hooks/useDistanceConverter';

const UserMenu = ({ menuRef, isOpen, onClick, onForceClose }) => {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ query: '(max-width: 960px)' });

  const preferencesModalRef = useRef(null);

  const { userDisplayName, userProfileImage } = useSelector(
    (state) => state.auth
  );

  const { currentWeightUnit } = useWeightConverter();
  const { currentDistanceUnit } = useDistanceConverter();

  const handleLogoutClick = () => {
    // Logout using Google passport api
    // Set authenticated state to false in the reducer
    window.open('http://localhost:5000/api/auth/logout', '_self');
  };

  const handlePreferencesClick = () => {
    preferencesModalRef.current.open();
    onForceClose();
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
              <div
                className='userMenu__action'
                onClick={handlePreferencesClick}
              >
                Preferences
              </div>
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
              <div
                className='userMenu__action'
                onClick={handlePreferencesClick}
              >
                Preferences
              </div>
              <div className='userMenu__action' onClick={handleLogoutClick}>
                Logout
              </div>
            </div>
          ) : null}
        </>
      )}
      <Modal ref={preferencesModalRef} hideCloseButton>
        <div className='preferences'>
          <div className='preferences__section'>
            <div className='preferences__sectionName'>Displayed units</div>
            <div className='userSetting'>
              <div className='userSetting__title'>Weight units</div>
              <div className='userSetting__subtitle'>
                Select a unit to display weights in.
              </div>
              <div className='userSetting__control'>
                <DualButton
                  currentValue={currentWeightUnit}
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
              </div>
            </div>
            <div className='userSetting'>
              <div className='userSetting__title'>Distance units</div>
              <div className='userSetting__subtitle'>
                Select a unit to display distances in.
              </div>
              <div className='userSetting__control'>
                <DualButton
                  currentValue={currentDistanceUnit}
                  onClickOption={(value) =>
                    dispatch(AuthActions.setDisplayedDistanceUnit(value))
                  }
                  firstOption={{
                    label: 'KM',
                    value: 'km',
                  }}
                  secondOption={{
                    label: 'MILES',
                    value: 'mi',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserMenu;
