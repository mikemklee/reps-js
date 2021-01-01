import React, { useState, useEffect } from 'react';
import moment from 'moment';

import './DurationInputCell.scss';

import NumberInput from '../../NumberInput/NumberInput';

const DurationInputCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  onEditCell,
}) => {
  // We need to keep and update the state of the cell normally
  const [durationValue, setDurationValue] = useState(0);
  const [hoursValue, setHoursValue] = useState(0);
  const [minutesValue, setMinutesValue] = useState(0);
  const [secondsValue, setSecondsValue] = useState(0);

  const onChange = (e, unit) => {
    const regex = /^[0-5]?\d$/;
    const value = e.target.value;
    if (value === '' || regex.test(value)) {
      if (unit === 'hours') {
        setHoursValue(value);
      } else if (unit === 'minutes') {
        setMinutesValue(value);
      } else if (unit === 'seconds') {
        setSecondsValue(value);
      }
    }
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    const hoursInSeconds = parseInt(hoursValue, 10) * 60 * 60;
    const minutesInSeconds = parseInt(minutesValue, 10) * 60;
    const newDurationValue =
      hoursInSeconds + minutesInSeconds + parseInt(secondsValue, 10);
    onEditCell(index, id, newDurationValue);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    const value = initialValue || 0;
    const hours = Math.floor(value / 60 / 60);
    const duration = moment.duration(value, 'seconds');
    const minutes = Math.floor(duration.minutes());
    const seconds = duration.seconds() % 60;
    setDurationValue(value);
    setHoursValue(hours);
    setMinutesValue(minutes);
    setSecondsValue(seconds);
  }, [initialValue]);

  return (
    <div className='durationInputCell'>
      <NumberInput
        value={hoursValue}
        onChange={(e) => onChange(e, 'hours')}
        onBlur={onBlur}
      />
      :
      <NumberInput
        value={minutesValue}
        onChange={(e) => onChange(e, 'minutes')}
        onBlur={onBlur}
      />
      :
      <NumberInput
        value={secondsValue}
        onChange={(e) => onChange(e, 'seconds')}
        onBlur={onBlur}
      />
    </div>
  );
};

export default DurationInputCell;
