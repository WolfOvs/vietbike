const compare = (st1, st2) => {
	if (st1.name < st2.name)
		return -1;
	if (st1.name > st2.name)
		return 1;
	return 0;
}

export const orderByStatus = (stations) => {
	//state Active
	const stationActive = stations.filter(station => station.state === 1);
	//state Disable
	const stationUnavailable = stations.filter(station => station.state === 0);
	//state Alert
	const stationAlert = stations.filter(station => station.state === 2);
	//order Stations
	stationActive.sort(compare);
	stationUnavailable.sort(compare);
	stationAlert.sort(compare);

	return stationActive.concat(stationAlert).concat(stationUnavailable);
}

export const getStationsByType = (stations = [], type) => stations && stations.filter(station => station.type === type);

export const getStationsByID = (stations = [], idStation) => stations && stations.find(station => Number(station.id) === Number(idStation));

/**
 * Object mapping station
 */
export const mappingStationsByString = {
	GA: 1,
	IS: 2,
	MB: 3,
	MS: 4,
	BO: 13,
	CO: 15,
	M1: 17,
	RP: 18,
	S1: 20,
	ME: 6,
	MM: 8,
	SB: 19
}

/**
 * Object mapping station
 */
export const mappingStationsByNumber = {
	1: 'GA',
	2: 'IS',
	3: 'MB',
	4: 'MS',
	13: 'BO',
	15: 'CO',
	18: 'RP',
	17: 'M1',
	20: 'S1',
	6: 'ME',
	8: 'MM',
	19: 'SB'
}

/**
 * 
 * @param {*} stationId 
 */
export const isShowStation = (stationId) => {
	switch (Number(stationId)) {
		case 1:
			return true;
		case 2:
			return true;
		case 3:
			return true;
		case 4:
			return true;
		case 13:
			return true;
		case 15:
			return true;
		case 17:
			return true;
		case 18:
			return true;
		case 20:
			return true;
		case 6:
			return true;
		case 8:
			return true;
		case 19:
			return true;
		default:
			return false;
	}
}

/**
 * Get labels by idPage
 */
export const getLabelsByIdPage = (labels = null, stationId, turbochargerId, idPage = '') => {
	if (labels && labels[mappingStationsByNumber[stationId]] && labels[mappingStationsByNumber[stationId]][turbochargerId]) {
		const labelsByIdPage = labels[mappingStationsByNumber[stationId]][turbochargerId].find(el => el.idPage === idPage);
		if (labels && labelsByIdPage) {
			return labelsByIdPage;
		}
	}
	return null;
}