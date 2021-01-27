import React from "react";
import { withRouter } from "react-router-dom";
import { SimpleChart, WrapperTables, Loading } from "../../../ui";

import { isEqualToObject } from "../../../../utils";

function FabricatedCharts({ data, stationId, turbochargerId, activeTab, changeOpenModal, isThresholds, thresholds, configurations, labels }) {

	const [isLoading, changeIsLoading] = React.useState(true);
	const [station, changeStation] = React.useState(stationId);
	const [turbocherger, changeTurbocharger] = React.useState(turbochargerId);
	const [labelsPage, changeLabelsPage] = React.useState(null);
	const [configureDraw, changeConfigureDraw] = React.useState(null);
	const [configureTable, changeConfigureTable] = React.useState(null);
	const [dimesionDraw, changeDimesionDraw] = React.useState(null);
	const [tab, changeTab] = React.useState(activeTab);

	React.useEffect(() => {
		changeStation(stationId);
		changeTurbocharger(turbochargerId);
		changeTab(activeTab);
		changeLabelsPage(labels);
		changeConfigureDraw(null);
		changeConfigureTable(null);
		changeDimesionDraw(null);
	}, [stationId, turbochargerId, activeTab, labels]);

	React.useEffect(() => {
		if (station === stationId && turbocherger === turbochargerId) {
			if (configurations && labelsPage) {
				changeConfigureDraw(configurations.configureLabels({data, tcs: turbocherger, tab, thresholds, labels: labelsPage}));
				changeConfigureTable(configurations.configureDataTable({data, tcs: turbocherger, tab, thresholds, labels: labelsPage}));
				changeDimesionDraw(configurations.getDimesionDraw({tcs: turbocherger, tab}));
			}
		}
	}, [station, stationId, turbocherger, turbochargerId, configurations, data, tab, labelsPage, thresholds, changeConfigureDraw, changeConfigureTable, changeDimesionDraw]);

	if (configureDraw && configureTable) {
				return (
					<React.Fragment>
						{isLoading && <Loading />}
						<SimpleChart
							configureDraw={configureDraw}
							changeIsLoading={changeIsLoading}
							isThresholds={isThresholds}
							changeOpenModal={changeOpenModal}
							dimesionDraw={dimesionDraw}
						/>
						{!isLoading && <WrapperTables data={configureTable} isThresholds={isThresholds} changeOpenModal={changeOpenModal} />}
					</React.Fragment>
				);
		}
	return <Loading />;
}

export default withRouter(
	React.memo(FabricatedCharts, (prevProps, nextProps) => isEqualToObject(prevProps, nextProps))
);
