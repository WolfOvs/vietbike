import React from "react";
import * as d3 from "d3";

import {
	UtilsChart,
	Colors,
	manageZoomByWidth,
	drawBlueLabels,
	scrollAndHighlightData,
	cleanSvg,
	drawImageInChart,
} from "../../Utils";
import iconCollection from "../../base/Icon/svg";

class SimpleChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			containerG: null,
			variableValues: null,
		}
	}

	componentDidMount() {
		const { configureDraw, dimesionDraw, changeIsLoading, isThresholds, changeOpenModal, livelOil, stateTC } = this.props;

		const chartContainer = document.querySelector(`#chart-id`);
		if (chartContainer) {
			cleanSvg(chartContainer);
			d3.select(`#chart-id`)
				.append("div")
				.attr("class", "tooltip-chart")
				.style("opacity", 0);
			const svg = d3
				.select(`#chart-id`)
				.append(`svg`)
				.attr(`width`, `${dimesionDraw.width}px`)
				.attr(`height`, `${dimesionDraw.height}px`);
			const g = UtilsChart.drawG({ svg });

			if (livelOil) {
				livelOil.forEach(element => {
					const gImage = UtilsChart.drawG({ svg: g });
					UtilsChart.drawImage({
						svg: gImage,
						url: iconCollection['bgOil'],
						w: 20,
						h: 80
					})
					UtilsChart.createBicolorFill({
						svg: gImage,
						id: 'tank-color',
						c1: Colors.bourbon,
						c2: Colors.jambalaya,
						p2: '100%',
						x1: '50%',
						x2: '50%',
						y1: '0%',
						y2: '100%'
					});
					let bar = UtilsChart.drawRect({
						svg: gImage,
						w: 20,
						h: (element.value * 80) / element.capacity,
						fill: `url(#tank-color)`,
						bor_r: 0,
						rot: 180,
						x: -20,
						y: -80
					});
					bar.node().setAttribute('id', `barOil-${element.tag}`);
					gImage.attr(
						`transform`,
						`translate(${element.position.x}, ${element.position.y})`
					);
				});
			}

			//Draw label, value and images
			let imagesChart = null;
			let images = null;
			let labels = null;
			let values = null;
			if (configureDraw) {
				imagesChart = drawImageInChart(g, configureDraw.imagesChart);
				if (configureDraw.images) images = drawImageInChart(g, configureDraw.images);
				if (configureDraw.labels) labels = drawBlueLabels(g, configureDraw.labels);
				values = drawBlueLabels(g, configureDraw.values);
				if (stateTC) {
					stateTC.forEach(tc => {
						this.addClickTC(images[`schemaTcCentrale${tc.id}`], tc.id)
						this.getStateTcs(g, images[`stateTC${tc.id}`], tc.state, tc.id)
					});
				}
			}

			//Management zoom chart
			manageZoomByWidth({
				graphics: g,
				svg: svg,
				baseW: dimesionDraw.width,
				baseH: dimesionDraw.height,
				container: chartContainer,
				minScale: dimesionDraw.minScale,
				maxScale: dimesionDraw.maxScale
			});
			window.addEventListener("resize", () => this.referenceManageZoom(g, svg, dimesionDraw, chartContainer));

			if (chartContainer) {
				const labels = document.querySelectorAll('[data-reference-label]');
				if (isThresholds) {
					labels.forEach(label => label.setAttribute('open-modal', true));
				} else {
					labels.forEach(label => label.removeAttribute('open-modal'));
				}
			}
			//Scroll metaData
			scrollAndHighlightData(changeOpenModal);

			//Change loading page
			this.setState({ variableValues: { values, labels, images, imagesChart }, containerG: g }, changeIsLoading(false));
		}
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.referenceManageZoom);
		const tooltip = document.querySelector('.tooltip-chart-cartesian');
		if (tooltip) tooltip.remove();
		this.setState({
			variableValues: null
		});
	}

	componentDidUpdate(prevProps) {
		const { configureDraw, livelOil, isThresholds, stateTC } = this.props;
		const { variableValues } = this.state;

		if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {

			let values = { ...variableValues.values };
			if (values && JSON.stringify(prevProps.configureDraw.values) !== JSON.stringify(configureDraw.values)) {
				Object.keys(values).forEach(k => {
					if (values[k].type === 'relatedLabel') {
						let valuesrelated = [];
						configureDraw.values.filter(el => el.type === 'relatedLabel').map(el => valuesrelated = [...valuesrelated, ...el.value]);
						values[k].value.attr('class', '');
						const findValue = valuesrelated.find(el => el.property === k);
						if (findValue) {
							values[k].value.text(findValue.value);
							values[k].value.attr('class', `svgLabel ${findValue.class}`);
							if (findValue.hoverText && findValue.hoverText !== undefined) {
								values[k].value.on("mousemove", () => {
									let htmlPopover = `<p>${findValue.hoverText}</p>`;
									let popover = document.querySelector(`.tooltip-chart`);
									popover.innerHTML = htmlPopover;
									popover.style.left = `${d3.event.pageX}px`;
									popover.style.top = `${d3.event.pageY - 10}px`;
									popover.style.opacity = '1';
								});
							}
						}
					} else {
						values[k].attr('class', '');
						const findValue = configureDraw.values.find(el => el.property === k);
						if (findValue) {
							values[k].text(findValue.value);
							values[k].attr('class', `svgLabel ${findValue.class}`);
						}
					}

					if (livelOil) {
						livelOil.forEach(oil => {
							if (oil && oil.tag === k) {
								const gLivelOil = document.querySelector(`g[data-reference-label='${oil.tag}']`);
								const elem = configureDraw.values.find(el => el.property === k);
								gLivelOil.setAttribute('transform', `translate(${elem.x}, ${elem.y})`);
							}
						});
					}

				});
			}

			let images = { ...variableValues.images };
			if (images && JSON.stringify(prevProps.configureDraw.images) !== JSON.stringify(configureDraw.images)) {
				Object.keys(images).forEach(k => {
					const elem = configureDraw.images.find(el => el.property === k);
					if (elem) {
						const urlImage = iconCollection[elem.url];
						images[k].attr('xlink:href', urlImage);
					}
					if (livelOil) {
						livelOil.forEach(oil => {
							if (oil && oil.tag === k) {
								images[k].attr('transform', `rotate(0)translate(${elem.x}, ${elem.y})`);
							}
						});
					}
				});
			}

			if (stateTC && JSON.stringify(stateTC) !== JSON.stringify(prevProps.stateTC) && images) {
				stateTC.forEach(tc => this.getStateTcs(this.state.containerG, images[`stateTC${tc.id}`], tc.state, tc.id));
			}

			let imagesChart = { ...variableValues.imagesChart };
			if (imagesChart && JSON.stringify(prevProps.configureDraw.imagesChart) !== JSON.stringify(configureDraw.imagesChart)) {
				Object.keys(imagesChart).forEach(k => {
					const index = configureDraw.imagesChart.findIndex(el => el.property === k);
					if (index >= 0) {
						const urlImage = iconCollection[configureDraw.imagesChart[index].url];
						imagesChart[k].attr('xlink:href', urlImage);
					}
				});
			}

			if (livelOil) {
				livelOil.forEach(oil => {
					const rectBarOIl = document.querySelector(`#barOil-${oil.tag}`);
					if (rectBarOIl) {
						rectBarOIl.setAttribute('height', ((oil.value * 80) / oil.capacity));
					}
				});
			}
			
			if (prevProps.isThresholds !== isThresholds) {
				const chartContainer = document.querySelector(`#chart-id`);
				if (chartContainer) {
					const labels = document.querySelectorAll('[data-reference-label]');
					if (isThresholds) {
						labels.forEach(label => label.setAttribute('open-modal', true));
					} else {
						labels.forEach(label => label.removeAttribute('open-modal'));
					}
				}
			}

			this.setState({ variableValues: { values, images, imagesChart } });
		}

	}

	referenceManageZoom = (g, svg, dimesionDraw, chartContainer) => {
		manageZoomByWidth({
			graphics: g,
			svg: svg,
			baseW: dimesionDraw.width,
			baseH: dimesionDraw.height,
			container: chartContainer,
			minScale: dimesionDraw.minScale,
			maxScale: dimesionDraw.maxScale
		});
	};

	/**
* Function return dstate to tcs
* @param {*} state tcs
* @param {*} index index tcs on station
*/
	getStateTcs = (containerTcsG, imageState, state, id) => {
		if (containerTcsG.select(`#stateImage${id}`)) {
			containerTcsG.select(`#stateImage${id}`).remove();
		}
		if (imageState) {
			const svgLoader = containerTcsG
				.append('g')
				.attr('id', `stateImage${id}`)
				.attr('transform', imageState.attr("transform"));
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
			UtilsChart.drawText({
				svg: svgLoader,
				text: `TC${id}`,
				x: 13.5,
				y: 16,
				fill: '#FFFFFF'
			});
		}
	}

	/**
	 * Add mask for click to TC
	 */
	addClickTC = (linkMask, id) => {
		linkMask.on("click", () => this.props.goToDetails(id));
	}

	render() {
		return <div className="container-graph" id="chart-id" />;
	}
}

export default SimpleChart;