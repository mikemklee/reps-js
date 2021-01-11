import React from 'react';

import './NumberInput.scss';

const NumberInput = ({ value = 0, onChange = () => {}, onBlur = () => {} }) => {
  return (
    <input
      className='numberInput'
      type='tel'
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default NumberInput;
