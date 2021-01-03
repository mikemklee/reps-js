import React, { useState } from 'react';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addDays from 'date-fns/addDays';
import isSameMonth from 'date-fns/isSameMonth';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FiCheck } from 'react-icons/fi';
import _ from 'lodash';

import './Calendar.scss';

const Calendar = ({ markedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const isMarkedDate = (day) => {
    const isIncluded = _.some(markedDates, (item) =>
      isSameDay(parseISO(item), day)
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
        const cloneDay = day;
        days.push(
          <div
            className={`column cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className='number'>{formattedDate}</span>
            <span className='bg'>{formattedDate}</span>
            {isMarkedDate(day) ? (
              <div className='marked'>
                <FiCheck />
              </div>
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
  const onDateClick = (day) => {
    setSelectedDate(day);
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
