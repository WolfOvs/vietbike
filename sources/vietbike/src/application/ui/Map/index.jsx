import React from "react";
import L from "leaflet";
import { Map, TileLayer, FeatureGroup, Popup, ZoomControl, Marker, Tooltip, WMSTileLayer } from "react-leaflet";

import iconCollection from "../base/Icon/svg";
import Carousel from "../Carousel";

class MapUI extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filters: this.props.filterOptions,
			zoom: 9,
			markers: [],
			stations: this.props.stations,
			centers: this.props.centers,
			pipelines: this.props.pipelines,
			filterMapLayers: this.props.filterMap,
			stationsMap: this.props.stationsMap
		}
		this.map = React.createRef();
	}

	getIconStation(station, isOpenPopup) {
		let icon = isOpenPopup ? 'iconPlus' : 'closeX';
		let iconClass = isOpenPopup ? 'leaflet-marker-icon-plus' : 'leaflet-marker-icon-close';
		let iconNotification = this.getNotification(station) ? ' notification' : '';
		switch (station.type) {
			case 1:
				return L.icon({
					iconUrl: iconCollection[icon],
					iconSize: [20, 20],
					popupAnchor: [-2, -12],
					className: iconClass + ' entry-point' + iconNotification
				})
			default:
				return L.icon({
					iconUrl: iconCollection[icon],
					iconSize: [20, 20],
					popupAnchor: [-2, -12],
					className: iconClass + ' ' + iconNotification
				});
		}
	}

	getNotification(station) {
		let limiteConsigliato = station.impiantoDiRiduzione && station.impiantoDiRiduzione.filter((cabina) => {
			return cabina.limiteConsigliato;
		});
		return (station.notification && limiteConsigliato.length > 0 && station.state != 1);
	}

	getTooltipDirection(stations, stationItem) {
		let array= [];
		stations.map((item) => {
			let before = (Number(stationItem.coordinates.longitudine).toFixed(2) === Number(item.coordinates.longitudine).toFixed(2));
			let after = (Number(stationItem.coordinates.latitudine).toFixed(2) === Number(item.coordinates.latitudine).toFixed(2));
			if(before && after) {
				array.push(item.id);
			}
		})
		if(((array.length >= 1) && (array[0] !== stationItem.id )) || stationItem.type === 1) {
			return true;
		} else {
			return false;
		}
	}



	openPopup(item, isOpenPopup, markerType, e) {
        item.isOpenPopup = !isOpenPopup;
		const newState = markerType;
		newState[item.id - 1] = item;

		if(markerType === this.state.stations && !item.isOpenPopup) {
			let latitude = this.state.zoom <= 10.5 ? e.target.getLatLng().lat + 0.15 : 
							this.state.zoom <= 12 ? e.target.getLatLng().lat + 0.08 : 
							this.state.zoom <= 13 ? e.target.getLatLng().lat + 0.028 : 
							this.state.zoom <= 14 ? e.target.getLatLng().lat + 0.024 : 
							e.target.getLatLng().lat + 0.001;
			let longitude = e.target.getLatLng().lng;
			this.map.current.leafletElement.panTo({lat: latitude, lng: longitude });
		}

        this.setState({markerType: newState})
		if(!isOpenPopup) {
            this.setState({
				isOpenPopup: true,
			})
		} else {
			this.setState({
                isOpenPopup: false
            })
		}
	}

	handlePopup(e, item, isOpenPopup, markerType) {
		if(!isOpenPopup) {
			this.openPopup(item, isOpenPopup, markerType, e);
		}
	}

	getIconPipeline(isOpenPopup, areaImpiantistica, portata, descMetanodotto) {
		let iconClass = isOpenPopup ? 'leaflet-pipeline-icon-plus' : 'leaflet-pipeline-icon-close';
		let icon = '';

		if(areaImpiantistica === 'BOLANO' && Number(portata) > 0 ) {
			//console.log('BOLANO')
            icon = isOpenPopup ? 'pipelineDown' : 'pipelineDownWhite';
        } 
        if(areaImpiantistica === 'BOLANO' && Number(portata) <! 0 ) {
			//console.log('BOLANO2')
            icon = isOpenPopup ? 'pipelineTop' : 'pipelineTopWhite';
        }

        if(areaImpiantistica === 'MORTAIOLO' && Number(portata) > 0 ) {
			//console.log('MORTAIOLO')
            icon = isOpenPopup ? 'pipelineLeft' : 'pipelineLeftWhite';
        } 
        if(areaImpiantistica === 'MORTAIOLO' && Number(portata) <! 0 ) {
			//console.log('MORTAIOLO2')
            icon = isOpenPopup ? 'pipelineRight' : 'pipelineRightWhite';
        }

        if(areaImpiantistica === 'CAMPIGLIA' && Number(portata) > 0 ) {
			//console.log('CAMPIGLIA')
            icon = isOpenPopup ? 'pipelineDown' : 'pipelineDownWhite';
        } 
        if(areaImpiantistica === 'CAMPIGLIA' && Number(portata) <! 0 ) {
			//console.log('CAMPIGLIA2')
            icon = isOpenPopup ? 'pipelineTop' : 'pipelineTopWhite';
        }

        if(areaImpiantistica === 'ABBADIA' && Number(portata) > 0 ) {
			//console.log('ABBADIA')
            icon = isOpenPopup ? 'pipelineTop' : 'pipelineTopWhite';
        } 
        if(areaImpiantistica === 'ABBADIA' && Number(portata) <! 0 ) {
			//console.log('ABBADIA2')
            icon = isOpenPopup ? 'pipelineDown' : 'pipelineDownWhite';
        }

        if(areaImpiantistica === 'EMPOLI SUD' && Number(portata) > 0 ) {
			//console.log('EMPOLI SUD')
            icon = isOpenPopup ? 'pipelineDown' : 'pipelineDownWhite';
        } 
        if(areaImpiantistica === 'EMPOLI SUD' && Number(portata) <! 0 ) {
			//console.log('EMPOLI SUD2')
            icon = isOpenPopup ? 'pipelineTop' : 'pipelineTopWhite';
        }

        if(areaImpiantistica === 'SINALUNGA' && Number(portata) > 0 ) {
			//console.log('SINALUNGA')
            icon = isOpenPopup ? 'pipelineLeft' : 'pipelineLeftWhite';
        } 
        if(areaImpiantistica === 'SINALUNGA' && Number(portata) <! 0 ) {
			//console.log('SINALUNGA2')
            icon = isOpenPopup ? 'pipelineRight' : 'pipelineRightWhite';
        }

        if(areaImpiantistica === 'RANIERI III' && Number(portata) > 0 ) {
			//console.log('RANIERI III')
            icon = isOpenPopup ? 'pipelineRight' : 'pipelineRightWhite';
        } 
        if(areaImpiantistica === 'RANIERI III' && Number(portata) <! 0 ) {
			//console.log('RANIERI III2')
            icon = isOpenPopup ? 'pipelineLeft' : 'pipelineLeftWhite';
        }

        if(areaImpiantistica === 'LASTRA A SIGNA' && Number(portata) > 0 && descMetanodotto === 'Montelupo - Palaia') {
			//console.log('LASTRA A SIGNA')
            icon = isOpenPopup ? 'pipelineRight' : 'pipelineRightWhite';
        } 
        if(areaImpiantistica === 'LASTRA A SIGNA' && Number(portata) <! 0 && descMetanodotto === 'Montelupo - Palaia') {
			//console.log('LASTRA A SIGNA2')
            icon = isOpenPopup ? 'pipelineLeft' : 'pipelineLeftWhite';
        }

        if(areaImpiantistica === 'LASTRA A SIGNA' && Number(portata) > 0 && descMetanodotto === 'Montelupo - Agliana') {
			//console.log('LASTRA A SIGNA333')
            icon = isOpenPopup ? 'pipelineDown' : 'pipelineDownWhite';
        } 
        if(areaImpiantistica === 'LASTRA A SIGNA' && Number(portata) <! 0 && descMetanodotto === 'Montelupo - Agliana') {
			//console.log('LASTRA A SIGNA3334')
            icon = isOpenPopup ? 'pipelineTop' : 'pipelineTopWhite';
        }

        if(areaImpiantistica === 'SUESE OLT' && Number(portata) > 0) {
			//console.log('SUESE OLT')
            icon = isOpenPopup ? 'pipelineRight' : 'pipelineRightWhite';
        } 
        if(areaImpiantistica === 'SUESE OLT' && Number(portata) <! 0) {
			//console.log('SUESE OLT2')
            icon = isOpenPopup ? 'pipelineLeft' : 'pipelineLeftWhite';
        }

		return L.icon({
			iconUrl: iconCollection[icon],
			iconSize: [15, 15],
			tooltipAnchor: [5, 0],
			className: iconClass
		});
	}

	getIconCenter(isOpenPopup) {
		let icon = isOpenPopup ? 'iconCenterWhite' : 'iconCenterGreen';
		return L.icon({
			iconUrl: iconCollection[icon],
			iconSize: [30, 30],
			tooltipAnchor: [-5, -5]
		});
	}

	handleTooltip(item, tooltip) {
		item.tooltip = !tooltip;
		const newState = this.state.stations;
		newState[item.id - 1] = item;
		if(!tooltip) {
            this.setState({
				tooltip: true,
			})
		} else {
			this.setState({
                tooltip: false
            })
		}
	}

	formatDate(value) {
        let number = value.replaceAll(".", "");
        let operationSign = number > 0  ? '+ ' : number < 0 ? '- ' : '';
        return operationSign + value.replace(/-(?=\d)/,"");
    }

	shouldComponentUpdate(nextProps, nextState){
		this.state.filterMapLayers = nextProps.filterState ? nextProps.filterMap : '0,1,2,3,4';

		this.state.pipelines = nextProps.stationsMap && nextProps.stationsMap.length > 0 ? nextProps.stationsMap : [];

		this.state.stations = nextProps.updatedStations && nextProps.updatedStations.length > 0  ? nextProps.updatedStations : nextState.stations;

		return nextProps.filterMap !== nextState.filterMap || nextProps.stationsMap !== nextState.stationsMap || nextProps.stations !== nextState.stations;
	}

	render() {
		const corner1 = L.latLng(55, 5);
		const corner2 = L.latLng(33, 20.581382);
		const bounds = L.latLngBounds(corner1, corner2);
		return (
            <Map 
                id="map"
				ref={this.map}
				center={this.props.position}
				maxBounds={ bounds }
				zoom={this.state.zoom}
				minZoom={8}
				zoomSnap={0}
				zoomControl={false}
				keepBuffer={50}
				updateWhenIdle={true}
				loadTilesWhileAnimating={true}
				loadTilesWhileInteracting={true}
				updateWhenZooming={false}
				onZoomEnd={() => {this.setState({zoom: this.map.current.leafletElement.getZoom()})}}
            >
				<TileLayer
					url="https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png"

				/>
					<WMSTileLayer
						format="image/png"
						transparent="true"
						tiled="true"
						layers={this.state.filterMapLayers}
						url="https://gisware.snam.it/arcgis/services/CartesioWeb/Intelligent_Disp/MapServer/WMSServer"
					/>
				<ZoomControl position="bottomright" />
				
				{
					this.state.stations.map((station, index) => {
						return (
							<FeatureGroup key={station.id}>
								{
									station.type === 1 ? <Marker position={[Number(station.coordinates.latitudine), Number(station.coordinates.longitudine)]} 
									icon={L.divIcon({
										html: "<div></div>",
										iconSize: [25, 25],
										className: "leaflet-icon-pulse" + (station.notification ? ' notification' : '')
									})}/> : ''
								}								
								<Marker 
									index={index}
									position={[Number(station.coordinates.latitudine), Number(station.coordinates.longitudine)]} 
									icon={this.getIconStation(station, station.isOpenPopup)}
									onClick={ (e) => this.openPopup(station, station.isOpenPopup,this.state.stations, e)}
									onPopupClose={(e) => this.handlePopup(e, station, station.isOpenPopup,this.state.stations)}
									onMouseOver={() => {this.handleTooltip(station, false)}}
									onMouseOut={() => {this.handleTooltip(station, true)}}
								/>
								<Tooltip
									permanent={true} 
									direction={this.getTooltipDirection(this.state.stations, station) ? 'left' : 'right' }
									className={'leaflet-marker-label ' + 
												(this.getTooltipDirection(this.state.stations, station) ? 'entry-point ' : '') +
												(station.state == 0 ? 'leaflet-marker-green' : station.state == 1 ?'leaflet-marker-red' : 'leaflet-marker-grey')}>
									<div className={
										this.state.zoom <= 11 ? (!station.tooltip ? 'display' : '') : ''}>
											{ station.name.toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase()).replace(/(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$|^\d/g, x => x.toUpperCase()) } 
									</div>
								</Tooltip>
								<Popup
									maxWidth={500}
									className={"custom"}
									closeOnClick={null}
									id={station.id}
									autoPan={false}
									keepInView={true}
								>
									<Carousel station={station} props={this.props} />
								</Popup>
							</FeatureGroup>
						);
					})
				}

				{
					this.state.centers.map((center, index) => {
						return (
							<FeatureGroup key={center.id}>
								<Marker
									index={index}
									position={[Number(center.coordinates.latitudine), Number(center.coordinates.longitudine)]} 
									icon={this.getIconCenter(center.isOpenPopup)}
									onMouseOver={ (e) => this.openPopup(center, center.isOpenPopup, this.state.centers, e)}
									onMouseOut={ (e) => this.openPopup(center, center.isOpenPopup, this.state.centers, e)}/> 
								<Tooltip
									className={'leaflet-popup-center'}
									direction={'left'}
								>
									<div className='map_popup'>
										<div className='popup-item-wrapper'>Centro di</div>
										<div className='popup-item-wrapper'>{center.name.toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase())}</div>
									</div>
								</Tooltip>
							</FeatureGroup>
						);
					})
				}

				{
					this.state.pipelines.map((pipeline, index) => {
						return (
							<FeatureGroup key={index}>
								<Marker
									index={index}
									position={[pipeline.coordinates.latitudine, pipeline.coordinates.longitudine]} 
									icon={this.getIconPipeline(pipeline.isOpenPopup, pipeline.areaImpiantistica, pipeline.portata, pipeline.descMetanodotto)}
									onMouseOver={ (e) => this.openPopup(pipeline, pipeline.isOpenPopup, this.state.pipelines, e)}
									onMouseOut={ (e) => this.openPopup(pipeline, pipeline.isOpenPopup, this.state.pipelines, e)}
									/> 
								<Tooltip
									className={"leaflet-popup-pipeline"}
									direction={'left'}								
								>
									<div className='map_popup'>
										<div className='header'>
											<div className='popup-title'>{pipeline.descMetanodotto}</div>
										</div>
										<div className='popup-body'>
											{pipeline.pressione && <div className='popup-item-wrapper'>
												<div className='popup-item'>Pressione:</div>
												<div className='popup-item'>{pipeline.pressione} bar</div>
											</div>}
											<div className='popup-item-wrapper'>
												<div className='popup-item'>Portata:</div>
												<div className='popup-item'> {this.formatDate(pipeline.portata)} Sm3/h</div>
											</div>
										</div>
										</div>
								</Tooltip>
							</FeatureGroup>
						);
					})
				} 

				{/* {
					coordinates.forEach((c, index) => {
						return (
							<Marker 
								position={c} 
								icon={this.getLabelIcon(index)}
							/>
						);
					})
				} */}
			</Map>
			);
	}
}

export default MapUI;
