//const MainTitle = `SNAM-Telediagnostica`;
import React from "react";
import { FormattedMessage } from "react-intl";

import { constants } from "./utils";

const routes = {
	homepage: {
		path: `/`,
		title: `Mappa Toscana`
	},
	login: {
		path: `/login`,
		title: `Login`
	},
	detail: {
		path: `/detail/:id/:idCabina`,
		title: `Cabina`
	},
	pageNotFound: {
		path: `/pageNotFound/`,
		title: `Page not found`
	},
	panoramicaStazione: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/`,
		title: <FormattedMessage id="panoramica_stazione" />
	},
	avvisiStazione: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/avvisi`,
		title: <FormattedMessage id="avvisi" />
	},
	panoramicaTCS: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})`,
		title: <FormattedMessage id="panoramica_tc" />
	},
	avvisiTcs: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/avvisi`,
		title: <FormattedMessage id="avvisi" />
	},
	trend: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/trend`,
		title: <FormattedMessage id="trend" />
	},
	trendsTcs: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/trend`,
		title: <FormattedMessage id="trend" />
	},

	// Calculated values
	prestazioni: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/prestazioni/:tab`,
		title: <FormattedMessage id="prestazioni" />
	},
	pems: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/pems`,
		title: <FormattedMessage id="pems" />
	},
	curva: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/curva/:tab`,
		title: <FormattedMessage id="curva" />
	},

	// Measured values
	tenutaGasCOCE: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/tenutaGasCOCE/:tab`,
		title: <FormattedMessage id="tenuta_gas_co_ce" />
	},
	filtriAntighiaccio: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/filtriAntighiaccio`,
		title: <FormattedMessage id="filtri_antighiaccio" />
	},
	lubrificazioneCOCE: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/olioMinerale`,
		title: <FormattedMessage id="lubrificazione_co_ce" />
	},
	mappaturaDLE: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/mappaturaDLE`,
		title: <FormattedMessage id="mappatura_dle" />
	},
	vibrazioni: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/vibrazioni/:tab`,
		title: <FormattedMessage id="vibrazioni" />
	},
	ventilazioni: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/ventilazione/:tab`,
		title: <FormattedMessage id="ventilazione" />
	},
	TBD: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/scaricoSpaziRuota`,
		title: <FormattedMessage id="exhaustSpacesWheel" />
	},
	olioSintetico: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/olioSintetico`,
		title: <FormattedMessage id="olio_sintetico" />
	},
	olio: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/olio/:tab`,
		title: <FormattedMessage id="olio" />
	},
	concentrazioneGas: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/concentrazioneGas`,
		title: <FormattedMessage id="concentrazioneGas" />
	},
	gasCombustibile: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/gasCombustibile`,
		title: <FormattedMessage id="gas_combustibile" />
	},

	//For page selection value
	thresholds: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/thresholds`,
		title: <FormattedMessage id="thresholds" />
	},
	thresholdsTcs: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/panoramicaTCS/:idtcs(${constants.turbochangerParam})/thresholds`,
		title: <FormattedMessage id="thresholds" />
	}
};

export default routes;
