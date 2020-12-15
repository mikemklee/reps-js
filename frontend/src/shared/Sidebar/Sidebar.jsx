import React from 'react';
import { useHistory } from 'react-router-dom';

import './Sidebar.scss';

const Sidebar = () => {
  const history = useHistory();

  const handleClick = (route) => {
    history.push(route);
  };

  return (
    <div className='sidebar'>
      <button onClick={() => handleClick('/')}>Home</button>
      <button onClick={() => handleClick('/logs')}>Logs</button>
      <button onClick={() => handleClick('/routines')}>Routines</button>
    </div>
  );
};

export default Sidebar;
