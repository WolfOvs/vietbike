import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Footer, Header } from "../../components";
import { HomeContainer, Banner, InputSearch, ContainerCards, Circle, Disclaimer } from './style';
import skyline from './skyline.jpg';

function Buy(props) {
	//Props
    const { } = props;
    console.log(props)
	return (
		<HomeContainer>
            <div onClick={() => {props.history.push({
						pathname: `/`,	
						props: props
                        });
                    }} >
				<Header />
			</div>
            <Banner 
                img={skyline}
            />
            <div className="container">
                <div className="row">
                    <InputSearch placeholder="Search by model, price, city..." />
                </div>
                <div className="row">
                    cards....
                </div>
            </div>
			
		</HomeContainer>
	);
}

Buy.propTypes = {
	stations: PropTypes.object,
	side: PropTypes.string
};

Buy.defaultProps = {
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
)(Buy);
