import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from "prop-types";

import {
  Station,
  WrapperTCState,
	Title,
	WrapperLabel
} from './styles';
import Icon from '../base/Icon';
import { getIconKeyByType, getIconTcsByState, getStateStation, isEqualToObject } from '../Utils';

const getTcsList = (tcs) => (
	tcs.map(tc => {
		const icon = getIconTcsByState(tc.state);
		return <Icon key={tc.id} iconKey={icon} size={6} margin={'0 6px 0 0'}/>
	})
);

const StationState = ({ station, someHandler, isActiveHandler, url, onCloseMenu }) => {
  const stateStation = station ? getStateStation(station.state) : 'unavailable';
	const tcs = station && station.data ? station.data.tcs : Array(station.tcs).fill({});
  return (
		<WrapperLabel 
			className="dflex dflex__center dflex__center--space-between"
			onMouseEnter={() => {if(isActiveHandler) someHandler(station, true)}} 
			onMouseLeave={() => {if(isActiveHandler) someHandler(station, false)}}
		>
			<NavLink className='dflex dflex__center' to={url} onClick={onCloseMenu} >
				<Icon iconKey={getIconKeyByType(station.type)} size={20} state={stateStation} />
				<Station>
					<Title>{station.name}</Title>
					<WrapperTCState>
						{getTcsList(tcs)}
					</WrapperTCState>
				</Station>
			</NavLink>	
		</WrapperLabel>
  );
}

StationState.propTypes = {
	station: PropTypes.object,
	someHandler: PropTypes.func,
	url: PropTypes.string
};

StationState.defaultProps = {
	station: {},
	someHandler: () => {},
	url: '/'
};

export default React.memo(StationState, (prevProps, nextProps) => isEqualToObject(prevProps, nextProps));