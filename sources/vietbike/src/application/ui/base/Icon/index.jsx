import React from 'react';
import PropTypes from 'prop-types';

import IconCollection from './svg';
import { IconWrapper, DotState } from './styles';

const Icon = ({ iconKey, className, size, margin, onClick, state }) => {
  const icon = IconCollection[iconKey];
  return (
    <IconWrapper className={className} height={size} width={size} margin={margin} onClick={onClick}>
      <img src={icon} alt={iconKey} />
      {state && <DotState state={state}/>}
    </IconWrapper>
  );
}

Icon.propTypes = {
  iconKey: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
  margin: PropTypes.string,
  onClick: PropTypes.func,
  state: PropTypes.string
};

Icon.defaultProps = {
  iconKey: '',
  className: '',
  size: 24,
  margin: '0',
  onClick: null,
  state: null
};

export default Icon;
