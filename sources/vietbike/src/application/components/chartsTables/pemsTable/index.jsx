import React from "react";
import { withRouter } from "react-router-dom";
import {
	WrapperTables,
	TablePems,
	Loading
} from "../../../ui";

import {
	isEqualToObject
} from "./../../../../utils";

function PemsTable({ data, stationId, turbochargerId, configurations, labels }) {

	const [isLoading, changeIsLoading] = React.useState(true);
	const [station, changeStation] = React.useState(stationId);
	const [turbocherger, changeTurbocharger] = React.useState(turbochargerId);
	const [configureTable, changeConfigureTable] = React.useState(null);
	const [configureTablePems, changeConfigureTablePems] = React.useState(null);
	const [labelsPage, changeLabelsPage] = React.useState(labels);

	React.useEffect(() => {
		changeStation(stationId);
		changeTurbocharger(turbochargerId);
		changeLabelsPage(labels);
		changeIsLoading(false);
		changeConfigureTable(null);
		changeConfigureTablePems(null);
	}, [stationId, turbochargerId, labels]);

	React.useEffect(() => {
		if(station === stationId && turbocherger === turbochargerId) {
			if(configurations && labelsPage) {
				changeConfigureTablePems(configurations.configureDataTablePems({data, tcs: turbocherger, labels: labelsPage}));
				changeConfigureTable(configurations.configureDataTable({data, tcs: turbocherger, labels: labelsPage}));
			}
		}
	}, [station, stationId, turbocherger, turbochargerId, configurations, data, labelsPage]);

	if (configureTable) {
		return (
			<React.Fragment>
				{isLoading && <Loading />}
				{!isLoading && <TablePems data={configureTablePems}/>}
				{!isLoading && <WrapperTables data={configureTable} />}
			</React.Fragment>
		);
	}
	return <Loading />;
}

export default withRouter(
	React.memo(PemsTable, (prevProps, nextProps) => isEqualToObject(prevProps, nextProps))
);
