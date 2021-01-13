import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IoLogoGoogle } from 'react-icons/io';

import './Login.scss';

function Login() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('error')) {
      console.log('Error signing in!');
    }
  }, []);

  const onClickSignIn = () => {
    // Authenticate using via passport api in the backend
    // Open Google login page
    window.open(`${process.env.REACT_APP_API_HOST}/api/auth/google`, '_self');
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
    </div>
  );
}

export default Login;
