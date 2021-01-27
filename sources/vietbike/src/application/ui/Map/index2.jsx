import React from "react";
import L from "leaflet";
import { Map, TileLayer, Circle, FeatureGroup, Popup } from "react-leaflet";

import iconCollection from "../base/Icon/svg";
import Carousel from "../Carousel";
import myJSON from "./custom.geo.js";
import ReactDOMServer from "react-dom/server";
import {
	getIconTcsByState,
	getIconStatetionsSpinta,
	getIconStatetionsStoccaggio
} from "../Utils";

/**
 * Class to implement the UI of the map using Leaflet
 */
class MapUI extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			zoom: 9,
			markers: [],
			isOpenPopup: false
		}
	}

  /**
   * Function that given a type of station and its state return the correct
   * icon to put in the mark on the map
   * @param {*} type type of station (Stoccaggio or Spinta)
   * @param {*} state state of station, 3 possible states in the map
   * ( run, not run, ready to run)
   */
// 	getIconStation(station) {
// 		switch (station.type) {
// 			case 0:
// 				return L.divIcon({
// 					html: "<img src='" + iconCollection['iconPlus'] + "' class='entry-point-icon'>",
// 					iconSize: [30, 30],
// 					popupAnchor: [0, -15],
// 					className: 'leaflet-marker-icon-plus entry-point' + (station.notification ? ' notification' : '')
// 				});
// 			default:
// 				return L.icon({
// 					iconUrl: iconCollection['iconPlus'],
// 					iconSize: [30, 30],
// 					popupAnchor: [0, -15],
// 					className: 'leaflet-marker-icon-plus ' + (station.notification ? ' notification' : '')
// 				});
// 		}
// 	}

// 	getIconClose(station) {
// 		switch (station.type) {
// 			case 0:
// 				return L.divIcon({
// 					html: "<img src='" + iconCollection['closeX'] + "'>",
// 					iconSize: [30, 30],
// 					popupAnchor: [0, -15],
// 					className: 'leaflet-marker-icon-close entry-point'
// 				});
// 			default:
// 				return L.icon({
// 					iconUrl: iconCollection['closeX'],
// 					iconSize: [30, 30],
// 					popupAnchor: [0, -15],
// 					className: 'leaflet-marker-icon-close '
// 				});
// 		}
// 	}


// 	createMarkers() {
// 		let markers = this.state.markers;
// 		let isOpenPopup = this.state.isOpenPopup;
// 		// specify popup options
// 		const customOptions = {
// 			maxWidth: "500",
// 			className: "custom",
// 			autoClose: false, 
// 			closeOnClick: null
// 		};
// 		this.props.stations.forEach(station => {
// 			// Create icon
// 			const customIcon = this.getIconStation(station);
// 			const customIconClose = this.getIconClose(station);
// 			const customPopup = this.buildCustomPopup(station);
// 			const customLabel = {
// 				permanent: true, 
// 				direction: 'right',
// 				className: 'leaflet-marker-label ' + (station.state === 0 ? 'leaflet-marker-green' : station.state === 1 ?'leaflet-marker-red' : 'leaflet-marker-grey')
// 			};
// 			// create marker object, pass custom icon as option, pass content and options to popup, add to map
// 			const marker = L.marker(station.coordinates, {
// 				icon: customIcon,
// 				alt: station.id
// 			})
// 			//.bindPopup(ReactDOMServer.renderToString(<Carousel station={station} />), customOptions)
// 			.bindPopup(customPopup, customOptions)
// 			.addTo(this.map);
// 			marker._icon.setAttribute("stationid", station.id);
// 			markers.push({
// 				id: station.id,	
// 				marker: marker
// 			});
// 			marker.bindTooltip(station.name, customLabel);
// 			marker.on('click', function (e) {
// 				if(!isOpenPopup) {
// 					isOpenPopup = true;
// 				} else {
// 					isOpenPopup = false;
// 				}
// 				if(e.originalEvent.target.classList.contains('leaflet-marker-icon-plus') || e.originalEvent.target.classList.contains('entry-point-icon')) {
// 					e.target.setIcon(customIconClose);
// 				} else {
// 					e.target.setIcon(customIcon);
// 				}
// 			});

// 		});		
// 	}

//   /**
//    * in the stations list find the station with the passed id and
//    * return it
//    * @param {*} id id of the station we want get information
//    * @param {*} array array that contain all stations
//    */
// 	getStationFromId(id, array) {
// 		return array.find(el => id === el.id);
// 	}

