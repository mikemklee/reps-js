import React from 'react';

import './ButtonCell.scss';

const ButtonCell = ({
  row: { index },
  column: { id },
  onClickCell,
  children,
}) => {
  const onClick = () => {
    onClickCell(index, id);
  };

  return (
    <button className='button-cell' onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonCell;
