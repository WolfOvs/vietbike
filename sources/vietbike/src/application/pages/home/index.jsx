import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Footer, Header } from "../../components";
import { HomeContainer, BoxRedirect, ContainerCards, Circle, Disclaimer } from './style';
import Sell from './sell.jpg';
import Buy from './buy.jpg';

function Home(props) {
	const { } = props;
	console.log(props)

	return (
		<HomeContainer>
			<Header />
			<ContainerCards>
				<BoxRedirect
					img={Sell}
				>
					<Circle>Sell</Circle>
					<Disclaimer>Relax, we will help you</Disclaimer>
				</BoxRedirect>
				<BoxRedirect
					img={Buy}
					onClick={() => {props.history.push({
						pathname: `/buy`,	
						props: props
                        });
                    }} 
				>
					<Circle>Buy</Circle>
					<Disclaimer>Easy like to choose a fish</Disclaimer>
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
