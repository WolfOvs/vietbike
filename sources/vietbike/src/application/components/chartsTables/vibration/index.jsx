import React from "react";
import { withRouter } from "react-router-dom";
import { SimpleChartTab, WrapperTables, Loading } from "../../../ui";

import { isEqualToObject } from "./../../../../utils";

function VibrationCharts({ data, stationId, turbochargerId, activeTab, thresholds, isThresholds, changeOpenModal,  goToDetails, configurations, labels }) {

	const [isLoading, changeIsLoading] = React.useState(true);
	const [station, changeStation] = React.useState(stationId);
	const [turbocherger, changeTurbocharger] = React.useState(turbochargerId);
	const [tab, changeTab] = React.useState(activeTab);
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
		changeDimesionDraw(null);
	}, [stationId, turbochargerId, labels, changeStation, changeTurbocharger, changeLabelsPage, changeConfigureDraw, changeConfigureTable]);

	React.useEffect(() => {
		if (activeTab !== tab) {
			changeTab(activeTab);
		}
		if (station === stationId && turbocherger === turbochargerId) {
			if (configurations && labelsPage) {
				changeConfigureDraw(configurations.configureLabels({ data, tcs: turbochargerId, activeTab, thresholds, labels: labelsPage }));
				changeConfigureTable(configurations.configureDataTable({ data, tcs: turbochargerId, activeTab, thresholds, labels: labelsPage }));
				changeDimesionDraw(configurations.getDimesionDraw(turbochargerId));
			}
		}
	}, [station, stationId, tab, turbochargerId, turbocherger, data, labelsPage, activeTab, changeConfigureDraw, changeConfigureTable, changeDimesionDraw, configurations, thresholds]);


	if (configureDraw && configureTable) {
		return (
			<React.Fragment>
				{isLoading && <Loading />}
				<SimpleChartTab
					goToDetails={goToDetails}
					configureDraw={configureDraw}
					dimesionDraw={dimesionDraw}
					changeIsLoading={changeIsLoading}
					configureTab={configurations.configurationTab(turbochargerId)}
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
	React.memo(VibrationCharts, (prevProps, nextProps) => isEqualToObject(prevProps, nextProps))
);
