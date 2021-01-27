import React from "react";
import * as d3 from "d3";

import {
	cleanSvg,
	drawImageInChart,
	isEqualToObject,
	UtilsChart,
	Colors,
	drawBlueLabels,
	scrollAndHighlightData
} from "../../Utils";
import { Station } from "./style";
import theme from '../../Theme';
import iconCollection from "../../base/Icon/svg";

class StationUI extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			containerG: null,
			variableValuesTC: null,
			variableValues: null
		};
	}

	componentDidMount() {
		if (this.stationOverview) {
			this.drawStation(this.stationOverview);
			window.addEventListener("resize", this.referenceManageZoom);
		}
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.referenceManageZoom);
	}

	componentDidUpdate(prevProps) {
		if (this.props.idStation !== prevProps.idStation) {
			this.drawStation(this.stationOverview);
		} else {
			this.updateData(prevProps);
		}
	}

	/**
 * Update data in chart
 */
	updateData(prevProps) {
		let { variableValues, variableValuesTC } = this.state;
		let { isThresholds } = this.props;
		if (JSON.stringify(prevProps.dataGlobal) !== JSON.stringify(this.props.dataGlobal) && variableValuesTC) {
			this.props.dataGlobal.tcs.forEach((tc, index) => {
				if(tc.state !== prevProps.dataGlobal.tcs[index].state) {
					this.getStateTcs(this.state.containerG, tc.state, index);
				}
			});
		}
		if ((JSON.stringify(prevProps.globalLabels) !== JSON.stringify(this.props.globalLabels)) && variableValues) {
			variableValues = this.updateGlobalStation();
			this.setState({ variableValues });
		}
		if ((JSON.stringify(prevProps.configureDraw) !== JSON.stringify(this.props.configureDraw)) && variableValuesTC) {
			variableValuesTC = this.updateTcs();
			this.setState({ variableValuesTC });
		}

		if (prevProps.isThresholds !== isThresholds) {
			if (this.stationOverview) {
				const labels = document.querySelectorAll('[data-reference-label]');
				if (isThresholds) {
					labels.forEach(label => label.setAttribute('open-modal', true));
				} else {
					labels.forEach(label => label.removeAttribute('open-modal'));
				}
			}
		}
	}

	/**
	 * Update global data in station
	 */
	updateGlobalStation = () => {
		let variableValues = { ...this.state.variableValues };
		if (variableValues) {
			Object.keys(variableValues).forEach(k => {
				variableValues[k].attr('class', '');
				const index = this.props.globalLabels.values.findIndex(el => el.property === k);
				if (index >= 0) {
					variableValues[k].text(this.props.globalLabels.values[index].value);
					variableValues[k].attr('class', this.props.globalLabels.values[index].class);
					variableValues[k].on("mousemove", () => {
						let htmlPopover = `<p>${this.props.globalLabels.values[index].hoverText}</p>`;
						let popover = document.querySelector(`.tooltip-chart`);
						popover.innerHTML = htmlPopover;
						popover.style.left = `${d3.event.pageX}px`;
						popover.style.top = `${d3.event.pageY - 10}px`;
						popover.style.opacity = '1';
					});
				}
			});
		}
		return variableValues;
	}

	/**
	 * Update data to TC
	 */
	updateTcs = () => {
		let newVariableValuesTC = [...this.state.variableValuesTC];
		newVariableValuesTC.forEach((variable, index) => {
			let values = { ...variable.values };
			let images = { ...variable.images };
			let labels = { ...variable.labels };
			if (values) {
				Object.keys(values).forEach(k => {
					values[k].attr('class', '');
					const findIndex = this.props.configureDraw[index].values.findIndex(el => el.property === k);
					if (findIndex >= 0) {
						values[k].text(this.props.configureDraw[index].values[findIndex].value);
						values[k].attr('class', this.props.configureDraw[index].values[findIndex].class);
						values[k].on("mousemove", () => {
							let htmlPopover = `<p>${this.props.configureDraw[index].values[findIndex].hoverText}</p>`;
							let popover = document.querySelector(`.tooltip-chart`);
							popover.innerHTML = htmlPopover;
							popover.style.left = `${d3.event.pageX}px`;
							popover.style.top = `${d3.event.pageY - 10}px`;
							popover.style.opacity = '1';
						});
					}
				});
			}
			if (images) {
				Object.keys(images).forEach(k => {
					const findImageIndex = this.props.configureDraw[index].images.findIndex(el => el.property === k);
					if (findImageIndex >= 0) {
						const urlImage = iconCollection[this.props.configureDraw[index].images[findImageIndex].url];
						images[k].attr('xlink:href', urlImage);
					}
				});
			}
			if (labels) {
				Object.keys(labels).forEach(k => {
					const findIndex = this.props.configureDraw[index].values.findIndex(el => el.property === k);
					if (findIndex >= 0) {
						values[k].text(this.props.configureDraw[index].labels[findIndex].value);
					}
				})
			}
			variable = { ...labels, ...values, ...images };
		});
		return newVariableValuesTC;
	}

	/**
	 * Management Zoom station in resize event
	 */
	referenceManageZoom = () => {
		this.drawStation(this.stationOverview);
	};

	/**
	 * Draw Station
	 */
	drawStation = (stationOverview) => {
		const { configureDimesionDraw, changeIsLoading, dataGlobal, globalLabels, configureDraw, goToDetails, isThresholds, changeOpenModal } = this.props;
		//Draw chart
		cleanSvg(stationOverview);
		d3.select('#station-overview')
			.append("div")
			.attr("class", "tooltip-chart")
			.style("opacity", 0);

		const { containerWidth, containerHeight } = UtilsChart.getStationSvgDimensions({
			offsetWidth: stationOverview.offsetWidth,
			offsetHeight: stationOverview.offsetHeight,
			minHeight: configureDimesionDraw.heightScheme * configureDimesionDraw.minScale,
			baseWidth: (282 * dataGlobal.tcs.length),
			heightScheme: configureDimesionDraw.heightScheme,
			minScale: configureDimesionDraw.minScale,
		});

		const svg = d3
			.select(`#station-overview`)
			.append(`svg`)
			.attr(`width`, `${containerWidth}px`)
			.attr(`height`, `${containerHeight}px`);
		const g = UtilsChart.drawG({ svg });
		this.buildExternalCircuit(g, dataGlobal.tcs.length * 242);


		//Draw label, value and images
		let variableValuesTC = [];
		if (configureDraw) {
			configureDraw.forEach((el, index) => {
				const gTc = UtilsChart.drawG({ svg: g, id: `TC-${index}` });
				const images = drawImageInChart(gTc, el.images);
				if (dataGlobal.tcs[index] && dataGlobal.tcs[index].state) { this.getStateTcs(g, dataGlobal.tcs[index].state, index);}
				if (goToDetails) { this.addClickTC(gTc, index) }
				const labels = drawBlueLabels(gTc, el.labels);
				const values = drawBlueLabels(gTc, el.values);
				variableValuesTC.push({ values, labels, images });
			});
		}
		let variableValues = [];
		if (globalLabels) {
			variableValues = drawBlueLabels(g, globalLabels.values);
		}
		this.setState({ variableValuesTC, variableValues, containerG: g }, () =>  setTimeout(() => changeIsLoading(false), 90));

		//Management zoom chart
		this.manageZoom(stationOverview, g);

		if (stationOverview) {
			const labels = document.querySelectorAll('[data-reference-label]');
			if (isThresholds) {
				labels.forEach(label => label.setAttribute('open-modal', true));
			} else {
				labels.forEach(label => label.removeAttribute('open-modal'));
			}
		}
		//Scroll metaData
		scrollAndHighlightData(changeOpenModal);
	}

	/**
   * Build the tubes that connect all component in the graphics
   * @param {*} svgContainer svg component that include the graphics of connector
   * @param {*} offset x param to put the connector T in the right position
   */
	buildExternalCircuit = (svgContainer, offset) => {
		const gContainerExternalCircuit = UtilsChart.drawG({ svg: svgContainer });
		gContainerExternalCircuit.attr('transform', 'translate(113, 0)')
		UtilsChart.createBicolorFill({
			svg: gContainerExternalCircuit,
			id: 'tubegradient',
			c1: Colors.scarpaFlow,
			c2: Colors.spunPearl,
			c3: Colors.whiteLilac,
			c4: Colors.zircon,
			c5: Colors.monsoon,
			p2: '13.66%',
			p3: '42.07%',
			p4: '51.52%',
			x1: '50.034%',
			x2: '50.034%',
			y1: '99.725%',
			y2: '-.004%'
		});
		UtilsChart.drawImage({
			svg: gContainerExternalCircuit,
			url: iconCollection['connectorTop'],
			w: 23,
			h: 23
		});
		UtilsChart.drawRect({
			svg: gContainerExternalCircuit,
			x: 23,
			y: 0,
			w: offset - 129,
			h: 16,
			fill: `url(#tubegradient)`,
		});
		UtilsChart.drawImage({
			svg: gContainerExternalCircuit,
			url: iconCollection['outTube'],
			w: 20,
			h: 16,
			x: offset - 107,
			y: 0
		});
		UtilsChart.drawRect({
			svg: gContainerExternalCircuit,
			x: -113,
			y: 453,
			w: offset - 129,
			h: 16,
			fill: `url(#tubegradient)`,
		});
		UtilsChart.drawImage({
			svg: gContainerExternalCircuit,
			url: iconCollection['connectorBottom'],
			w: 23,
			h: 23,
			x: offset - 248,
			y: 446
		});
		UtilsChart.drawImage({
			svg: gContainerExternalCircuit,
			url: iconCollection['inTube'],
			w: 20,
			h: 16,
			x: -132,
			y: 453
		});
	}

	/**
   * Function that manage the zoom of the graphics based on the height of the browser window
   * @param {*} stationOverview 
	 * @param {*} containerDraw 
   */
	manageZoom = (stationOverview, containerDraw) => {
		const { configureDimesionDraw, dataGlobal } = this.props;
		const containerHeight = stationOverview ? stationOverview.scrollHeight : 0;
		const minHeight = configureDimesionDraw.heightScheme * configureDimesionDraw.minScale;
		const scale =
			((containerHeight / minHeight > configureDimesionDraw.minScale) && (window.outerWidth > theme().constants.BREAKPOINT_MOBILE))
				? (containerHeight / configureDimesionDraw.heightScheme)
				: configureDimesionDraw.minScale;
		const containerWidth = stationOverview ? stationOverview.scrollWidth : 0;
		const svgWidth = (242 * dataGlobal.tcs.length) * scale;
		const svgHeight = containerHeight - (485 * scale);
		const difference = ((containerWidth - svgWidth) > 0) ? (containerWidth - svgWidth) : 0;
		containerDraw.attr(`transform`, `translate(${difference / 2}, ${svgHeight / 2}) scale(${scale})`);
	}

	/**
 * Function return dstate to tcs
 * @param {*} state tcs
 * @param {*} index index tcs on station
 */
	getStateTcs = (containerTcsG, state, index) => {
		if (containerTcsG.select(`#stateImage${index}`)) {
			containerTcsG.select(`#stateImage${index}`).remove();
		}
		const svgLoader = containerTcsG
			.select(`#TC-${index}`)
			.append('g')
			.attr('id', `stateImage${index}`)
			.attr(`transform`, `translate(${106 + index * 242},176)`);
		switch (state) {
			//fermo pronto a partire (rosso)
			case 1: {
				UtilsChart.drawCircle({
					svg: svgLoader,
					r: 11,
					fill: Colors.persianRed,
					cx: 13.5,
					cy: 13.5,
				});
				break;
			}
			//in arresto (rosso bucato)
			case 2: {
				UtilsChart.drawCircle({
					svg: svgLoader,
					r: 11,
					fill: 'none',
					cx: 13.5,
					cy: 13.5,
					bor_c: Colors.persianRed,
					bor_w: '2',
					c: 'loader-path red'
				});
				break;
			}
			//in avviamento (verde bucato)
			case 3: {
				UtilsChart.drawCircle({
					svg: svgLoader,
					r: 11,
					fill: 'none',
					cx: 13.5,
					cy: 13.5,
					bor_c: Colors.mediumSeaGreen,
					bor_w: '2',
					c: 'loader-path green'
				});
				break;
			}
			//in marcia (verde)
			case 4: {
				UtilsChart.drawCircle({
					svg: svgLoader,
					r: 11,
					fill: Colors.mediumSeaGreen,
					cx: 13.5,
					cy: 13.5,
				});
				break;
			}
			default: break;
		}
	}

	/**
	 * Add mask for click to TC
	 */
	addClickTC = (g, index) => {
		const linkMask = UtilsChart.drawRect({
			svg: g,
			x: 60 + index * 242,
			y: 140,
			w: 120,
			h: 180,
			c: 'redirectTCS',
			fill: 'transparent'
		});
		linkMask.on("click", () => this.props.goToDetails(this.props.dataGlobal.tcs[index].id));
	}

	render() {
		return (
			<Station className="container-graph" id="station-overview" ref={c => this.stationOverview = c} />
		);
	}
}

export default React.memo(StationUI, (prevProps, nextProps) => isEqualToObject(prevProps, nextProps));