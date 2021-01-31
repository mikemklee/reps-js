import React from 'react';

import './NumberInput.scss';

const NumberInput = ({ value = 0, onChange = () => {}, onBlur = () => {} }) => {
  const handleFocus = (event) => event.target.select();

  return (
    <input
      onFocus={handleFocus}
      className='numberInput'
      type='tel'
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default NumberInput;
