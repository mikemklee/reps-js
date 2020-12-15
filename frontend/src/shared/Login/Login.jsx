import React, { useState } from 'react';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <div className='panel'>
        <h2>Login</h2>
        <div className='field'>
          <label>USERNAME OR EMAIL</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='field'>
          <label>PASSWORD</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='submit' onClick={() => props.login(email, password)}>
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default Login;
