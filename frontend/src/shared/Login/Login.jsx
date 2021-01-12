import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoLogoGoogle } from 'react-icons/io';

import './Login.scss';

import AuthActions from '../../redux/auth/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onClickSignIn = () => {
    // Authenticate using via passport api in the backend
    // Open Google login page
    window.open(`${process.env.REACT_APP_API_HOST}/api/auth/google`, '_self');
    // dispatch(AuthActions.loginRequest(email, password));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClickSignIn();
    }
  };

  return (
    <div className='login' onKeyPress={handleKeyPress}>
      <div className='login__logo'>REPS</div>
      <div className='login__title'>Tracking workouts made easy</div>
      <div className='login__subtitle'>Stay on top of your workouts</div>
      <button className='login__signIn--google' onClick={onClickSignIn}>
        <IoLogoGoogle />
        <span>Sign in with Google</span>
      </button>
      {/* <div className='field'>
        <label>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='field'>
        <label>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div> */}
    </div>
  );
}

export default Login;
