import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './Login.scss';

import AuthActions from '../../redux/auth/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(AuthActions.loginRequest(email, password));
  };

  const handleLoginClick = () => {
    // Authenticate using via passport api in the backend
    // Open Google login page
    window.open('http://localhost:5000/api/auth/google', '_self');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className='login-panel' onKeyPress={handleKeyPress}>
      <div className='site-logo'>REPS</div>
      <div className='field'>
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
      </div>
      <button className='submit' onClick={onSubmit}>
        Login
      </button>
      <button onClick={handleLoginClick}>Login with Google</button>
    </div>
  );
}

export default Login;