//   /**
//    * in the markers list return the marker with the same id passed
//    * @param {*} id id of the marker we want get the reference
//    */
// 	getMarkerFromId(id) {
// 		return this.state.markers[this.state.markers.findIndex(el => id === el.id)].marker;
// 	}

//   /**
//    * Return true if the data of stations change or if they arrive
//    * for the first time, with this function we know where and if we must
//    * change markers in the map
//    * @param {*} id
//    * @param {*} prevProps
//    */
// 	stateTCSIsChange(id, prevProps) {
// 		let oldTcs = this.getStationFromId(id, prevProps.stations).data;
// 		let newTcs = this.getStationFromId(id, this.props.stations).data;
// 		if (!oldTcs && newTcs) return true; // prevProps not have data but props yes
// 		if (!newTcs) return false; // prop don't have data
// 		// If we arrive here we need to update Popup data
// 		oldTcs = oldTcs.tcs;
// 		newTcs = newTcs.tcs;
// 		let tcsAreChange = false;
// 		oldTcs.forEach((old, index) => {
// 			if (newTcs[index]) {
// 				if (old.state !== newTcs[index].state || old.rpm !== newTcs[index].rpm)
// 					tcsAreChange = true;
// 			}
// 		});
// 		return tcsAreChange;
// 	}

//   /**
// 	 * Function to build the HTML of a popup based of the information
// 	 * of station
// 	 * @param {*} station information about a station
// 	*/
// 	buildCustomPopup(station) {
// 		this.stationRouting = station;
// 		let stationPopup = `<div class='map_popup'>
// 		<div class='header'>
// 			<div class='popup-title' id='${station.id}'>${station.name}</div>
// 		</div>
// 		<div class='popup-body'>
// 			<div class='popup-item-wrapper'>
// 				<div class='popup-item'>Pressione</div>
// 				<div class='popup-item'>+ ${station.pressione} bar</div>
// 			</div>
// 			<div class='popup-item-wrapper'>
// 				<div class='popup-item'>Portata</div>
// 				<div class='popup-item'>${station.portata} Sm3/h</div>
// 			</div>
// 		</div>
// 	</div>`;
// 		let cabinPopup = ReactDOMServer.renderToString(<Carousel station={station} />);
// 		let customPopup = stationPopup + cabinPopup;
// 		return customPopup;
// 	}

//   /**
//    * Function to update the markers in the map and the informations
//    * in the popup
//    * @param {*} prevProps old state of the component
//    */
// 	updateMarkersInfo(prevProps) {
// 		this.props.stations.forEach(station => {
// 			if (this.stateTCSIsChange(station.id, prevProps)) {
// 				this.getMarkerFromId(station.id)._popup.setContent(
// 					this.buildCustomPopup(station)
// 				);
// 				this.getMarkerFromId(station.id)._icon.src = this.getIconStation(
// 					station.type,
// 					station.state
// 				);
// 			}
// 		});
// 	}

//   /**
//    * Function to set the zoom in the map based on the dimension of window
//    */
// 	manageResize() {
// 		let zoom = this.state.zoom;
// 		if (this.mapContainer) {
// 			let diff = this.mapContainer.offsetHeight - 850;
// 			let diff2 = 850 - this.mapContainer.offsetHeight;
// 			zoom = this.mapContainer.offsetHeight > 850 ? ((diff / 55) * 0.1) + 6.2 : 6.2 - ((diff2 / 55) * 0.1); 
// 		}
// 		this.setState({ zoom });
// 		this.map.setZoom(zoom);
// 	}


//   /**
//    * Function to add the statics label in the map
//    */
// 	addLabels() {
// 		const coordinates = [
// 			[46.532546, 13.647284],
// 			[45.960086, 13.635887],
// 			[45.1621, 12.62649],
// 			[37.067974, 14.424356],
// 			[37.755266, 12.572576],
// 			[43.490479, 10.325589],
// 			[44.075733, 9.830547],
// 			[46.45147, 8.765842]
// 		];
// 		const labels = [
// 			"tarvisio",
// 			"gorizia",
// 			"cavarzere",
// 			"gela",
// 			"mazaraDelVallo",
// 			"livorno",
// 			"panigaglia",
// 			"passoGries"
// 		];
// 		const anchors = [
// 			[0, 5],
// 			[0, 5],
// 			[0, 5],
// 			[44, 0],
// 			[124, 5],
// 			[82, 0],
// 			[82, 0],
// 			[110, 5]
// 		];
// 		// Create icon
// 		coordinates.forEach((c, index) => {
// 			const customIcon = L.icon({
// 				iconUrl: iconCollection[labels[index]], // TODO change when we will have label
// 				iconAnchor: anchors[index]
// 			});
// 			L.marker(c, {
// 				icon: customIcon
// 			}).addTo(this.map);
// 		});
// 	}

