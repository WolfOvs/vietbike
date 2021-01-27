import React from 'react';

export const usePageStateTCS = () => {
  const [turbochargerName, changeTurbochargerName] = React.useState(null);
	const [turbochargerData, changeTurbochargerData] = React.useState(null);
  const [stationData, changeStationData] = React.useState(null);

  function chanceValues({tcName = null, tcData = null, station = null}) {
    if(tcData)
      changeTurbochargerData(tcData);
    if(tcName)
			changeTurbochargerName(tcName);
    if(station)
      changeStationData(station);
  }
  
  return [{turbochargerName, turbochargerData, stationData}, chanceValues];
}