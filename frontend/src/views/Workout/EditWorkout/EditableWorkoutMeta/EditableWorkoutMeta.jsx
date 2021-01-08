import { BiTimeFive, BiCalendarCheck } from 'react-icons/bi';
import classnames from 'classnames';
import moment from 'moment';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import './EditableWorkoutMeta.scss';

import { NumberInput } from '../../../../shared';

const EditableWorkoutMeta = ({
  duration,
  setDuration,
  completedAt,
  setCompletedAt,
}) => {
  const formattedDuration = moment.duration(duration, 'seconds').minutes();

  return (
    <div className='editableWorkoutMeta'>
      <div className='editableWorkoutMeta__completedAt'>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <BiCalendarCheck className='icon' />
          <DateTimePicker
            InputProps={{ disableUnderline: true }}
            className={classnames('picker')}
            value={completedAt}
            format='h:mm a EEE, d MMM yyyy'
            onChange={setCompletedAt}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className='editableWorkoutMeta__duration'>
        <BiTimeFive className='icon' />
        <NumberInput value={duration} onChange={setDuration} /> minutes
      </div>
    </div>
  );
};

export default EditableWorkoutMeta;
