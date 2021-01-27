import React from "react";
import { withRouter } from 'react-router-dom';

import { MapUI } from "../../ui";
import "./style.css";

/**
 * Custom Hook that manage the state of visibility of the marker in the map
 * @return [visibilityStations, handleChange, initVisibilityArray] where:
 * - visibilityStations save in an array the visibility for each marker in the map
 * - handleChange function to change the value of visibilityStations
 * - initVisibilityArray function to set visibilityStations for the first time
 */
function useVisibility() {
  const [visibilityStations, changeVisibilityStations] = React.useState([]);

  function handleChange(stations, {spinta,stoccaggio}) {
    let array = [...visibilityStations];
      stations.forEach((s, index) => {
        if (s.type === 0) array[index] = spinta;
        if (s.type === 1) array[index] = stoccaggio;
      });
      changeVisibilityStations(array);
  }

  function initVisibilityArray(stations) {
    let array = [];
    stations.forEach(s => array.push(true));
    changeVisibilityStations([...array]);
  }

  return [visibilityStations, handleChange, initVisibilityArray];
}

/**
 * This component manage the logic of the map
 */
function Map({ history, stations, updatedStations, filters, filterOptions, filterMap, stationsMap, showModalAction, pipelines, centers, confirmLimits, confirmLimitsAction, updateInfoTime, filterState }) {
	// Use Effect
  const [visibility, changeVisibility, initVisibility] = useVisibility();
  React.useEffect(() => {

  }, [filterMap])
	
  /**
   *  When the informations about stations arrive for the first time 
   * I set the initial visibility of stations
   **/ 
	React.useEffect(() => {
		if(stations && stations.length > 0) {
			initVisibility(stations);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps  
	}, [stations])

  const position = [43.46, 11.15];


  return (
    <MapUI
      filterOptions={filterOptions}
      stations={stations ? stations : []}
      updatedStations={updatedStations}
      visibilityStations={visibility}
      position={position}
      history={history}
      filterMap={filterMap}
      stationsMap={stationsMap}
      showModalAction={showModalAction}
      pipelines={pipelines}
      centers={centers}
      confirmLimits={confirmLimits}
      confirmLimitsAction={confirmLimitsAction}
      updateInfoTime={updateInfoTime}
      filterState={filterState}
    />
  );
}

export default withRouter(Map);
