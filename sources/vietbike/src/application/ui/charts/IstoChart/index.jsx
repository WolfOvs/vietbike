import React from "react";
import * as d3 from "d3";

import { IstoChart } from "./style";
import {
	UtilsChart,
	cleanSvg
} from "../../Utils";

function IstoChartUI({
	idSelector,
	width,
	height,
	data,
	xDomain,
	yDomain,
	margin,
	xLabel = null,
	yLabel = null,
	ticks
}) {
	const [chart, changeChart] = React.useState(null);
	const [bars, changeBars] = React.useState(null);
	const [dataChart, changeDataChart] = React.useState(null);

	React.useEffect(() => {
		if (chart && bars && JSON.stringify(data) !== JSON.stringify(dataChart)) {
			changeDataChart(data);
			changeBars(updateData(chart, bars, data));
		} else {
			changeDataChart(data)
			const svgObj = drawChart(
				width,
				height,
				idSelector,
				xDomain,
				yDomain,
				margin,
				ticks
			);
			changeChart(svgObj);
			insertAxisLabels({
				svg: svgObj.svg,
				width: svgObj.w,
				height: svgObj.h,
				xLabel,
				yLabel,
				margin
			});
			const barsData = insertData(svgObj, data, idSelector, margin, yDomain);
			changeBars(barsData)
	
			window.addEventListener("resize", () => {
				const svgObj = drawChart(
					width,
					height,
					idSelector,
					xDomain,
					yDomain,
					margin,
					ticks
				);
				changeChart(svgObj);
				insertAxisLabels({
					svg: svgObj.svg,
					width: svgObj.w,
					height: svgObj.h,
					xLabel,
					yLabel,
					margin
				});
				const barsData = insertData(svgObj, data, idSelector, margin, yDomain);
				changeBars(barsData);
			});
		}

		//Scale chart
		return () => {
			window.removeEventListener("resize", drawChart);
		};
		// eslint-disable-next-line
	}, [data]);

	//Update label axis
	React.useEffect(() => {
		if (chart) {
			insertAxisLabels({
				svg: chart.svg,
				width: chart.w,
				height: chart.h,
				xLabel,
				yLabel,
				margin
			});
		}
	}, [xLabel, yLabel, chart, margin])

	return (
		<IstoChart>
			<div id={idSelector.substr(1, idSelector.length)} />
		</IstoChart>
	);
}

// Determine current size, which determines vars
const set_vars = (idSelector, default_ratio) => {
	const chartContainer = document.querySelector(idSelector);
	let current_width = chartContainer.offsetWidth;
	let current_height = chartContainer.offsetWidth + 100;
	let current_ratio = current_width / current_height;

	let h, w;

	// Check if height is limiting factor
	if (current_ratio > default_ratio) {
		h = current_height;
		w = current_height * default_ratio;
		// Else width is limiting
	} else {
		w = current_width;
		h = current_width / default_ratio;
	}

	return { svgWidth: w, svgHeight: h }
};

/**
 * Drow chart
 * @param {*} width 
 * @param {*} height 
 * @param {*} idSelector 
 * @param {*} xDomain 
 * @param {*} yDomain 
 * @param {*} margin 
 */
