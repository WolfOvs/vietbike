import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
	Breadcrumb,
	BreadcrumbWithActionBar,
	Button,
	Modal
} from "../../ui";
import { WrapperBtn, NotificationCount } from './style';
import { Page, Map } from "../../components";
import { getStationsList } from "../../../redux/actions/stations";
import { getSetLimiti } from '../../../redux/actions/limiti';

function Home(props) {
	//Props
	const { stations, match, title, token, pipelines, centers, dispatchSetLimiti, setLimiti, dispatchGetStationsList, updatedStations } = props;

	return (
		<div>ciao</div>
	);
}

Home.propTypes = {
	stations: PropTypes.object,
	side: PropTypes.string
};

Home.defaultProps = {
	stations: {},
	side: 'left'
};

export default connect(
	state => {
		return {
			//keyTopik: state.mqtt.keyTopik,
			// setLimiti: state.limiti.setLimiti,
			// updatedStations: state.stationsList.stations,
		};
	},
	dispatch => {
		return {
			// dispatchSetLimiti: (limitInfo, tokenAD) => dispatch(getSetLimiti(limitInfo, tokenAD)),
			// dispatchGetStationsList: (clientId, tokenAD) => dispatch(getStationsList(clientId, tokenAD)),
		};
	}
)(Home);
