import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
	Breadcrumb,
	BreadcrumbWithActionBar,
	Button,
	Modal
} from "../../ui";
import { WrapperBtn, NotificationCount } from './style';
import { Page, Map } from "../../components";
import { getStationsList } from "../../../redux/actions/stations";
import { getSetLimiti } from '../../../redux/actions/limiti';


function useMapFilter(filter) {
	const [filterMap, changeFilterMap] = React.useState(filter);
	function handleChange(nameFilter) {
		if (nameFilter === "Stoccaggio") {
			changeFilterMap({
				stoccaggio: !filterMap.stoccaggio,
				spinta: filterMap.spinta
			});
		}
		if (nameFilter === "Spinta") {
			changeFilterMap({
				stoccaggio: filterMap.stoccaggio,
				spinta: !filterMap.spinta
			});
		}
	}
	return [filterMap, handleChange];
}

const filtersObj = {
	map: [
		{
			id: 'suggestedLimit',
			name: 'Limite consigliato',
			value: true
		},
		{
			id: 'primaryNetwork',
			name: 'Rete primaria',
			value: true
		},
		{
			id: 'secondaryNetwork',
			name: 'Rete secondaria',
			value: true
		},
		{
			id: 'flowRate',
			name: 'Flusso portata',
			value: true
		},
		{
			id: 'districtBoundary',
			name: 'Confini di distretto',
			value: true
		},
		{
			id: 'regionBoundary',
			name: 'Confini di regione',
			value: true
		},
		{
			id: 'centerBoundary',
			name: 'Confini di centro',
			value: true
		}
	],
	notifications: [
		{
			id: 'Entry point',
			name: 'Entry point',
			value: true
		},
		{
			id: 'Giornalieri',
			name: 'Giornalieri',
			value: true
		},
		{
			id: 'Settimanali',
			name: 'Settimanali',
			value: true
		},
		{
			id: 'Mensili',
			name: 'Mensili',
			value: true
		},
		{
			id: 'Stagionali',
			name: 'Stagionali',
			value: true
		}
	]
}

