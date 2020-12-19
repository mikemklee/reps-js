import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { GoCheck } from 'react-icons/go';

import './CheckboxCell.scss';

const CheckboxCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  onToggleCell,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onToggle = () => {
    setValue(!value);
    onToggleCell(index, id, !value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className='checkbox-cell' onClick={onToggle}>
      <input type='checkbox' value={value} />
      <div
        className={classnames({
          'toggle-box': true,
          checked: value === true,
        })}
      >
        <GoCheck />
      </div>
    </div>
  );
};

export default CheckboxCell;
