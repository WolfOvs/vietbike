import React from "react";
import { withRouter } from "react-router-dom";
import { SimpleChart, WrapperTables, Loading } from "../../../ui";

import { isEqualToObject } from "./../../../../utils";

function GasSealCharts({ stationId, turbochargerId, data, activeTab, thresholds, isThresholds, changeOpenModal, configurations, labels }) {

	const [isLoading, changeIsLoading] = React.useState(true);
	const [station, changeStation] = React.useState(stationId);
	const [turbocherger, changeTurbocharger] = React.useState(turbochargerId);
	const [tab, changeTab] = React.useState(activeTab);
	const [labelsPage, changeLabelsPage] = React.useState(labels);
	const [configureDraw, changeConfigureDraw] = React.useState(null);
	const [configureTable, changeConfigureTable] = React.useState(null);
	const [dimesionDraw, changeDimesionDraw] = React.useState(null);

	React.useEffect(() => {
		changeStation(stationId);
		changeTurbocharger(turbochargerId);
		changeTab(activeTab);
		changeLabelsPage(labels);
		changeConfigureDraw(null);
		changeConfigureTable(null);
	}, [stationId, turbochargerId, activeTab, labels]);
	
	React.useEffect(() => {
		if (station === stationId && turbocherger === turbochargerId) {
			if (configurations && labelsPage) {
				changeConfigureDraw(configurations.configureLabels({ data, tcs: turbocherger, activeTab: tab, thresholds, labels: labelsPage }));
				changeConfigureTable(configurations.configureDataTable({ data, tcs: turbocherger, activeTab: tab, thresholds, labels: labelsPage }));
				changeDimesionDraw(configurations.getDimesionDraw(turbocherger));
			}
		}
	}, [stationId, turbochargerId, data, station, turbocherger, tab, labelsPage, configurations, changeConfigureDraw, changeConfigureTable, changeDimesionDraw, thresholds, activeTab]);

	if (configureDraw && configureTable) {
		
		return (
			<React.Fragment>
				{isLoading && <Loading />}
				<SimpleChart
					configureDraw={configureDraw}
					dimesionDraw={dimesionDraw}
					activeTab={tab}
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
	React.memo(GasSealCharts, (prevProps, nextProps) =>
		isEqualToObject(prevProps, nextProps)
	)
);
