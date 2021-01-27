import React from "react";
import { withRouter } from "react-router-dom";
import {
	WrapperTables,
	Loading,
	CartesianUI2,
	LabelWorkPoint
} from "../../../ui";

import {
	isEqualToObject,
	getValueByTag
} from "./../../../../utils";

function PerformanceCharts({ data, stationId, turbochargerId, thresholds, isThresholds, changeOpenModal, activeTab, configurations, labels }) {

	const [isLoading, changeIsLoading] = React.useState(true);
	const [station, changeStation] = React.useState(stationId);
	const [turbocherger, changeTurbocharger] = React.useState(turbochargerId);
	const [tab, changeTab] = React.useState(activeTab);
	const [configureTable, changeConfigureTable] = React.useState(null);
	const [labelsPage, changeLabelsPage] = React.useState(labels);

	React.useEffect(() => {
		changeStation(stationId);
		changeTurbocharger(turbochargerId);
		changeTab(activeTab);
		changeLabelsPage(labels);
		changeIsLoading(false);
		changeConfigureTable(null);
	}, [stationId, turbochargerId, activeTab, labels]);

	React.useEffect(() => {
		if(station === stationId && turbocherger === turbochargerId) {
			if(configurations && labelsPage) {
				changeConfigureTable(configurations.configureDataTable({data, tcs: turbocherger, activeTab: tab, getChart, thresholds, labels: labelsPage}));
			}
		}
	}, [station, stationId, turbocherger, turbochargerId, configurations, data, labelsPage, tab, thresholds]);

	if (configureTable) {
		return (
			<React.Fragment>
				{isLoading && <Loading />}
				{!isLoading && <WrapperTables data={configureTable} isThresholds={isThresholds} changeOpenModal={changeOpenModal} />}
			</React.Fragment>
		);
	}
	return <Loading />;
}

const getChart = (data, curves, idSelector, xPointer, yPointer, workPointer, xDomain, yDomain, xLabel, yLabel) => {
	return (
		<React.Fragment>
			<CartesianUI2
				idSelector={idSelector}
				data={curves}
				height={350}
				xDomain={xDomain}
				yDomain={yDomain}
				xLabel={xLabel}
				yLabel={yLabel}	
				xUnit={xLabel}
				yUnit={yLabel}			
				xWorkPoint={data[xPointer] ? getValueByTag(data, xPointer) : null}
				yWorkPoint={data[yPointer] ? getValueByTag(data, yPointer) : null}
			/>
			<LabelWorkPoint
				workPointer={workPointer}
				padding={'16px 0'}
			/>
		</React.Fragment>
	)
}

export default withRouter(
	React.memo(PerformanceCharts, (prevProps, nextProps) => isEqualToObject(prevProps, nextProps))
);
