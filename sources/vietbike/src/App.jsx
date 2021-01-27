import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect, provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { theme, Loading } from "./application/ui";

import { getStationsList } from "./redux/actions/stations";
import { getCentersList } from "./redux/actions/centers";
import { getPipelinesList } from "./redux/actions/pipelines"

import { getRoleLogin } from './redux/actions/login';
import { getConfigFile } from './redux/actions/configFile';
import routes from "./routes";
import config from './config/api-config';
import queryString from 'query-string';
import jwt_decode from "jwt-decode";

import qs from 'qs';
import axios from 'axios';

//Principal page
const Home = React.lazy(() => import('./application/pages/home'));
const Login = React.lazy(() => import('./application/pages/login'));
const Details = React.lazy(() => import('./application/pages/details'));
const PageNotFound = React.lazy(() => import('./application/pages/pageNotFound'));

function App(props) {
	//Props
	const {
		stations,
		centers,
		pipelines,
		dispatchGetStationsList,
		dispatchGetCentersList,
		dispatchGetPipelinesList,
		dispatchGetEndPoints,
		isConfigDataLoaded,
		dispatchRoleLogin,
		serviceError,
		user,
	} = props;

	//Use State
	const [themeValue] = React.useState(theme());
	const [userLogin, changeUserLogin] =
		React.useState({
			ridp: null,
			role: null,
			token: null
		});
	const [centersData, changeCentersData] = React.useState(null);
	const [stationsData, changeStationsData] = React.useState(null);
	const [pipelinesData, changePipelinesData] = React.useState(null);
	const [checkToken, changecheckToken] = React.useState(null);
	const changeStation = () => {
		 changeStationsData(
		 	
		 );
	}

	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get('code');

	const token = localStorage.getItem('token');
	let tokenStore = token ? token : null;

	const [tokenAD, changeTokenAD] = React.useState(tokenStore);

	const post = queryString.stringify({
		client_id: '3ff06d16-4185-41a5-941e-ffd75e927a79',
		client_secret: '_u4__-.G6.mhB5Zp2TxE3tW8ItGz-AAlwC',
		scope: 'https://graph.microsoft.com/mail.read',
		redirect_uri: 'https://intelligentdisp-t.snamretegas.priv/',
		grant_type: 'authorization_code',
	});
	//comment

	const postFinal = post + '&code=' + code; 

	let flagToken = true;

	if (!token && flagToken) {
		flagToken = false;
		console.log('call')
		axios({
			method: 'post',
			url: 'https://snam-noprod-apimgmt.azure-api.net/intelligentdisp-d/token',
			data: postFinal,
			headers: {
			  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
			}
		  }).then(function (response) {
			console.log(response);

			localStorage.setItem('token', response.data.id_token);
			changeTokenAD(response.data.id_token);

			const tokenRidp = response.data.id_token;
			const decoded = jwt_decode(tokenRidp);
		  })
		  .catch(function (error) {
			console.log(error);
		  })
	}

	//Use Effect
	React.useEffect(() => {
		dispatchGetEndPoints();

		 if (isConfigDataLoaded && tokenAD) {
			const tokenRidp = token;
			const decoded = jwt_decode(tokenRidp);
			
			dispatchRoleLogin({ username: 'RIDP8NL' }, tokenAD);
			
		 } else {
		 	dispatchGetEndPoints();
		 }

		return () => clearInterval(checkToken)
		// eslint-disable-next-line 
	}, [dispatchGetEndPoints, isConfigDataLoaded, dispatchRoleLogin, tokenAD]);

	React.useEffect(() => {
		if (!stations) {
			changeStation();
			console.log('tokenAD', tokenAD)
			if (tokenAD) {
				dispatchGetStationsList();
			}
		} else {
			if (JSON.stringify(stations) !== JSON.stringify(stationsData)) {
				changeStationsData(stations);
			}
		}
	}, [stations, stationsData, dispatchGetStationsList, tokenAD]);

	React.useEffect(() => {
		if (!centers && tokenAD) {
			dispatchGetCentersList();
			
		} else {
			if (JSON.stringify(centers) !== JSON.stringify(centersData)) {
				changeCentersData(centers);
			}
		}
	}, [centersData, centers, dispatchGetCentersList, tokenAD]);

	React.useEffect(() => {
		if (!pipelines && tokenAD) {
			dispatchGetPipelinesList();
			
		} else {
			if (JSON.stringify(pipelines) !== JSON.stringify(pipelinesData)) {
				changePipelinesData(pipelines);
			}
		}
	}, [pipelinesData, pipelines, dispatchGetPipelinesList, tokenAD]);
	
	const renderApp = () => {
		return (
			<div>
			{stations && pipelines && centers &&
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
												stations={stations}
												login={userLogin}
												pipelines={pipelines}
												centers={centers}
												changeStations={changeStationsData}
											/>
										)}
									/>
									<Route
										path={routes.login.path}
										exact
										render={props => (
											<Login
												{...props}
												title={routes.login.title}
											/>
										)}
									/>
									<Route
										path={routes.detail.path}
										exact
										render={props => (
											<Details
												{...props}
												title={routes.detail.title}
												stations={stations}
												login={userLogin}
												changeStations={changeStationsData}
											/>
										)}
									/>
									<Route path="*" render={() => <PageNotFound />} />
								</Switch>
							</BrowserRouter>
						</Suspense>
			</ThemeProvider>
				</div>
		}
		</div>
		)
	}

	if (serviceError) {
		return renderApp();
	} else {
		if (isConfigDataLoaded) {
			return renderApp();
	}
		return <ThemeProvider theme={themeValue}><Loading /></ThemeProvider>;
	}
}

export default connect(
	state => {
		return {
			pipelines: state.pipelines.pipelines,
			centers: state.centers.centers,
			stations: state.stationsList.stations,
			isConfigDataLoaded: state.configFile.isConfigDataLoaded,
			user: state.user,
			serviceError: state.notifications.serviceError
		};
	},
	dispatch => {
		return {
			dispatchGetPipelinesList: (clientId) => dispatch(getPipelinesList(clientId)),
			dispatchGetCentersList: (clientId) => dispatch(getCentersList(clientId)),
			dispatchGetStationsList: (clientId) => dispatch(getStationsList(clientId)),
			dispatchRoleLogin: (filters) => dispatch(getRoleLogin(filters)),
			dispatchGetEndPoints: () => dispatch(getConfigFile()),
		};
	}
)(App);
