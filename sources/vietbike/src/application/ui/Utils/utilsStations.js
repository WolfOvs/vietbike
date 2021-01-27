/**
 * Return key icon by type station (stoccaggio, spinta)
 * @param {*} type 
 */
const getIconKeyByType = (type) => {
  switch(type) {
    case 1:
      return 'iconStoccaggio';   
    default:
     return 'iconSpinta';     
  }
}

/**
 * Return key icon by state TCS 
 * @param {*} stateTC 
 */
const getIconTcsByState = (stateTC) => {
  switch (stateTC) {
    case 1:
			return 'iconStationary';
		case 2:
      return 'inShutdown';
		case 3:
			return 'duringStartUp';
		case 4:
			return 'iconMarching';
		default:
      return 'iconUnavailable';
  }
}

/**
 * Return key for creating dot in icon station by state
 * @param {*} state 
 */
const getStateStation = (state) => {
  switch (state) {
    case 1:
      return 'marching';
    case 2:
			return 'stationary';
		default:
			return 'unavailable';
  }
}

/**
 * Return key for icon state spinta by state
 * @param {*} state 
 */
const getIconStatetionsSpinta = (state) => {
	switch (state) {
		case 1:
			return 'iconSpintaRun';
		case 2:
			return 'iconSpintaReady';
		default:
			return 'iconSpintaNotRun';
	}
}

/**
 * Return key for icon state stoccaggio by state
 * @param {*} state 
 */
const getIconStatetionsStoccaggio = (state) => {
	switch (state) {
		case 1:
			return 'iconStoccaggioRun';
		case 2:
			return 'iconStoccaggioReady';
		default:
			return 'iconStoccaggioNotRun';
	}
}

export {
	getIconKeyByType,
	getIconTcsByState,
	getStateStation,
	getIconStatetionsSpinta,
	getIconStatetionsStoccaggio
}