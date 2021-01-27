import React from "react";
import { withRouter } from "react-router-dom";
import { SimpleChart, WrapperTables, Loading } from "../../../ui";

import { isEqualToObject } from "./../../../../utils";

function Turbocharger({ history, data, stationId, turbochargerId, configurations, labels, thresholds, isThresholds, changeOpenModal }) {
	
	const [isLoading, changeIsLoading] = React.useState(true);
	const [station, changeStation] = React.useState(stationId);
	const [turbocherger, changeTurbocharger] = React.useState(turbochargerId);
	const [labelsPage, changeLabelsPage] = React.useState(null);
	const [configureDraw, changeConfigureDraw] = React.useState(null);
	const [configureTable, changeConfigureTable] = React.useState(null);
	const [dimesionDraw, changeDimesionDraw] = React.useState(null);

	React.useEffect(() => {
		changeStation(stationId);
		changeTurbocharger(turbochargerId);
		changeLabelsPage(labels);
		changeConfigureDraw(null);
		changeConfigureTable(null);
	}, [stationId, turbochargerId, labels, changeStation, changeTurbocharger, changeLabelsPage, changeConfigureDraw, changeConfigureTable]);
	
	React.useEffect(() => {
		if(station === stationId && turbocherger === turbochargerId) {
			if(configurations && labelsPage) {
				changeConfigureDraw(configurations.configureLabels({data, tcs: turbocherger, thresholds, labels: labelsPage}));
				changeConfigureTable(configurations.configureDataTable({data, tcs: turbocherger, thresholds, labels: labelsPage}));
				changeDimesionDraw(configurations.getDimesionDraw(turbocherger));
			}
		}
	}, [stationId, turbochargerId, turbocherger, station, configurations, data, labelsPage, thresholds, changeConfigureDraw, changeConfigureTable, changeDimesionDraw]);

	const goToDetails = page => {
		history.push(`${history.location.pathname}/${page}`);
	};

	if (configureDraw && configureTable) {
		return (
			<React.Fragment>
				{isLoading && <Loading />}
				<SimpleChart
					dimesionDraw={dimesionDraw}
					configureDraw={configureDraw}
					goToDetails={goToDetails}
					changeIsLoading={changeIsLoading}
					isThresholds={isThresholds}
					changeOpenModal={changeOpenModal}
				/>
				{!isLoading && <WrapperTables data={configureTable} isThresholds={isThresholds} changeOpenModal={changeOpenModal} />}
			</React.Fragment>
		);
	}
	return <Loading />
}

export default withRouter(
	React.memo(Turbocharger, (prevProps, nextProps) => {
		isEqualToObject(prevProps.data, nextProps.data);
	})
);
