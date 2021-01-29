//const MainTitle = `SNAM-Telediagnostica`;
import React from "react";
import { FormattedMessage } from "react-intl";

import { constants } from "./utils";

const routes = {
	homepage: {
		path: `/`,
		title: `Home`
	},
	login: {
		path: `/login`,
		title: `Login`
	},
	buy: {
		path: `/buy`,
		title: `Buy`
	},
	detail: {
		path: `/buy/:id/:idCabina`,
		title: `Buy`
	},
	pageNotFound: {
		path: `/pageNotFound/`,
		title: `Page not found`
	},
	panoramicaStazione: {
		path: `/panoramicaStazione/:id(${constants.stationsParam})/`,
		title: <FormattedMessage id="panoramica_stazione" />
	}
};

export default routes;
