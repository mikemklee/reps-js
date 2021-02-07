import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './UserMenu.scss';

import { DualButton, LoadingSpinner, Modal } from '../../../shared';

import AuthActions from '../../../redux/auth/actions';

import { useDistanceConverter, useWeightConverter } from '../../../hooks';

const UserMenu = ({ menuRef, isOpen, onClick, onForceClose }) => {
  const dispatch = useDispatch();

  const preferencesModalRef = useRef(null);

  const {
    userGivenName,
    userFamilyName,
    userEmail,
    userProfileImage,
    status,
  } = useSelector((state) => state.auth);

  const { currentWeightUnit } = useWeightConverter();
  const { currentDistanceUnit } = useDistanceConverter();

  const handleLogoutClick = () => {
    // Logout using Google passport api
    // Set authenticated state to false in the reducer
    window.open(`${process.env.REACT_APP_API_HOST}/api/auth/logout`, '_self');
  };

  const handlePreferencesClick = () => {
    preferencesModalRef.current.open();
    onForceClose();
  };

  const upadtingPreferences = status.updatePreferencesPending;

  return (
    <div className='userMenu' ref={menuRef} onClick={onClick}>
      <div className='userMenu__profile'>
        <div className='userMenu__profileImage'>
          <img src={userProfileImage} alt='profile' />
        </div>
      </div>
      {isOpen ? (
        <div
          className='userMenu__actions'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className='userMenu__profileMeta'>
            <span className='userMenu__profileMeta--name'>
              {userGivenName} {userFamilyName}
            </span>
            <span className='userMenu__profileMeta--email'>{userEmail}</span>
          </div>
          <div className='userMenu__action' onClick={handlePreferencesClick}>
            Settings
          </div>
          <div className='userMenu__action' onClick={handleLogoutClick}>
            Logout
          </div>
        </div>
      ) : null}
      <Modal ref={preferencesModalRef} hideCloseButton>
        <div className='preferences'>
          {upadtingPreferences ? (
            <div className='preferences__loading'>
              <LoadingSpinner />
            </div>
          ) : null}
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
                  onClickOption={(value) => {
                    dispatch(
                      AuthActions.updatePreferencesRequest({
                        displayedWeightUnit: value,
                      })
                    );
                  }}
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
                  onClickOption={(value) => {
                    dispatch(
                      AuthActions.updatePreferencesRequest({
                        displayedDistanceUnit: value,
                      })
                    );
                  }}
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
          <div className='preferences__section'>
            <div className='preferences__sectionName'>Account</div>
            <div className='userSetting'>
              <div className='userSetting__title'>Danger zone</div>
              <div className='userSetting__subtitle'>
                Permanently delete all of your data. This cannot be undone!
              </div>
              <div className='userSetting__control'>
                <button
                  className='warning'
                  onClick={() => dispatch(AuthActions.deleteUserRequest())}
                >
                  <span>Delete account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserMenu;