const drawChart = (
	width,
	height,
	idSelector,
	xDomain,
	yDomain,
	margin,
	ticks
) => {
	// the element to be filled in the HTML file
	const chartContainer = d3.select(idSelector);
	cleanSvg(chartContainer.node());

	// Set default width and height, calculate ratio
	let default_ratio = width / height;
	// overall SVG dimensions
	const { svgWidth, svgHeight } = set_vars(idSelector, default_ratio);

	// chart dimensions = overall dimensions minus margins
	const w = svgWidth - margin.left - margin.right;
	const h = svgHeight - margin.top - margin.bottom;

	// create the SVG
	const svg = chartContainer
		.append('svg')
		.attr('width', svgWidth)
		.attr('height', svgHeight);

	// match domain (input values) to range (output units)
	const xScale = d3.scaleBand()
		.rangeRound([0, w])
		.padding(0.5)
		.domain(xDomain.map(el => el.temp));

	const yScale = d3.scaleLinear()
		.rangeRound([h, 0])
		.domain(yDomain);

	// create axes for the chart
	// the axes are appended to the SVG, not the chart group
	const yAxis = svg.append('g')
		.classed('scale y axis', true)
		.attr('id', `${idSelector.substr(1, idSelector.length)}-y-axis`)
		.attr('fill', 'rgba(56, 71, 90, .3)')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		.call(d3.axisLeft(yScale).tickSize(-w, 0, 0).tickValues(ticks ? ticks : [0, 200, 400, 600, 800, 1000]))
	svg.selectAll('.y.axis')
		.append('line')
		.attr('y1', h)
		.attr('y2', -10)
		.attr('stroke', '#354e70')
		.attr('stroke-width', 2);
	svg.selectAll('.y.axis')
		.append('g')
		.attr('transform', `translate(4, ${-25})`)
		.append('path')
		.attr('d', 'M646.569 269.746L651.581 274.758 645.581 275.746z')
		.attr('fill', '#354e70')
		.attr('transform', 'rotate(135 375.712 8.609)');
	svg.selectAll('.y.axis .tick text').attr('x', -8);

	const xAxis = svg.append('g')
		.classed('scale x axis', true)
		.attr('id', `${idSelector.substr(1, idSelector.length)}-x-axis`)
		.attr('fill', 'rgba(56, 71, 90, .3)')
		.attr('transform', 'translate(' + margin.left + ',' + (svgHeight - margin.bottom) + ')')
		.call(d3.axisBottom(xScale).tickSize(-h, 0, 0))
	svg.selectAll('.x.axis')
		.append('line')
		.attr('x1', 0)
		.attr('x2', w + 10)
		.attr('stroke', '#354e70')
		.attr('stroke-width', 2);
	svg.selectAll('.x.axis')
		.append('g')
		.attr('transform', `translate(${w + 10}, -4)`)
		.append('path')
		.attr('d', 'M646.569 269.746L651.581 274.758 645.581 275.746z')
		.attr('fill', '#354e70')
		.attr('transform', 'rotate(-135 269.369 272.244)');
	svg.selectAll('.x.axis .tick text').attr('y', 10);

	return { svg, xScale, yScale, xAxis, yAxis, w, h }
}

/**
 * insert data
 * @param {*} svgObj container svg chart 
 * @param {*} data new Data
 * @param {*} idSelector id div container chart
 * @param {*} margin margin of chart
 */
const insertData = (svgObj, data, idSelector, margin, yDomain) => {
	// add a bar for every month
	// first select all existing bars (there are none)
	const chart = svgObj.svg.append('g')
		.attr('id', `${idSelector.substr(1, idSelector.length)}-charts`)
		.attr('transform', 'scale(1, 1) translate(' + margin.left + ',' + margin.top + ')')
		.attr('width', svgObj.w)
		.attr('height', svgObj.h);
	const bars = d3.select(`${idSelector}-charts`).selectAll('.bar');

	let barWidth = svgObj.xScale.bandwidth() / 2;

	// Bars background
	bars.data(data)
		.enter().append('rect')
		.classed('bar', true)
		.style('fill', 'rgba(255, 255, 255, 0.1)')
		.style('stroke', '#465c7a')
		.style('stroke-width', '1px')
		.attr('height', function (d) {
			return svgObj.h;
		})
		.attr('width', svgObj.xScale.bandwidth())
		.attr('x', function (d) {
			return svgObj.xScale(d.temp);
		})
		.attr('y', function (d) {
			return svgObj.yScale(yDomain ? yDomain[1] : 1000);
		})
		.attr('data-reference-table', function (d) {
			return d.metadata;
		});

	// Bars
	bars.data(data)
		.enter().append('rect')
		.attr('class', 'bar bar-data')
		.style('fill', '#3eb7ea')
		.attr('height', function (d) {
			const value = svgObj.h - svgObj.yScale(d.value);
			return value > 0 ? value : 0;
		})
		.attr('width', svgObj.xScale.bandwidth())
		.attr('x', function (d) {
			return svgObj.xScale(d.temp);
		})
		.attr('y', function (d) {
			return svgObj.yScale(d.value);
		});

	// circles
	bars.data(data)
		.enter()
		.append("circle")
		.attr("class", "circle-external")
		.attr("r", "4")
		.attr("cx", function (d) {
			return svgObj.xScale(d.temp) + barWidth;
		})
		.attr("cy", function (d) {
			return svgObj.yScale(d.value - 5);
		})
		.style('fill', '#ffffff');

	// circles
	bars.data(data)
		.enter()
		.append("circle")
		.attr("class", "circle-internal")
		.attr("r", "2")
		.attr("cx", function (d) {
			return svgObj.xScale(d.temp) + barWidth;
		})
		.attr("cy", function (d) {
			return svgObj.yScale(d.value - 5);
		})
		.style('fill', '#3eb7ea');

	// Bars text data
	bars.data(data)
		.enter()
		.append("text")
		.attr("class", "label-data")
		.attr("x", function (d) {
			return svgObj.xScale(d.temp) + barWidth;
		})
		.attr("y", function (d) {
			return svgObj.yScale(parseFloat(d.value) + 20);
		})
		.style('fill', '#ffffff')
		.style('text-anchor', 'middle')
		.style('font-size', '9px')
		.text(function (d) { return d.value; })

	return chart;
}

