import React, { useMemo } from 'react';
import {
  format,
  parseISO,
  eachDayOfInterval,
  subDays,
  startOfDay,
  startOfToday,
} from 'date-fns';
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
  const durationsByDates = useMemo(
    () =>
      _.chain(logs)
        .groupBy((item) => startOfDay(parseISO(item.completedAt)))
        .reduce((acc, workoutsByDate, date) => {
          acc[date] = _.sumBy(workoutsByDate, (item) => item.duration);
          return acc;
        }, {})
        .value(),
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
          count: durationsByDates[date] || 0,
          date: date.toISOString(),
        };
      }),
    [durationsByDates]
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
            <Legend
              formatter={() => 'Total workout time per day (in minutes)'}
            />
            <Line
              type='monotone'
              dataKey='count'
              dot={false}
              strokeWidth={2}
              stroke='#BB86FC'
            />
            {/* <Line type='monotone' dataKey='uv' stroke='#82ca9d' /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className='activitySummary__calendar'>
        <Calendar markedDates={_.keys(durationsByDates)} small />
      </div>
    </div>
  );
};

export default ActivitySummary;
