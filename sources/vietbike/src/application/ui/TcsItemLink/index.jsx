import React from 'react';
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';

import { getIconTcsByState, isEqualToObject } from '../Utils';
import Icon from '../base/Icon';
import { Title } from './style';

const TcsItemLink = ({url, tc, active, keyTcs, onCloseMenu}) => (
	<NavLink to={url} className={active ? 'active' : ''} key={keyTcs} onClick={onCloseMenu}>
		<Icon iconKey={getIconTcsByState(tc.state)} size={6} margin={'0 6px 0 0'}/>
		<Title>{tc.name}</Title>
	</NavLink>
)

TcsItemLink.propTypes = { 
	tcs: PropTypes.array, 
	urlTcs: PropTypes.array,
	active: PropTypes.bool
};

TcsItemLink.defaultProps = {
	tcs: [], 
	urlTcs: [],
	active: false
};

export default React.memo(TcsItemLink, (prevProps, nextProps) => isEqualToObject(prevProps, nextProps));