/**
 * Update Bars of data
 * @param {*} chart container svg chart 
 * @param {*} bars containers data bars
 * @param {*} data new Data
 */
const updateData = (chart, bars, data) => {
	let barWidth = chart.xScale.bandwidth() / 2;
	// Bars
	bars
		.selectAll(".bar-data")
		.remove()
		.exit()
		.data(data)
		.enter().append('rect')
		.classed('bar', true)
		.attr('class', 'bar bar-data')
		.style('fill', '#3eb7ea')
		.attr('height', function (d) {
			// draw from bottom upwards: subtract height value from chart height
			return chart.h - chart.yScale(d.value);
		})
		// use the width specified via d3.scaleBand()
		.attr('width', chart.xScale.bandwidth())
		.attr('x', function (d) {
			return chart.xScale(d.temp);
		})
		.attr('y', function (d) {
			return chart.yScale(d.value);
		});

	// circles
	bars
		.selectAll(".circle-external")
		.remove()
		.exit()
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "circle-external")
		.attr("r", "4")
		.attr("cx", function (d) {
			return chart.xScale(d.temp) + barWidth;
		})
		.attr("cy", function (d) {
			return chart.yScale(d.value - 5);
		})
		.style('fill', '#ffffff');

	// circles
	bars
		.selectAll(".circle-internal")
		.remove()
		.exit()
		.data(data)
		.enter()
		.append("circle")
		.attr("class", "circle-internal")
		.attr("r", "2")
		.attr("cx", function (d) {
			return chart.xScale(d.temp) + barWidth;
		})
		.attr("cy", function (d) {
			return chart.yScale(d.value - 5);
		})
		.style('fill', '#3eb7ea');

	// Bars text data
	bars
		.selectAll(".label-data")
		.remove()
		.exit()
		.data(data)
		.enter()
		.append("text")
		.attr("class", "label-data")
		.attr("x", function (d) {
			return chart.xScale(d.temp) + barWidth;
		})
		.attr("y", function (d) {
			return chart.yScale(parseFloat(d.value) + 20);
		})
		.style('fill', '#ffffff')
		.style('text-anchor', 'middle')
		.style('font-size', '9px')
		.text(function (d) { return d.value; });

	return bars;
}

/**
 * Insert axis in chart  
 */
const insertAxisLabels = ({ svg, width, height, xLabel, yLabel, margin }) => {
	if (yLabel) {
		UtilsChart.drawText({
			svg: svg,
			x: margin.left,
			y: 10,
			fill: "#FFFFFF",
			text: yLabel,
			f_size: "9px",
			f_weight: 500,
			align: 'middle'
		});
	}
	if (xLabel) {
		UtilsChart.drawText({
			svg: svg,
			x: width + 10,
			y: height,
			fill: "#FFFFFF",
			text: xLabel,
			f_size: "9px",
			f_weight: 500,
			align: 'start'
		});
	}
}

export default IstoChartUI;
