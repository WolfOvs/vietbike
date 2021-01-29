import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect, provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { theme, Loading } from "./application/ui";

import routes from "./routes";
import config from './config/api-config';


//Principal page
const Home = React.lazy(() => import('./application/pages/home'));
const Buy = React.lazy(() => import('./application/pages/buy'));
const Details = React.lazy(() => import('./application/pages/details'));
const PageNotFound = React.lazy(() => import('./application/pages/pageNotFound'));

function App(props) {
	//Props
	const {
		
	} = props;

	//Use State
	const [themeValue] = React.useState(theme());

	
	const renderApp = () => {
		return (
				<div>
				<ThemeProvider theme={themeValue}>
						<Suspense fallback={<Loading />}>
							<BrowserRouter>
								<Switch>
									<Route
										path={routes.homepage.path}
										exact
										render={props => (
											<Home
												{...props}
												title={routes.homepage.title}
											/>
										)}
									/>
									<Route
										path={routes.buy.path}
										exact
										render={props => (
											<Buy
												{...props}
												title={routes.login.title}
											/>
										)}
									/>
									<Route path="*" render={() => <PageNotFound />} />
								</Switch>
							</BrowserRouter>
						</Suspense>
			</ThemeProvider>
				</div>
		)
	}
	return renderApp();

}

export default connect(
	state => {
		return {
			// pipelines: state.pipelines.pipelines,
			// centers: state.centers.centers,
			// stations: state.stationsList.stations,
			// isConfigDataLoaded: state.configFile.isConfigDataLoaded,
			// user: state.user,
			// serviceError: state.notifications.serviceError
		};
	},
	dispatch => {
		return {
			// dispatchGetPipelinesList: (clientId) => dispatch(getPipelinesList(clientId)),
			// dispatchGetCentersList: (clientId) => dispatch(getCentersList(clientId)),
			// dispatchGetStationsList: (clientId) => dispatch(getStationsList(clientId)),
			// dispatchRoleLogin: (filters) => dispatch(getRoleLogin(filters)),
			// dispatchGetEndPoints: () => dispatch(getConfigFile()),
		};
	}
)(App);
