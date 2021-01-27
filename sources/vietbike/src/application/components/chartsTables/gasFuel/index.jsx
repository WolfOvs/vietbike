import React from "react";
import { withRouter } from "react-router-dom";
import { SimpleChart, WrapperTables, Loading } from "../../../ui";

import { isEqualToObject } from "./../../../../utils";

function GasFuelCharts({ data, stationId, turbochargerId, configurations, labels, isThresholds, thresholds, changeOpenModal }) {

	const [isLoading, changeIsLoading] = React.useState(true);
	const [station, changeStation] = React.useState(stationId);
	const [turbocherger, changeTurbocharger] = React.useState(turbochargerId);
	const [labelsPage, changeLabelsPage] = React.useState(labels);
	const [configureDraw, changeConfigureDraw] = React.useState(null);
	const [configureTable, changeConfigureTable] = React.useState(null);
	const [dimesionDraw, changeDimesionDraw] = React.useState(null);

	React.useEffect(() => {
		changeStation(stationId);
		changeTurbocharger(turbochargerId);
		changeLabelsPage(labels);
		changeConfigureDraw(null);
		changeConfigureTable(null);
	}, [stationId, turbochargerId, labels]);

	React.useEffect(() => {
		if (station === stationId && turbocherger === turbochargerId) {
			if (configurations && labelsPage) {
				changeConfigureDraw(configurations.configureLabels({ data, tcs: turbocherger, thresholds, labels: labelsPage }));
				changeConfigureTable(configurations.configureDataTable({ data, tcs: turbocherger, thresholds, labels: labelsPage }));
				changeDimesionDraw(configurations.getDimesionDraw(turbocherger));
			}
		}
	}, [stationId, turbochargerId, turbocherger, station, data, labelsPage, configurations, thresholds, changeConfigureDraw, changeConfigureTable, changeDimesionDraw]);

	if (configureDraw && configureTable) {
		return (
			<React.Fragment>
				{isLoading && <Loading />}
				<SimpleChart
					dimesionDraw={dimesionDraw}
					configureDraw={configureDraw}
					changeIsLoading={changeIsLoading}
					isThresholds={isThresholds}
					changeOpenModal={changeOpenModal}
				/>
				{!isLoading && <WrapperTables data={configureTable} isThresholds={isThresholds} changeOpenModal={changeOpenModal} />}
			</React.Fragment>
		);
	}
	return <Loading />;
}

export default withRouter(
	React.memo(GasFuelCharts, (prevProps, nextProps) =>
		isEqualToObject(prevProps, nextProps)
	)
);
