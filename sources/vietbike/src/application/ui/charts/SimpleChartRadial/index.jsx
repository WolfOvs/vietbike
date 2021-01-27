import React from "react";
import * as d3 from "d3";

import {
	UtilsChart,
	manageZoomByWidth,
	UtilsChartEnsemble,
	drawBlueLabels,
	scrollAndHighlightData,
	cleanSvg,
	drawImageInChart,
	isEqualToObject
} from "../../Utils";

//{ configureDraw, changeIsLoading, dataRadialCharts, dimesionDraw }

class SimpleChartRadial extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			variableValues: null,
			radialsCharts: null
		}
	}

	componentDidMount() {
		const { configureDraw, changeIsLoading, dataRadialCharts, dimesionDraw, isThresholds, changeOpenModal } = this.props;

		const chartContainer = document.querySelector("#exhaustSpacesWheel-overview");
		if (chartContainer) {
			cleanSvg(chartContainer)
			d3.select('#exhaustSpacesWheel-overview')
				.append("div")
				.attr("class", "tooltip-chart")
				.style("opacity", 0);
			//Tooltip chart
			d3.select('body')
				.append("div")
				.attr("class", "tooltip-chart-cartesian")
				.style("opacity", 0);

			const svg = d3
				.select(`#exhaustSpacesWheel-overview`)
				.append(`svg`)
				.attr(`width`, `${dimesionDraw.width}px`)
				.attr(`height`, `${dimesionDraw.height}px`);
			const g = UtilsChart.drawG({ svg });

			//Draw label, value and images
			UtilsChartEnsemble.propertyBicolor({ svg: g });
			let values = null;
			if (configureDraw) {
				drawImageInChart(g, configureDraw.imagesChart);
				drawBlueLabels(g, configureDraw.labels);
				values = drawBlueLabels(g, configureDraw.values);
			}

			let radialsCharts = dataRadialCharts.map((radialChart, index) => drawRadialChart(g, radialChart.x, radialChart.y, radialChart.data, `radialChart-${index}`, radialChart.domain, radialChart.x0, radialChart.ticks));

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


			this.setState({ radialsCharts, variableValues: values }, changeIsLoading(false));
		}
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.referenceManageZoom);
		const tooltip = document.querySelector('.tooltip-chart-cartesian');
		if (tooltip) tooltip.remove();
		this.setState({ variableValues: null, radialChart: null })
	}

	componentDidUpdate(prevProps) {
		const { configureDraw, dataRadialCharts, isThresholds } = this.props;
		const { variableValues, radialsCharts } = this.state;

		let values = { ...variableValues.values };
		if (values && JSON.stringify(prevProps.configureDraw.values) !== JSON.stringify(configureDraw.values)) {
			const keys = Object.keys(values)
			keys.forEach(k => {
				const index = configureDraw.values.findIndex(el => el.property === k);
				if (index >= 0) {
					values[k].text(configureDraw.values[index].value);
					values[k].on("mousemove", () => {
						let htmlPopover = `<p>${configureDraw.values[index].hoverText}</p>`;
						let popover = document.querySelector(`.tooltip-chart`);
						popover.innerHTML = htmlPopover;
						popover.style.left = `${d3.event.pageX}px`;
						popover.style.top = `${d3.event.pageY - 10}px`;
						popover.style.opacity = '1';
					});
				}
			})
			this.setState({ variableValues: values });
		}

		if (JSON.stringify(prevProps.dataRadialCharts) !== JSON.stringify(dataRadialCharts)) {
			dataRadialCharts.map((radialChart, index) => updateChart(radialChart.data, radialsCharts[index].dataUpdate, radialsCharts[index].radialScale, radialChart.x, radialChart.y, radialChart.x0));
		}

		if (prevProps.isThresholds !== isThresholds) {
			const chartContainer = document.querySelector(`#exhaustSpacesWheel-overview`);
			if (chartContainer) {
				const labels = document.querySelectorAll('[data-reference-label]');
				if (isThresholds) {
					labels.forEach(label => label.setAttribute('open-modal', true));
				} else {
					labels.forEach(label => label.removeAttribute('open-modal'));
				}
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

	render() {
		return <div className="container-graph" id="exhaustSpacesWheel-overview" />;
	}
}

const angleToCoordinate = (angle, value, radialScale, width, height) => {
	let x = Math.cos(angle) * radialScale(value);
	let y = Math.sin(angle) * radialScale(value);
	return { "x": width + x, "y": height - y };
}

const drawRadialChart = (svg, width, height, data, idSelector, domain, x0, ticks) => {
	const chart = document.querySelector(`#${idSelector}`);
	if (chart) {
		chart.remove();
	}
	//Letter of charts
	let features = data.map(el => Object.keys(el)[0]);
	let g = svg.append('g').attr('id', idSelector);
	const radialScale = d3.scaleLinear()
		.domain(domain)
		.range([0, 115]);
	ticks.forEach((t, index) => {
		let angle = 3 * Math.PI / 8;
		let label_coordinate = angleToCoordinate(angle, t, radialScale, width, height);
		g.append("circle")
			.attr("cx", width)
			.attr("cy", height)
			.attr("fill", "none")
			.attr('opacity', `${index === ticks.length - 1 ? 1 : .15}`)
			.attr("stroke", "#ffffff")
			.attr("r", radialScale(t));
		g.append("text")
			.attr('fill', '#a0abb6')
			.attr("x", label_coordinate.x)
			.attr("y", label_coordinate.y)
			.attr('pointer-events', 'none')
			.attr('font-size', '8')
			.attr('text-anchor', 'start')
			.text(t);
	});

	//draw axis line
	features.forEach((fet, i) => {
		let angle = x0 + (2 * Math.PI * i / features.length);
		const domainLine = domain ? domain[1] : 1000;
		let line_coordinate = angleToCoordinate(angle, domainLine, radialScale, width, height);
		g.append("line")
			.attr("x1", width)
			.attr("y1", height)
			.attr("x2", line_coordinate.x)
			.attr("y2", line_coordinate.y)
			.attr("fill", "#213b54")
			.attr('opacity', .15)
			.attr('stroke', '#ffffff')
			.attr('class', 'line');
	});

	//draw data label
	const dataUpdate = [];
	features.forEach((feat, i) => {
		let ft_key = feat;
		let angle = x0 + (2 * Math.PI * i / features.length);
		let label_coordinate = angleToCoordinate(angle, data[i][ft_key].value, radialScale, width, height);
		const gData = g.append('g');
		gData.append('circle')
			.attr('r', 6)
			.attr('fill', '#385c80')
			.attr('stroke', '#ffffff')
			.attr('stroke-width', 1)
			.attr("cx", label_coordinate.x)
			.attr("cy", label_coordinate.y)
			.attr('data-reference-label', Object.keys(data[i])[0]);

		gData.append("text")
			.attr('fill', '#ffffff')
			.attr("x", label_coordinate.x)
			.attr("y", label_coordinate.y + 3)
			.attr('pointer-events', 'none')
			.attr('font-size', '10')
			.attr('text-anchor', 'middle')
			.text(data[i][ft_key].label)
			.attr('data-reference-label', Object.keys(data[i])[0]);

		gData
			.on("mousemove", () => {
				d3.select('.tooltip-chart-cartesian')
					.html(`<p class="title">${data[i][ft_key].tooltip}</p><p><span class="axis">Y:</span> ${data[i][ft_key].value || 0} ${data[i][ft_key].uom}</p>`)
					.style("left", `${d3.event.pageX}px`)
					.style("top", `${d3.event.pageY - 12}px`)
					.style("opacity", 1)
			})
			.on("mouseout", () => {
				d3.select('.tooltip-chart-cartesian').style("opacity", 0)
			});
		dataUpdate.push(gData)
	})
	return { dataUpdate, radialScale };
}

const updateChart = (data, gData, radialScale, width, height, x0) => {
	let features = data.map(el => Object.keys(el)[0]);

	//draw data label
	features.forEach((feat, i) => {
		let ft_key = feat;
		let angle = x0 + (2 * Math.PI * i / features.length);
		let label_coordinate = angleToCoordinate(angle, data[i][ft_key].value, radialScale, width, height);

		gData[i].select('circle')
			.attr("cx", label_coordinate.x)
			.attr("cy", label_coordinate.y)

		gData[i].select('text')
			.attr("x", label_coordinate.x)
			.attr("y", label_coordinate.y + 3)

		gData[i]
			.on("mousemove", () => {
				d3.select('.tooltip-chart-cartesian')
					.html(`<p class="title">${data[i][ft_key].tooltip}</p><p><span class="axis">Y:</span> ${data[i][ft_key].value || 0} ${data[i][ft_key].uom}</p>`)
					.style("left", `${d3.event.pageX}px`)
					.style("top", `${d3.event.pageY - 12}px`)
					.style("opacity", 1)
			});
	});
}

export default React.memo(SimpleChartRadial, (prevProps, nextProps) => isEqualToObject(prevProps, nextProps));