import React from 'react';

import { HamburgherMenu } from './styles.js';

const ButtonMenu = ({ onClickButtonMenu, isChange }) => {
  return (
    <HamburgherMenu onClick={() => onClickButtonMenu()} className={isChange && 'change'}>
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </HamburgherMenu>
  );
};

export default ButtonMenu;
