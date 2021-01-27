import React from "react";
import { withRouter } from "react-router-dom";
import { SimpleChart, StationUI, Loading, WrapperTables } from "../../../ui";

import { isEqualToObject } from '../../../../utils';

function Station(props) {

	const { station, globalLabels, configureDraw, configureDimesionDraw, goToDetails, configureTable, isThresholds, changeOpenModal } = props;
	const [isLoading, changeIsLoading] = React.useState(true);

	const stationsRendering = (station) => {
		switch (station.type) {
			case 0: {
				const stateTC = station.data.tcs.map(el => ({ id: el.id, state: el.state }));
				return (
					<SimpleChart
						goToDetails={goToDetails}
						dimesionDraw={configureDimesionDraw}
						configureDraw={configureDraw}
						changeIsLoading={changeIsLoading}
						stateTC={stateTC}
						isThresholds={isThresholds}
						changeOpenModal={changeOpenModal}
					/>
				);
			}
			default:
				return (
					<StationUI
						idStation={station.id}
						dataGlobal={station.data}
						globalLabels={globalLabels}
						configureDraw={configureDraw}
						configureDimesionDraw={configureDimesionDraw}
						goToDetails={goToDetails}
						changeIsLoading={changeIsLoading}
						isThresholds={isThresholds}
						changeOpenModal={changeOpenModal}
					/>
				);
		}

	}

	if (station && globalLabels && configureDraw && configureDimesionDraw) {
		return (
			<React.Fragment>
				{isLoading && <Loading />}
				{stationsRendering(station)}
				{!isLoading && configureTable && <WrapperTables data={configureTable} isThresholds={isThresholds} changeOpenModal={changeOpenModal} />}
			</React.Fragment>
		);
	}
	return <Loading />;
}

export default withRouter(React.memo(Station, (prevProps, nextProps) => isEqualToObject(prevProps, nextProps)));
