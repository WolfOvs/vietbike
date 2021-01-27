import React from "react";
import { withRouter } from "react-router-dom";
import { IstoChartUI, WrapperTables, Loading, SimpleChartRadial } from "../../../ui";

import { isEqualToObject, configureDataRadarChart } from "./../../../../utils";

function ExhaustSpacesWheelCharts({ data, stationId, turbochargerId, configurations, labels, thresholds, isThresholds, changeOpenModal }) {
	const [isLoading, changeIsLoading] = React.useState(true);
	const [station, changeStation] = React.useState(stationId);
	const [turbocherger, changeTurbocharger] = React.useState(turbochargerId);
	const [labelsPage, changeLabelsPage] = React.useState(labels);
	const [dimesionDraw, changeDimesionDraw] = React.useState(null);
	const [configureDraw, changeConfigureDraw] = React.useState(null);
	const [configureTable, changeConfigureTable] = React.useState(null);
	const [radarData, changeRadarData] = React.useState(null);

	React.useEffect(() => {
		changeStation(stationId);
		changeTurbocharger(turbochargerId);
		changeLabelsPage(labels);
		changeConfigureDraw(null);
		changeConfigureTable(null);
		changeRadarData(null);
	}, [stationId, turbochargerId, labels]);

	React.useEffect(() => {
		if (station === stationId && turbocherger === turbochargerId) {
			if (configurations && labelsPage) {
				changeConfigureDraw(configurations.configureLabels({data, tcs: turbocherger, thresholds, labels: labelsPage}));
				changeConfigureTable(configurations.configureDataTable({data, tcs: turbocherger, thresholds, labels: labelsPage, getChart}));
				changeDimesionDraw(configurations.getDimesionDraw(turbocherger));
				changeRadarData(configureDataRadarChart({dataChart: data, tcs: turbocherger, labels: labelsPage}));
			}
		}
	}, [station, stationId, turbocherger, turbochargerId, configurations, data, labelsPage, thresholds, changeConfigureDraw, changeConfigureTable, changeDimesionDraw]);
	
	if (configureDraw && configureTable && labelsPage) {
		return (
			<React.Fragment>
				{isLoading && <Loading />}
				<SimpleChartRadial
					stationId={stationId}
					turbochargerId={turbochargerId}
					dimesionDraw={dimesionDraw}
					configureDraw={configureDraw}
					changeIsLoading={changeIsLoading}
					dataRadialCharts={radarData}
					isThresholds={isThresholds}
					changeOpenModal={changeOpenModal}
				/>
				{!isLoading && <WrapperTables data={configureTable} isThresholds={isThresholds} changeOpenModal={changeOpenModal} />}
			</React.Fragment>
		);
	}
	return <Loading />
}

const getChart = (idSelector, data, yLabel, width, height, domain, ticks) => {
	return (
		<IstoChartUI
			idSelector={idSelector}
			data={data}
			width={width}
			height={height}
			xDomain={data}
			yDomain={domain ? domain : [0, 1000]}
			ticks={ticks}
			margin={{ top: 30, left: 30, bottom: 30, right: 30 }}
			yLabel={yLabel}
		/>
	)
}

export default withRouter(
	React.memo(ExhaustSpacesWheelCharts, (prevProps, nextProps) =>
		isEqualToObject(prevProps, nextProps)
	)
);
