import React, { useMemo } from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import subDays from 'date-fns/subDays';
import startOfToday from 'date-fns/startOfToday';
import startOfDay from 'date-fns/startOfDay';
import _ from 'lodash';

import {
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';

import { Calendar } from '../../../shared';

import './ActivitySummary.scss';

const ActivitySummary = ({ logs }) => {
  const completedDates = useMemo(
    () => _.countBy(logs, (item) => startOfDay(parseISO(item.completedAt))),
    [logs]
  );

  const last7Days = useMemo(
    () =>
      eachDayOfInterval({
        start: subDays(startOfToday(), 6),
        end: startOfToday(),
      }),
    []
  );

  const data = useMemo(
    () =>
      _.map(last7Days, (date) => {
        return {
          count: completedDates[date] || 0,
          date: date.toISOString(),
        };
      }),
    [completedDates]
  );

  return (
    <div className='activitySummary'>
      <label className='activitySummary__title'>Activity summary</label>
      <div className='activitySummary__chart'>
        <div className='activitySummary__chart__title'>
          Workouts in the past 7 days
        </div>
        <ResponsiveContainer width='96%' height='100%'>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: -30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='date'
              tickFormatter={(date) => format(parseISO(date), 'E')}
            />
            <YAxis allowDecimals={false} />
            <Legend formatter={() => 'Total workout sessions'} />
            <Line type='monotone' dataKey='count' stroke='#8884d8' />
            {/* <Line type='monotone' dataKey='uv' stroke='#82ca9d' /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className='activitySummary__calendar'>
        <Calendar markedDates={_.keys(completedDates)} small />
      </div>
    </div>
  );
};

export default ActivitySummary;
