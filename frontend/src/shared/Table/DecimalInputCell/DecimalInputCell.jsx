import React, { useState, useEffect } from 'react';

import NumberInput from '../../NumberInput/NumberInput';

const DecimalInputCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  onEditCell,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    const regex = /^0$|^[1-9]\d*$|^\.\d+$|^0\.\d*$|^[1-9]\d*\.\d*$/;
    const value = e.target.value;
    if (value === '' || regex.test(value)) {
      setValue(value);
    }
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    const num = parseFloat(value) || 0;
    onEditCell(index, id, num.toFixed(2));
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    const num = parseFloat(initialValue) || 0;
    setValue(num.toFixed(2));
  }, [initialValue]);

  return <NumberInput value={value} onChange={onChange} onBlur={onBlur} />;
};

export default DecimalInputCell;
