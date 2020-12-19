import React, { useState, useEffect } from 'react';

const CheckboxCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  onToggleCell,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = () => {
    setValue(!value);
    onToggleCell(index, id, !value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input type='checkbox' checked={value} onChange={onChange} />;
};

export default CheckboxCell;
