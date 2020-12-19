import React from 'react';

const ButtonCell = ({
  row: { index },
  column: { id },
  onClickCell,
  children,
}) => {
  const onClick = () => {
    onClickCell(index, id);
  };

  return <button onClick={onClick}>{children}</button>;
};

export default ButtonCell;
