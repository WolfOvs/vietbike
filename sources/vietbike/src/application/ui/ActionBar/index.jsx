import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../base/Icon';
import { WrapperActionBar } from './styles';

const ActionBar = ({ icons }) => {
  return (
    <WrapperActionBar className="dflex dflex__center">
      {icons.map((icon, index) => 
        <Icon 
          key={icon.key} 
          iconKey={icon.key} 
          className={index < icons.length-1 ? 'mr-20' : ''}
          onClick={icon.onClick}
        />
      )}
    </WrapperActionBar>
  );
}

ActionBar.propTypes = {
  icons: PropTypes.array
};

ActionBar.defaultProps = {
  icons: []
};


export default ActionBar;