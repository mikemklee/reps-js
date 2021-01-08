import { BiTimeFive, BiCalendarCheck } from 'react-icons/bi';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import './EditableWorkoutMeta.scss';

import { NumberInput } from '../../../../shared';

const EditableWorkoutMeta = ({
  minutes,
  setMinutes,
  completedAt,
  setCompletedAt,
}) => {
  const handleMinutesChange = (e) => {
    const regex = /^[0-9\b]+$/;
    const value = e.target.value;
    if (value === '' || regex.test(value)) {
      const formatted = value ? parseInt(value, 10) : 0;
      setMinutes(formatted);
    }
  };

  return (
    <div className='editableWorkoutMeta'>
      <div className='editableWorkoutMeta__completedAt'>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <BiCalendarCheck className='icon' />
          <DateTimePicker
            InputProps={{ disableUnderline: true }}
            className='picker'
            value={completedAt}
            format='h:mm a EEE, d MMM yyyy'
            onChange={setCompletedAt}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className='editableWorkoutMeta__duration'>
        <BiTimeFive className='icon' />
        <NumberInput value={minutes} onChange={handleMinutesChange} /> minutes
      </div>
    </div>
  );
};

export default EditableWorkoutMeta;
