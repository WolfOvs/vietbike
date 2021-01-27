import React from 'react';

import { WrapperLogo } from './styles.js';
import Icon from '../Icon';

const SnamLogo = ({ onClickLogo, size }) => {
  const key = 'logo';
  return (
		<WrapperLogo className="dflex dflex__center" onClick={ onClickLogo }>
      <Icon iconKey={key} size={size} />
    </WrapperLogo>
  );
}

SnamLogo.defaultProps = {
    size: 60
};

export default SnamLogo;