function Home(props) {
	//Props
	const { stations, match, title, token, pipelines, centers, dispatchSetLimiti, setLimiti, dispatchGetStationsList, updatedStations } = props;
	//Use State
	const [isOpenFilters, changeIsOpenFilters] = React.useState(false);
	const [filterState, changeFilterState] = useMapFilter({ stoccaggio: true, spinta: true });
	const [isOpenNotification, changeOpenNotification] = React.useState(false);
	const [showFiltersModal, toggleShowFiltersModal] = React.useState(false);
	const [showLimitModal, toggleShowLimitModal] = React.useState(false);
	const [refresh, toggleRefresh] = React.useState(false);
	const [filterOptions, setFilterOptions] = React.useState(filtersObj);
	const [arrString, setArrString] = React.useState('0,1,2,3,4');
	const [filterActive, setFilterActive] = React.useState(false);

	let notificationsFiltered2 = [];
	const [stationsMap, setStations] = React.useState(pipelines);
	const [stationsNotifications, setStationsNotifications] = React.useState(stations);
	const [stationsUpdate, setStationsUpdate] = React.useState({});
	const [notificationsFiltered, setNotificationsFiltered] = React.useState([]);
	const [setLimitiInfo, changesetLimitiInfo] = React.useState({});
	const [confirmLimits, setConfirmLimits] = React.useState(false);
	const [confirmLimitsFeedback, changeConfirmLimitsFeedback] = React.useState({});
	const [updateTime, changeUpdateTime] = React.useState(new Date());
	const [ridp, setRidp] = React.useState(props.location.ridp ? props.location.ridp : localStorage.getItem('RIDP'));
	const tokenAD = localStorage.getItem('token');

	if(props.location.ridp) {
		localStorage.setItem('RIDP', props.location.ridp);
	}

	React.useEffect(() => {
		let localRidp = localStorage.getItem('RIDP');

		if(!localRidp) {
			// props.history.push('/');
		}
	}, [ridp])

	const checkConfirmLimits = () => {
		if(setLimiti === 'OK') {
			toggleShowLimitModal(false);
			changesetLimitiInfo({});
			dispatchGetStationsList(ridp, tokenAD);
		}else if(setLimiti === 'KO'){
			let feedback = {
				name: setLimitiInfo.name,
				id: setLimitiInfo.id,
				status: setLimiti
			}
			changeConfirmLimitsFeedback(feedback);
			const timer = setTimeout(() => {
				changeConfirmLimitsFeedback({});
				}, 5000);
			return () => clearTimeout(timer);
		}
	}


	React.useEffect(() => {
		setInterval(function(){
			dispatchGetStationsList(ridp, tokenAD);
		}, 600000);
		
		if(confirmLimits) {
			setFilterActive(false);
			dispatchSetLimiti({ 
				idMisuratore: setLimitiInfo.idMisuratore,
				accettaLimiti: setLimitiInfo.confirmed,
				noteLimiti: setLimitiInfo.note ? setLimitiInfo.note : ''
			}, tokenAD);
			setConfirmLimits(false);
		}else {
			if(setLimiti) {
				checkConfirmLimits();
			}
		}
		
	}, [setLimiti, confirmLimits,  dispatchSetLimiti, dispatchGetStationsList]);

	const openFilters = () => {
		changeIsOpenFilters(!isOpenFilters);
	};

	const openNotification = () => {
		changeOpenNotification(!isOpenNotification);
	};

	const changeFilterOptions = (name, type, value) => {
		let filters = filterOptions;
		filters[type].map((i) => {
			if(i.name === name) {
				i.value = !value;
			}
		});
		toggleRefresh(!refresh)
		setFilterOptions(filters);
	}

	const resetFilterOptions = (type, value) => {
		let filters = filterOptions;
		filters['map'].map((i) => {
			i.value = true;
		});
		filters['notifications'].map((i) => {
			i.value = true;
		});
		toggleRefresh(!refresh)
		setFilterOptions(filters);
	}

	const resetFilters = (filters) => {
		setFilterActive(false);
		resetFilterOptions();
		confirmFilters(filters)
	}

	const filterMapValues = (array) => {
		const mapValues = [{
			id: "primaryNetwork",
			value: "4"
		},
		{
			id: "secondaryNetwork",
			value: "3"
		},
		{
			id: "districtBoundary",
			value: "2"
		},
		{
			id: "regionBoundary",
			value: "1"
		},
		{
			id: "centerBoundary",
			value: "0"
		}
		]
		filterOptions.map.map((item) => {
			mapValues.map((el) =>{
				if(item.id === el.id) {
					item.value ? array.push(el.value) : array.filter(e => e !== el.value);
				}
			})
		})
	}

	const filterNotificationCenter = (item) => {
		const notificationValues = [{
			id: "Entry point",
			time: "EP"
		},
		{
			id: "Giornalieri",
			time: "Giornaliero"
		},
		{
			id: "Settimanali",
			time: "Settimanale"
		},
		{
			id: "Mensili",
			time: "Mensile"
		},
		{
			id: "Stagionali",
			time: "Stagionale"
		}
		]
		let filteredItem = [];
		notificationValues.map((el) => {
			if(item.id === el.id) {
				stationsNotifications.map((element) => {
					let cabine = element.impiantoDiRiduzione.filter((cabina) => {
						return cabina.limiteConsigliato && cabina.time === el.time;
					});
					if (element.notification && element.state !== 1 && cabine.length > 0) {
						let impianto = {
							name: element.name,
							id: element.id,
							notification: element.notification,
							state: element.state,
							impiantoDiRiduzione: element.impiantoDiRiduzione.filter((cabina) => {
								return cabina.limiteConsigliato && cabina.time === el.time;
							})
						}
						filteredItem.push(impianto);
					}
				})
			}
		})
		if(item.value) {
			notificationsFiltered2.push(filteredItem);
			setNotificationsFiltered([...notificationsFiltered, ...filteredItem]);
		} else {
			notificationsFiltered2.filter(e => e !== filteredItem);
		}
	}

	const confirmFilters = (filters) => {
		let arrayMapValues = [];
		console.log(filterOptions);

		filterMapValues(arrayMapValues);

		if(filterOptions.map[0].value) {
			const containerMap = document.querySelector('#map');
			containerMap.classList.remove('noNotification')
		} else {
			const containerMap = document.querySelector('#map');
			containerMap.classList.add('noNotification')
		}
		
		if(filterOptions.map[3].value) {
			setStations(pipelines);
		} else {
			setStations([]);
		}
		// notification filters

		filterOptions.notifications.forEach((item) => {
			filterNotificationCenter(item);
		})

		let arr = arrayMapValues.join(",");

		let arrfinal = [].concat(...notificationsFiltered2);

		let arrfinalFiltered = arrfinal.filter(function( element ) {
			return element !== undefined;
		 });
		
		
		setNotificationsFiltered(arrfinalFiltered);
		setFilterActive(true);
		setArrString(arr);
		toggleRefresh(!refresh);
		setFilterOptions(filters);
		toggleShowFiltersModal(false);
	}

	// const iconFilters = isOpenFilters ? [{ key: "closeX", onClick: openFilters }] : [{ key: "filters", onClick: openFilters }];
	// const isMobile = window.innerWidth > theme().constants.BREAKPOINT_MOBILE;

	let notificationCount = null;

	stations.forEach((element) => {
		if (element.notification && element.state !== 1) {
			element.impiantoDiRiduzione.map((item) => {
				if(item.limiteConsigliato) {
					notificationCount++
				}
			})
		}
	});

	const setLimitsModal = (cabin, stationName, state) => {
		const details = {
			name: stationName,
			cabin: cabin.name,
			date: cabin.limitDate,
			id: cabin.id,
			idMisuratore: cabin.idMisuratore,
			confirmed: state,
			note: ''
		}
		changesetLimitiInfo(details);
		if(details.confirmed === 'NO') {
			toggleShowLimitModal(true);
		}else {
			setConfirmLimits(true);
		}
		
	}

	React.useEffect(() => {
		if(updatedStations){
			setStationsUpdate(updatedStations);
			setStationsNotifications(updatedStations);
		}
		
	}, [dispatchGetStationsList, updatedStations]);

	return (
		<Page
			stations={notificationsFiltered && filterActive ? notificationsFiltered : stationsNotifications}
			pageCurrent={match}
			isOpenNotification={isOpenNotification}
			actionNotification={openNotification}
			notificationCount={notificationCount}
			ridp={ridp}
			showModalAction={setLimitsModal}
			confirmLimits={confirmLimitsFeedback}
			confirmLimitsAction={changeConfirmLimitsFeedback}
		>
			<BreadcrumbWithActionBar>
				<Breadcrumb paths={[{
					key: 'Set Limiti',
					title: title,
					url: match.url
				}]}
				time={updateTime} />
				<WrapperBtn>
					<Button 
						text={"Filtra"}
						icon={"iconFilter"}
						sizeIcon={30}
						height={"42px"}
						padding={"0px 5px 0px 10px"}
						width={"120px"}
						action={() => toggleShowFiltersModal(true)}
						/>
						{notificationCount > 0  && !isOpenNotification &&
							<NotificationCount>
								<span>{notificationCount}</span>
							</NotificationCount>
						}
					{!isOpenNotification &&
					<Button 
						shake={notificationCount > 0 ? true : false}
						icon={"iconBell"}
						sizeIcon={30}
						height={"42px"}
						width={"42px"}
						padding={"0px 10px"}
						action={openNotification}
					/> }
				</WrapperBtn>
			</BreadcrumbWithActionBar>
			<Modal
				showModal={showFiltersModal}
				onClose={() => toggleShowFiltersModal(false)}
				maxWidth={'840px'}
				refresh={refresh}
				maxWidth={'800px'}
				filters={filterOptions}
				toggleAction={changeFilterOptions}
				cancel={resetFilters}
				confirm={confirmFilters}
			/>
			<Modal
				showModal={showLimitModal}
				onClose={() => toggleShowLimitModal(false)}
				maxWidth={'680px'}
				setLimiti={setLimitiInfo}
				setLimitiAction={setConfirmLimits}
				changesetLimiti={changesetLimitiInfo}
				confirmLimits={confirmLimitsFeedback}
				confirmLimitsAction={changeConfirmLimitsFeedback}
			/>
			<Map stations={stations}
				updatedStations={stationsUpdate}
				 stationsMap={stationsMap}
				 filterMap={arrString} 
				 filterOptions={filterOptions} 
				 filters={filterState}
				 showModalAction={setLimitsModal}
				 pipelines={pipelines}
				 centers={centers}
				 confirmLimits={confirmLimitsFeedback}
				 confirmLimitsAction={changeConfirmLimitsFeedback}
				 updateInfoTime={updateTime}
				 filterState={filterActive}
			/>
		</Page>
	);
}

Home.propTypes = {
	stations: PropTypes.object,
	side: PropTypes.string
};

Home.defaultProps = {
	stations: {},
	side: 'left'
};

export default connect(
	state => {
		return {
			//keyTopik: state.mqtt.keyTopik,
			setLimiti: state.limiti.setLimiti,
			updatedStations: state.stationsList.stations,
		};
	},
	dispatch => {
		return {
			dispatchSetLimiti: (limitInfo, tokenAD) => dispatch(getSetLimiti(limitInfo, tokenAD)),
			dispatchGetStationsList: (clientId, tokenAD) => dispatch(getStationsList(clientId, tokenAD)),
		};
	}
)(Home);
