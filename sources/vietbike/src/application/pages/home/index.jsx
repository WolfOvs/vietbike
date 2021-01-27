import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Footer, Header } from "../../components";
import { HomeContainer, BoxRedirect, ContainerCards, Circle } from './style';
import Sell from './sell.jpg';
import Buy from './buy.jpg';

function Home(props) {
	//Props
	const { stations, match, title, token, pipelines, centers, dispatchSetLimiti, setLimiti, dispatchGetStationsList, updatedStations } = props;

	return (
		<HomeContainer>
			<Header />
			<ContainerCards>
				<BoxRedirect
					img={Sell}
				>
					<Circle>Sell</Circle>
				</BoxRedirect>
				<BoxRedirect
					img={Buy}
				>
					<Circle>Buy</Circle>
				</BoxRedirect>
			</ContainerCards>
			<Footer />
		</HomeContainer>
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
