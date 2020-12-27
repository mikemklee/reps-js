import React, { useState, useEffect } from 'react';

import './NumberInputCell.scss';

const NumberInputCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  onEditCell,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    const regex = /^[0-9\b]+$/;
    const value = e.target.value;
    if (value === '' || regex.test(value)) {
      const formatted = value ? parseInt(value, 10) : 0;
      setValue(formatted);
    }
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    onEditCell(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      className='number-input-cell'
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default NumberInputCell;
