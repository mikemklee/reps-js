import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { BiAnalyse, BiDumbbell } from 'react-icons/bi';

import './QuickActions.scss';

const QuickActions = () => {
  const history = useHistory();

  const cards = useMemo(() => [
    {
      title: 'Test worker',
      icon: <HiOutlineClipboardList />,
      route: '/test',
    },
    {
      title: 'Start a blank workout',
      icon: <GiWeightLiftingUp />,
      route: '/workout/new',
    },
    {
      title: 'Manage routines',
      icon: <BiAnalyse />,
      route: '/routines',
    },
    {
      title: 'Browse exercises',
      icon: <BiDumbbell />,
      route: '/exercises',
    },
    {
      title: 'View logs',
      icon: <HiOutlineClipboardList />,
      route: '/logs',
    },
  ]);

  return (
    <div className='quickActions'>
      <label className='quickActions__title'>Quick actions</label>
      <div className='actionCardList'>
        {cards.map((card) => (
          <div
            key={card.route}
            className='actionCard'
            onClick={() => history.push(card.route)}
          >
            <label className='actionCard__title'>{card.title}</label>
            <div className='actionCard__button'>{card.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
