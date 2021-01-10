import React, { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import classnames from 'classnames';
import _ from 'lodash';

import './Calendar.scss';

const Calendar = ({ markedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const isMarkedDate = (day) => {
    const isIncluded = _.some(markedDates, (item) =>
      isSameDay(new Date(item), day)
    );
    return isIncluded;
  };

  const header = () => {
    const dateFormat = 'MMMM yyyy';
    return (
      <div className='header row'>
        <div className='column column--start'>
          <div className='icon' onClick={prevMonth}>
            <BsChevronLeft />
          </div>
        </div>
        <div className='column column--center'>
          <span>{format(currentDate, dateFormat)}</span>
        </div>
        <div className='column column--end'>
          <div className='icon' onClick={nextMonth}>
            <BsChevronRight />
          </div>
        </div>
      </div>
    );
  };
  const days = () => {
    const dateFormat = 'E';
    const days = [];
    const startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className='column column--center' key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className='days row'>{days}</div>;
  };
  const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        days.push(
          <div
            className={classnames('column', 'cell', {
              disabled: !isSameMonth(day, monthStart),
              today: isToday(day),
            })}
            key={day}
          >
            <span className='number'>{formattedDate}</span>
            {isMarkedDate(day) ? (
              <div className='marked'>{formattedDate}</div>
            ) : null}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className='row' key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className='body'>{rows}</div>;
  };
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  return (
    <div className='calendar'>
      <div>{header()}</div>
      <div>{days()}</div>
      <div>{cells()}</div>
    </div>
  );
};

export default Calendar;
