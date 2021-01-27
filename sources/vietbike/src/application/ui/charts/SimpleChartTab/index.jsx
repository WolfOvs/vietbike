import React from "react";
import * as d3 from "d3";

import {
	UtilsChart,
	manageZoomByWidth,
	scrollAndHighlightData,
	drawBlueLabels,
	cleanSvg,
	drawImageInChart,
	isEqualToObject
} from "../../Utils";

//{ configureDraw, goToDetails, changeIsLoading, dimesionDraw, configureTab }
class SimpleChartTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			variableValues: null,
			radialsCharts: null
		}
	}

	componentDidMount() {
		const chartContainer = document.querySelector("#chart-tab-id");
		const { dimesionDraw, changeIsLoading } = this.props;
		if (chartContainer) {
			//Draw chart
			const { g, svg, values } = this.drawChart(chartContainer, this.props)

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
			window.addEventListener("resize", this.referenceManageZoom(g, svg, dimesionDraw, chartContainer));

			this.setState({ variableValues: values }, changeIsLoading(false))
		}
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.referenceManageZoom);
		const tooltip = document.querySelector('.tooltip-chart-cartesian');
		if (tooltip) tooltip.remove();
		this.setState({
			variableValues: null,
			configureDraw: null,
			radialsCharts: null
		});
	}

	componentDidUpdate(prevProps) {
		const { configureDraw, isThresholds } = this.props;
		const { variableValues } = this.state;

		if (prevProps.isThresholds !== isThresholds) {
			const chartContainer = document.querySelector(`#chart-tab-id`);
			if (chartContainer) {
				const labels = document.querySelectorAll('[data-reference-label]');
				if (isThresholds) {
					labels.forEach(label => label.setAttribute('open-modal', true));
				} else {
					labels.forEach(label => label.removeAttribute('open-modal'));
				}
			}
		}

		if (JSON.stringify(prevProps.configureDraw) !== JSON.stringify(configureDraw)) {

			if (JSON.stringify(configureDraw.imagesChart) !== JSON.stringify(prevProps.configureDraw.imagesChart)) {
				const vibrationChart = document.querySelector("#chart-tab-id");
				this.drawChart(vibrationChart, this.props);
			}

			let values = { ...variableValues.values };
			if (JSON.stringify(configureDraw.values) !== JSON.stringify(prevProps.configureDraw.values)) {
				Object.keys(values).forEach(k => {
					if (values[k].type === 'relatedLabel') {
						let valuesrelated = [];
						configureDraw.values.filter(el => el.type === 'relatedLabel').map(el => valuesrelated = [...valuesrelated, ...el.value]);
						values[k].value.attr('class', '');
						const findValue = valuesrelated.find(el => el.property === k);
						if (findValue) {
							values[k].value.text(findValue.value);
							values[k].value.attr('class', `svgLabel ${findValue.class}`);
						}
					} else {
						values[k].attr('class', '');
						const findValue = configureDraw.values.find(el => el.property === k);
						if (findValue) {
							values[k].text(findValue.value);
							values[k].attr('class', `svgLabel ${findValue.class}`);
						}
					}
				});
				this.setState({ variableValues: values });
			}

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

	//Draw charts
	drawChart = (chartContainer, props) => {
		const { configureDraw, goToDetails, dimesionDraw, configureTab, changeOpenModal, isThresholds } = props;

		cleanSvg(chartContainer);
		d3.select('#chart-tab-id')
			.append("div")
			.attr("class", "tooltip-chart")
			.style("opacity", 0);
		const svg = d3
			.select(`#chart-tab-id`)
			.append(`svg`)
			.attr(`width`, `${dimesionDraw.width}px`)
			.attr(`height`, `${dimesionDraw.height}px`)
		const g = UtilsChart.drawG({ svg });

		//Draw label, value and images
		let values = null;
		if (configureDraw) {
			drawImageInChart(g, configureDraw.imagesChart);
			values = drawBlueLabels(g, configureDraw.values);
			addClickToChart(g.node().querySelectorAll('.hover-img'), goToDetails, configureTab);
		}
		const xScroll = (chartContainer.scrollLeft + g.node().querySelectorAll('.hover-img.active')[0].getBoundingClientRect().left - chartContainer.offsetWidth / 2 + g.node().querySelectorAll('.hover-img.active')[0].getBoundingClientRect().width / 2);
		const yScroll = g.node().querySelectorAll('.hover-img.active')[0].getBoundingClientRect().top;
		chartContainer.scrollTo({
			top: yScroll,
			left: xScroll,
			behavior: 'smooth'
		});

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

		return { g, svg, values };
	}

	render() {
		return <div className="container-graph" id="chart-tab-id" />;
	}

}

const addClickToChart = (imgs, goToDetails, configureTab) => {
	configureTab.forEach((el, index) => {
		imgs[index].onclick = () => goToDetails(el.key);
	});
}

export default React.memo(SimpleChartTab, (prevProps, nextProps) => isEqualToObject(prevProps, nextProps));