//   /**
//    * Function that build for the first time the map in the website
//    */
	componentDidMount() {
		const corner1 = L.latLng(55, 5);
		const corner2 = L.latLng(33, 20.581382);
		const bounds = L.latLngBounds(corner1, corner2);
		const myStyle = {
			color: "#EFE4E3",
			weight: 0,
			opacity: 0,
			fillOpacity: 0.5
		};
		console.log(this.state.zoom, this.props.position)
// 		this.map = L.map("map", {
// 			center: this.props.position,
// 			zoom: this.state.zoom,
// 			minZoom: 8,
// 			maxBounds: bounds,
// 			zoomSnap: 0,
// 			layers: [
// 				L.tileLayer(
// 					// "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
// 					"https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png"
// 					// "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
// 				),
// 				// L.tileLayer.wms('https://gisware-gc.snam.it/arcgis/services/CartesioWeb/RETE_NAZIONALE/MapServer/WMSServer', {
// 				// 	L.tileLayer.wms('https://gisware.snam.it/arcgis/services/CartesioWeb/RETE_NAZIONALE/MapServer/WMSServer', {
// 				// 	layers: '2',
// 				// 	tiled: true,
// 				// 	format: 'image/png',
// 				// 	transparent: true
// 				// })
// 			]
		// });

// 		//Position control zoom
// 		this.map.zoomControl.setPosition("bottomleft");
// 		// L.geoJSON(myJSON, { style: myStyle }).addTo(this.map);
// 		// add marker
// 		this.addLabels();
// 		this.manageResize();
	}

//   /**
//    * Function that hide of show the marker in the map depend on the value
//    * of visibility array passed from the app
//    */
// 	checkVisibility() {
// 		this.props.stations.forEach((s, index) => {
// 			const visible = this.props.visibilityStations[index];
// 			const marker = this.getMarkerFromId(s.id);
// 			if (visible) marker._icon.classList.remove("is-hidden");
// 			else marker._icon.classList.add("is-hidden");
// 		});
// 	}

//   /**
//    * Function that update the informations in popup and the visibility
//    * of the marker in the map when change the data passed from app
//    * @param {*} prevProps old state of the application
//    */
// 	componentDidUpdate(prevProps) {
// 		if (this.state.markers.length > 0) {
// 			this.updateMarkersInfo(prevProps);
// 			this.checkVisibility();
// 		} else {
// 			this.createMarkers();
// 		}
// 	}


	render() {
		const lightRailStop = {
			type: "FeatureCollection",
			features: [
			  {
				type: "Feature",
				properties: {
				  name: "18th & California Light Rail Stop",
				  otherProp: "Other Property 1"
				},
				geometry: {
				  type: "Point",
				  coordinates: [43.820718, 10.506696]
				}
			  },
			  {
				type: "Feature",
				properties: {
				  name: "20th & Welton Light Rail Stop",
				  otherProp: "Other Property 2"
				},
				geometry: {
				  type: "Point",
				  coordinates: [43.9, 11.506696]
				}
			  }
			]
		  };
		return (
			//  <div id="map" ref={c => (this.mapContainer = c)}>
			<Map 
				center={this.props.position}
				maxBounds={ this.bounds }
				zoom={this.state.zoom}
				minZoom={8}
				zoomSnap={0}>
				<TileLayer
					url="https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png"
				/>
				{lightRailStop.features.map((feature, index) => {
					return (
						<FeatureGroup color="purple" key={index}>
						<Popup>
							<p>{feature.properties.name}</p>
							<button
								id="button"
								className="btn btn-primary"
								onClick={() => {
									toggle(true);
									setSelectedFeature(feature);
								  }}>
								More Info
							</button>
						</Popup>
						<Circle
							center={[
							feature.geometry.coordinates[1],
							feature.geometry.coordinates[0]
							]}
							fillColor="#ff7800"
							radius={200}
							color={"#000"}
							weight={1}
							opacity={1}
							fillOpacity={0.8}
						/>
						</FeatureGroup>
					);
				})}
			</Map>
			// </div>
			);
	}
}

export default MapUI;
