export const getBreadcrumbTCSDetail = (param) => {
	return [
		{
			key: "home",
			title: "Home",
			url: "/"
		},
		{
			key: "panoramicaStazione",
			title: param.nameStation,
			url: `/panoramicaStazione/${param.currentStationId}`
		},
		{
			key: "tcsOverflow",
			title: param.nameTCS,
			url: `/panoramicaStazione/${param.currentStationId}/panoramicaTCS/${param.currentTurbochargerId}`
		},
		{
			key: param.key,
			title: param.title,
			url: param.url
		}
	];
}

//[{key: 'Parameter', value: value}, {key: 'Parameter', value: value}]
export const getUrlWithParimeters = (currentUrl, parameters) => {
	const url = currentUrl.split("/");
	parameters.forEach(parameter => {
		const index = url.indexOf(parameter.key);
		if(index >= 0) {
			url[index] = parameter.value
		}
	})
	return url.join('/');
}

export const getTcsByStation = (stations, idStation, idTcs) => {
	if(stations) {
		const tmpStation = stations.find(
			station => Number(station.id) === Number(idStation)
		);
		return tmpStation && tmpStation.data.tcs.find(
			tc => Number(tc.id) === Number(idTcs)
		);
	}
	return null;
}

export const getStartTC = (state) => (state === 4 || state === 3 || state === 2);