import React from "react";
import PropTypes from 'prop-types';
import * as d3 from "d3";

import { Cartesian } from "./style";
import { UtilsChart, cleanSvg } from '../../Utils';
import iconCollection from "./../../base/Icon/svg";

const CartesianUI2 = (props) => {
	const { idSelector, data, xDomain, yDomain, scaleX, scaleY, xWorkPoint, yWorkPoint, xUnit, yUnit, margin, width, height, xLabel, yLabel, onHover } = props;

	//React usestate
	const [workpointer, changeWorkpointer] = React.useState(null);
	const [containerChart, changeContainerChart] = React.useState(null);
	const [xAxisLabel, changexAxisLabel] = React.useState(null);
	const [yAxisLabel, changeyAxisLabel] = React.useState(null);

	React.useEffect(() => {
		//clear svg chart
		if (containerChart) {
			cleanSvg(document.querySelector(idSelector));
		}
		d3.select(idSelector)
			.append("div")
			.attr("class", "tooltip-chart-cartesian")
			.style("opacity", 0);

		let offsetWidth = d3.select(`${idSelector}-container`).node().scrollWidth - margin.left - margin.right;
		if (offsetWidth > width) {
			offsetWidth = width;
		}

		const xScale = d3.scaleLinear()
			.domain(xDomain)
			.range([0, offsetWidth]);

		const yScale = d3.scaleLinear()
			.domain(yDomain)
			.range([height, 0]);

		const svg = d3.select(idSelector).append("svg")
			.attr("width", offsetWidth + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		//Asse x
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(xScale).tickSize(-height, 0, 0).tickFormat(d => d * scaleX));
		svg.selectAll('.x.axis')
			.append('line')
			.attr('x1', 0)
			.attr('x2', offsetWidth + 10)
			.attr('stroke', '#354e70')
			.attr('stroke-width', 2);
		svg.selectAll('.x.axis')
			.append('g')
			.attr('transform', `translate(${offsetWidth + 10}, -4)`)
			.append('path')
			.attr('d', 'M646.569 269.746L651.581 274.758 645.581 275.746z')
			.attr('fill', '#354e70')
			.attr('transform', 'rotate(-135 269.369 272.244)');
		svg.selectAll('.x.axis .tick text').attr('y', 8);
		const xLabelChart = svg.selectAll('.x.axis')
			.append('g')
			.attr('transform', `translate(${offsetWidth + 20}, 4)`)
			.append('text')
			.text(xLabel)
			.attr('width', 20)
			.attr('height', 10)
			.attr(`fill`, `#FFFFFF`)
			.attr(`font-size`, `9px`)
			.attr(`font-weight`, `500`)
			.style(`text-anchor`, `start`);
		changexAxisLabel(xLabelChart);

		//Asse y
		svg.append("g")
			.attr("class", "y axis")
			.call(d3.axisLeft(yScale).tickSize(-offsetWidth, 0, 0).tickFormat(d => d * scaleY));
		svg.selectAll('.y.axis')
			.append('line')
			.attr('y1', height)
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
		const yLabelChart = svg.selectAll('.y.axis')
			.append('g')
			.attr('transform', `translate(-4, -25)`)
			.append('text')
			.text(yLabel)
			.attr('width', 20)
			.attr('height', 10)
			.attr(`fill`, `#FFFFFF`)
			.attr(`font-size`, `9px`)
			.attr(`font-weight`, `500`)
			.style(`text-anchor`, `start`);
		changeyAxisLabel(yLabelChart);

		svg
			.append("circle")
			.attr('class', 'circle-line')
			.style("fill", "#243348")
			.attr("stroke", "#f9f9f9")
			.attr("r", 5)
			.style("opacity", 0);

		// clip path 
		svg
			.append("defs")
			.append("svg:clipPath")
			.attr("id", `${idSelector.substr(1, idSelector.length)}-clip`)
			.append("svg:rect")
			.attr("width", offsetWidth)
			.attr("height", height)
			.attr("x", 0)
			.attr("y", 0);

		//Background
		svg
			.append("svg:rect")
			.attr('id', 'background')
			.attr("width", offsetWidth)
			.attr("height", height)
			.attr("x", 0)
			.attr("y", 0)
			.style("fill", "#354e70")
			.style("fill-opacity", "0.3");

		// data chart lines
		const containerData = svg.append('g').attr("clip-path", `url(${idSelector}-clip)`);
		data.forEach(curve => {
			containerData
				.append("path")
				.datum(curve.values) // 10. Binds data to the line 
				.attr("class", "line") // Assign a class for styling 
				.attr("d", d3.line()
					.x(d => { return xScale(d.x * scaleX); })
					.y(d => { return yScale(d.y * scaleY); })
				)
				.attr("stroke", curve.color || '#FFFFFF')
				.attr("stroke-width", 2)
				.attr("fill-opacity", .3)
		});

		data.forEach(curve => {
			if (curve.label) {
				switch (curve.type) {
					case 0: {
						containerData.append('g')
							.attr('transform', `translate(${xScale(curve.values[curve.values.length-1].x * scaleX) + 5}, ${yScale(curve.values[curve.values.length-1].y * scaleY) + 15})`)
							.append('text')
							.text(curve.label)
							.attr('width', 20)
							.attr('height', 10)
							.attr(`fill`, curve.color || '#FFFFFF')
							.attr(`font-size`, `9px`)
							.attr(`font-weight`, `500`)
							.style(`text-anchor`, `middle`)
						break;
					}
					// case 1: {
					// 	const valuesY = curve.values.map(el => el.y);
					// 	const maxValueY = Math.max(...valuesY);

					// 	const valuesX = curve.values.map(el => el.x);
					// 	const maxValueX = Math.max(...valuesX);

					// 	containerData.append('g')
					// 		.attr('transform', `translate(${xScale(maxValueX * scaleX) + 8}, ${yScale(maxValueY * scaleY) - 2})`)
					// 		.append('text')
					// 		.text(curve.label)
					// 		.attr('width', 20)
					// 		.attr('height', 10)
					// 		.attr(`fill`, curve.color || '#FFFFFF')
					// 		.attr(`font-size`, `9px`)
					// 		.attr(`font-weight`, `500`)
					// 		.style(`text-anchor`, `start`);
					// 	break;
					// }
					default: break;
				}
			}
		});

		//Hover line
		data.forEach(curve => {
			containerData
				.append("path")
				.datum(curve.values) // 10. Binds data to the line 
				.attr("class", "line-hover") // Assign a class for styling
				.attr("d", d3.line()
					.x(d => { return xScale(d.x * scaleX); })
					.y(d => { return yScale(d.y * scaleY); })
				)
				.on("mousemove", (data) => {
					if (onHover) {
						d3.selectAll(`${idSelector} .line`).attr('stroke-opacity', .3);
						d3.event.currentTarget.setAttribute('stroke-opacity', 1);
						if (!d3.select(`${idSelector} #hover-line`).node()) {
							containerData.append("path")
								.datum(data)
								.attr('id', 'hover-line')
								.attr("fill", curve.color)
								.attr("fill-opacity", .3)
								.attr("stroke", "none")
								.attr("d", d3.area()
									.x(d => { return xScale(d.x * scaleX) })
									.y0(height)
									.y1(d => { return yScale(d.y * scaleY) })
								)
						}
					}
					const x0 = xScale.invert(d3.mouse(d3.event.currentTarget)[0]) * scaleX;
					const y0 = yScale.invert(d3.mouse(d3.event.currentTarget)[1]) * scaleY;
					let htmlPopover = `
						${curve.label && curve.label !== undefined && `<p class="title">${curve.label}</p>`}
						<p><span class="axis">x:</span> ${x0.toFixed(2)} ${xUnit || ''}</p>
						<p><span class="axis">Y:</span> ${y0.toFixed(2)} ${yUnit || ''}</p>
					`;
					if (curve.title && curve.title !== '') {
						htmlPopover = `
							<p class="title">${curve.title}</p>
							<p><span class="axis">x:</span> ${x0.toFixed(2)} ${xUnit || ''}</p>
							<p><span class="axis">Y:</span> ${y0.toFixed(2)} ${yUnit || ''}</p>
						`;
					}
					d3
						.select(`${idSelector} .tooltip-chart-cartesian`)
						.html(htmlPopover)
						.style("left", `${d3.event.offsetX}px`)
						.style("top", `${d3.event.offsetY - 16}px`)
						.style("opacity", 1);
					d3
						.select(`${idSelector} .circle-line`)
						.attr("cx", xScale(x0))
						.attr("cy", yScale(y0))
						.style("opacity", 1);
				})
				.on("mouseout", () => {
					if (onHover) {
						d3.selectAll(`${idSelector} .line`).attr('stroke-opacity', 1);
						d3.select(`${idSelector} #hover-line`).remove();
					}
					d3
						.select(`${idSelector} .tooltip-chart-cartesian`)
						.style("opacity", 0);
					d3
						.select(`${idSelector} .circle-line`)
						.style("opacity", 0);
				});
		});

		//Draw workPointer
		if (xWorkPoint && yWorkPoint) {
			const containerPoint = svg.append('g').attr("clip-path", `url(${idSelector}-clip)`);
			const point = containerPoint.append('g');
			UtilsChart.drawImage({
				svg: point,
				url: iconCollection['workPoint'],
				w: 11,
				h: 11,
			});
			containerPoint
				.append('g')
				.append("path")
				.datum([{ x: xWorkPoint, y: yDomain[0] }, { x: xWorkPoint, y: yWorkPoint }])
				.attr("fill", "none")
				.attr("stroke", "#FFFFFF")
				.attr("stroke-width", 1)
				.attr("stroke-dasharray", "3")
				.attr(
					"d",
					d3
						.line()
						.x((d) => {
							return xScale(d.x * scaleX);
						})
						.y((d) => {
							return yScale(d.y * scaleY);
						})
				)
			containerPoint
				.append("path")
				.datum([{ x: xWorkPoint, y: yWorkPoint }, { x: xDomain[0], y: yWorkPoint }])
				.attr("fill", "none")
				.attr("stroke", "#FFFFFF")
				.attr("stroke-width", 1)
				.attr("stroke-dasharray", "3")
				.attr(
					"d",
					d3
						.line()
						.x((d) => {
							return xScale(d.x * scaleX);
						})
						.y((d) => {
							return yScale(d.y * scaleY);
						})
				);
			point.attr('transform', `translate(${xScale(xWorkPoint * scaleX) - 5.5}, ${yScale(yWorkPoint * scaleY) - 5.5})`);
			changeWorkpointer(containerPoint);
		}
		changeContainerChart(svg);

		// eslint-disable-next-line 
	}, [xUnit, yUnit, data]);

	React.useEffect(() => {
		//Draw update workPointer
		if (xWorkPoint && yWorkPoint && containerChart) {
			if (workpointer) {
				workpointer.remove();
			}

			let offsetWidth = d3.select(idSelector).node().scrollWidth - margin.left - margin.right;
			if (offsetWidth > width) {
				offsetWidth = width;
			}

			const xScale = d3.scaleLinear()
				.domain(xDomain)
				.range([0, offsetWidth]);

			const yScale = d3.scaleLinear()
				.domain(yDomain)
				.range([height, 0]);

			const containerPoint = containerChart.append('g').attr("clip-path", `url(${idSelector}-clip)`);
			const point = containerPoint.append('g');
			UtilsChart.drawImage({
				svg: point,
				url: iconCollection['workPoint'],
				w: 11,
				h: 11,
			});
			containerPoint
				.append('g')
				.append("path")
				.datum([{ x: xWorkPoint, y: yDomain[0] }, { x: xWorkPoint, y: yWorkPoint }])
				.attr("fill", "none")
				.attr("stroke", "#FFFFFF")
				.attr("stroke-width", 1)
				.attr("stroke-dasharray", "3")
				.attr(
					"d",
					d3
						.line()
						.x((d) => {
							return xScale(d.x * scaleX);
						})
						.y((d) => {
							return yScale(d.y * scaleY);
						})
				)
			containerPoint
				.append("path")
				.datum([{ x: xWorkPoint, y: yWorkPoint }, { x: xDomain[0], y: yWorkPoint }])
				.attr("fill", "none")
				.attr("stroke", "#FFFFFF")
				.attr("stroke-width", 1)
				.attr("stroke-dasharray", "3")
				.attr(
					"d",
					d3
						.line()
						.x((d) => {
							return xScale(d.x * scaleX);
						})
						.y((d) => {
							return yScale(d.y * scaleY);
						})
				);
			point.attr('transform', `translate(${xScale(xWorkPoint * scaleX) - 5.5}, ${yScale(yWorkPoint * scaleY) - 5.5})`);
			changeWorkpointer(containerPoint);
		}
		// eslint-disable-next-line
	}, [xWorkPoint, yWorkPoint]);

	React.useEffect(() => {
		if (xAxisLabel) {
			xAxisLabel.text(xLabel)
		}
		if (yAxisLabel) {
			yAxisLabel.text(yLabel)
		}
	}, [xLabel, yLabel, xAxisLabel, yAxisLabel]);

	return (
		<Cartesian id={`${idSelector.substr(1, idSelector.length)}-container`}>
			<div className="container-svg" id={idSelector.substr(1, idSelector.length)} />
		</Cartesian>
	);
}


CartesianUI2.propTypes = {
	idSelector: PropTypes.string,
	data: PropTypes.array,
	xDomain: PropTypes.array,
	yDomain: PropTypes.array,
	scaleX: PropTypes.number,
	scaleY: PropTypes.number,
	xWorkPoint: PropTypes.string,
	yWorkPoint: PropTypes.string,
	margin: PropTypes.object,
	height: PropTypes.number,
	xLabel: PropTypes.string,
	yLabel: PropTypes.string,
	onHover: PropTypes.bool,
	xUnit: PropTypes.string,
	yUnit: PropTypes.string
};

CartesianUI2.defaultProps = {
	idSelector: 'chart',
	data: null,
	xDomain: null,
	yDomain: null,
	scaleX: 1,
	scaleY: 1,
	xWorkPoint: null,
	yWorkPoint: null,
	margin: { top: 30, right: 35, bottom: 20, left: 20 },
	height: 400,
	xLabel: '',
	yLabel: '',
	onHover: false,
	xUnit: null,
	yUnit: null
};

export default CartesianUI2;