import React from "react";
import PropTypes from 'prop-types';
import * as d3 from "d3";

import { Cartesian, Layer } from "./style";
import { Button, ButtonLink, Input } from "./../../base";
import Loading from '../../LoadingPage';
import iconCollection from "./../../base/Icon/svg";
import { Icon } from '../../base';
import curves from "../../../components/chartsTables/curves";

/**
 * foormat date D3
 * add dictionary for multi lenguage
 */
const locale = d3.timeFormatLocale({
	"dateTime": "%A, %e %B %Y г. %X",
	"date": "%d.%m.%Y",
	"time": "%H:%M:%S",
	"periods": ["AM", "PM"],
	"days": ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"],
	"shortDays": ["Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"],
	"months": ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
	"shortMonths": ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
});

const
	formatMillisecond = locale.format("%H:%M:%S.%L"),
	formatSecond = locale.format("%H:%M:%S"),
	formatMinute = locale.format("%H:%M"),
	formatHour = locale.format("%H:%M"),
	formatDay = locale.format("%d %b"),
	formatWeek = locale.format("%d %b"),
	formatMonth = locale.format("%d %b"),
	formatYear = locale.format("20%y");

/**
 * Define filter conditions
 * @param {*} date
 */
const multiFormat = (date) => {
	return (d3.timeSecond(date) < date ? formatMillisecond
		: d3.timeMinute(date) < date ? formatSecond
			: d3.timeHour(date) < date ? formatMinute
				: d3.timeDay(date) < date ? formatHour
					: d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
						: d3.timeYear(date) < date ? formatMonth
							: formatYear)(date);
}

const getTime = (time, format) => {
    var week = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    var month = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
	let date = null;

	if(format && time) {
		let dd = time.split("/")[0]
		let mm = time.split("/")[1]
		let yyyy = time.split("/")[2].split(" ")[0];
		let hh = time.split("/")[2].split(" ")[1].split(":")[0].padStart(2, "0");
		let mi = time.split("/")[2].split(" ")[1].split(":")[1].padStart(2, "0");


		date = new Date(yyyy, mm, dd, hh, mi); 
	}else {
		date = new Date(time); 
	}

    var dateFormatted =  week[date.getDay()] + ', ' + date.getDate() + ' ' + month[date.getMonth()] + ' ' +  date.getFullYear() + ' ' + date.getHours() + ':' + (date.getUTCMinutes().toString().length <= 1 ? '0' : '') + date.getUTCMinutes();
    return dateFormatted;
  }

  const getDotsData = (obj, name) => {
	let data = obj.filter((i) => {
		return i.name === name;
	});
	return data;
  }

  const createDots = (dots, dotTooltip, yDomain, colors, svg, xScale, yScale, idSelector) => {
	yDomain.forEach(el =>
		dots.filter(dat => dat.uom === el.uom).map((curve, index) => {
			const color = colors ? colors(curve.uom, index) : '#FFFFFF';
			const curveName = curve.name;
			let dotName = '';
			let dotHeader = '';
			switch(curveName) {
				case 'Nomina':
					dotName = 'dotNomina';
					dotHeader = 'Nomina';
					break;
				case 'Portata':
					dotName = 'dotPortata';
					dotHeader = 'Portata';
					break;
				case 'LimitiAttuali':
					dotName = 'dotActualLimits';
					dotHeader = 'Limite';
					break;
				case 'LimitiSuggeriti':
					dotName = 'dotLimits';
					dotHeader = 'Limite consigliato HH';
					break;
				}

			svg
			.append("g")
			.attr("clip-path", `url(${idSelector}-clip)`)
			.selectAll("dot")
			.data(curve.values)
			.enter()
			.append("circle")
				.attr("class", dotName)
				.attr("cx", d => { return xScale(d.x); } )
				.attr("cy", d => { return yScale.find(el => el.uom === curve.uom).yScale(d.y); } )
				.attr("r", 5)
				.attr("stroke", curve.color)
				.attr("fill", curve.name === 'LimitiSuggeriti'? curve.color : "rgb(5, 34, 50)")
			.on("mouseover", function(d) {
				const iconTooltip = d.result === 'SI' ? '<img src="/static/media/checkmark-copy-1.fe2cf5ea.svg" alt="iconCheckmark">' : d.result === 'NO' ?
									'<img src="/static/media/Close Circle-Line.994998b0.svg" alt="iconClose"></img>' : '';
				
				const descRefuse = d.noteSuggerimento ? "<div class='description'>" +
										"<div class='title'>" + 
										"Motivo del rifiuto: "  +
										"</div>"
										+ d.noteSuggerimento + 
									"</div>" : '';

				//const date = curve.name === 'LimitiSuggeriti' ? getTime(d.date, true) : getTime(d.date, true);

				const headerDate = d.date ? "<div class='tooltip-header'>" + "<div>" + dotHeader + "</div>" + "<div>" + getTime(d.date, true) + "</div>" + "</div>" : "<div class='tooltip-header'>" + "<div>" + dotHeader + "</div>" + "<div>" + "</div>" + "</div>"

				dotTooltip.transition()		
					.duration(200)		
					.style("opacity", 1);		
					dotTooltip.html(
					"<div class='tooltip-container-dots'>" + 
					headerDate +
						"<div class='tooltip-value'>" +
							"<div class='value'>" + d.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " Sm3/h" + "</div>" +
							"<div class='result'>" +
								iconTooltip
								+ (d.result === 'SI' ? 'Accettato' : d.result === 'NO' ? 'Rifiutato' :  curve.name === 'LimitiSuggeriti'? 'Esito: In attesa ...' : '') + "</div>"
						+ "</div>" + descRefuse
					+ "</div>"
					)	
					.style("left", (d3.event.pageX) + "px")		
					.style("top", (d3.event.pageY - 28) + "px");	
				})					
			.on("mouseout", function(d) {
				dotTooltip.transition()		
					.duration(500)		
					.style("opacity", 0);
			});

		})
	);
  }

const CartesianUITrends = (props) => {

	const {
		idSelector,
		loading,
		data,
		xDomain,
		yDomain,
		margin,
		width,
		height,
		xLabel,
		onHover,
		colors,
		zoomActive,
		commentsActive,
		comments,
		slidersActive,
		sliders,
		onChangeZoomActive,
		onChangecommentsActive,
		onSaveComments,
		onSaveSliders,
		findTooltipLabel,
		limitSlider,
		chartFiltered
	} = props;

	//React useState
	const [containerChart, changeContainerChart] = React.useState(null);
	const [containerlines, changeContainerlines] = React.useState(null);
	const [containerDotsLimits, changeContainerDotsLimits] = React.useState(null);
	const [containBrush, changeContainBrush] = React.useState(null);
	const [xAxis, changexAxis] = React.useState(null);
	const [yAxis, changeyAxis] = React.useState(null);
	const [xAxisLabel, changexAxisLabel] = React.useState(null);
	const [widthChart, changeWidthChart] = React.useState(null);
	const [domainX, changeDomainX] = React.useState(null);
	const [domainY, changeDomainY] = React.useState(null);
	const [commentsData, changeCommentsData] = React.useState(null);
	const [newComments, changeNewComments] = React.useState(null);
	const [commentTooltip, changeCommentTooltip] = React.useState(null);
	const [slidersData, changeSlidersData] = React.useState(sliders ? sliders : []);
	const [dataChart, changeDataChart] = React.useState(null);

	const offsetAxsisY = 40;

	//React useEffect
	React.useEffect(() => {
		if (JSON.stringify(data) !== JSON.stringify(dataChart)) {
			changeDataChart(data);
		}
	});

	React.useEffect(() => {
		const data = dataChart;
		if (data) {
			//clear svg chart
			if (containerChart) {
				d3.select(`${idSelector} svg`).remove();
			}

			let offsetWidth = d3.select(`${idSelector}-container`).node().scrollWidth - margin.left - margin.right;
			if (offsetWidth > width) {
				offsetWidth = width;
			}
			const offsetLeft = offsetAxsisY * (yDomain.length - 1);
			const widthChart = offsetWidth - offsetLeft;
			changeWidthChart(offsetWidth);

			const svg = d3.select(idSelector).append("svg")
				.attr("width", offsetWidth + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", `translate(${margin.left + offsetLeft}, ${margin.top})`);

			const xScale = d3.scaleTime()
				.domain(xDomain)
				.range([0, widthChart]);
			changeDomainX(xDomain);

			//Asse x
			const x = svg.append("g")
				.attr("class", "x axis")
				.attr("transform", `translate(0,${height})`)
				.call(d3.axisBottom(xScale).tickSize(-height).tickPadding(slidersActive ? 32 : 8).tickFormat(multiFormat));
			svg.selectAll('.x.axis')
				.append('line')
				.attr('x1', 0)
				.attr('x2', widthChart + 10)
				.attr('stroke', '#354e70')
				.attr('stroke-width', 2);
			svg.selectAll('.x.axis')
				.append('g')
				.attr('transform', `translate(${widthChart + 10}, -4)`)
				.append('path')
				.attr('d', 'M646.569 269.746L651.581 274.758 645.581 275.746z')
				.attr('fill', '#354e70')
				.attr('transform', 'rotate(-135 269.369 272.244)');
			const xLabelChart = svg.selectAll('.x.axis')
				.append('g')
				.attr('transform', `translate(${widthChart + 20}, 4)`)
				.append('text')
				.text(xLabel)
				.attr('width', 20)
				.attr('height', 10)
				.attr(`fill`, `#FFFFFF`)
				.attr(`font-size`, `11px`)
				.attr(`font-weight`, `600`)
				.style(`text-anchor`, `start`);
			changexAxis(x);
			changexAxisLabel(xLabelChart);
			if (slidersActive) {
				svg.selectAll('.x.axis')
					.append('g')
					.attr('class', 'create-sliderX')
					.attr("transform", 'translate(-12, 0)')
					.append('image')
					.attr('xlink:href', iconCollection['addDrag'])
					.attr('width', 24)
					.attr('height', 24);
			}
			const yScale = yDomain.map(el => {
				let domain = el.domain;
				if (domain[1] - domain[0] <= 0) {
					domain = [el.domain[0] - 1, el.domain[1] + 1]
				}
				const step = (domain[1] - domain[0]) / 5;
				const ticks = [domain[0] - step];
				let sum = domain[0] - step;
				for (let i = 0; sum < domain[1] + step; i++) {
					sum = sum + step;
					ticks.push(sum);
				}
				return {
					uom: el.uom,
					label: el.label,
					ticks: ticks,
					step: step,
					domain: [domain[0] - step, domain[1] + step],
					yScale: d3.scaleLinear()
						.domain([domain[0] - step, domain[1] + step])
						.range([height, 0])
				}
			});

			//Asse y
			let yArray = [];
			yScale.forEach((el, index) => {
				const y = svg.append("g")
					.attr('transform', `translate(${-(yScale.length - 1 - index) * offsetAxsisY}, 0)`)
					.attr("class", "y axis")
					.attr("uom", el.uom)
					.call(
						d3.axisLeft(el.yScale)
							.tickValues(el.ticks)
							.tickSize(-offsetWidth + (index * offsetAxsisY))
							.tickPadding(8)
							.tickFormat(d => Math.ceil(d.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
					);
				y.append('g')
					.attr('transform', `translate(-4, -25)`)
					.append('text')
					.text(el.label)
					.attr('width', 20)
					.attr('height', 10)
					.attr(`fill`, `#ffffff`)
					.attr(`font-size`, `11px`)
					.attr(`font-weight`, `600`)
					.style(`text-anchor`, `start`);
				y.append('line')
					.attr('y1', height)
					.attr('y2', -10)
					.attr('stroke', '#354e70')
					.attr('stroke-width', 2);
				y.append('g')
					.attr('transform', `translate(4, ${-25})`)
					.append('path')
					.attr('d', 'M646.569 269.746L651.581 274.758 645.581 275.746z')
					.attr('fill', '#354e70')
					.attr('transform', 'rotate(135 375.712 8.609)');
				yArray.push(y);
			});
			changeyAxis(yArray);
			changeDomainY(yScale.map(el => ({ uom: el.uom, label: el.label, domain: el.domain })));

			if (slidersActive) {
				svg.select('.y.axis')
					.append('g')
					.attr('class', 'create-sliderY')
					.attr("transform", `translate(${offsetWidth}, 12)`)
					.append('image')
					.attr('xlink:href', iconCollection['addDrag'])
					.attr('width', 24)
					.attr('height', 24)
					.attr("transform", `rotate(-90)`);
			}

			//Circle hover line
			svg
				.append("circle")
				.attr('class', 'circle-line')
				.style("fill", "#000000")
				.attr("stroke", "#f9f9f9")
				.attr("r", 5)
				.style("opacity", 0);

			// clip path
			svg
				.append("defs")
				.append("svg:clipPath")
				.attr("id", `${idSelector.substr(1, idSelector.length)}-clip`)
				.append("svg:rect")
				.attr("width", widthChart)
				.attr("height", height)
				.attr("x", 0)
				.attr("y", 0)
				.attr("transform", `translate(0, 0)`);

			//Background
			svg
				.append("svg:rect")
				.attr('id', 'background')
				.attr("width", widthChart)
				.attr("height", height)
				.attr("x", 0)
				.attr("y", 0)
				.style("fill", "#052232")
				.style("fill-opacity", "0.3")
				.attr("transform", `translate(0, 0)`);

			// data chart lines
			const svgData = svg.append('g').attr("clip-path", `url(${idSelector}-clip)`);
			let lines = [];

			const dotsNomina = data ? getDotsData(data, 'Nomina') : null;
			const dotsPortata = data ? getDotsData(data, 'Portata') : null;
			const dotsActualLimits = data ? getDotsData(data, 'LimitiAttuali') : null;
			const dotsLimits = data ? getDotsData(data, 'LimitiSuggeriti') : null;

			// rimuovo dato inutile
			if (!chartFiltered) {
				//data.splice(3, 1);
			}

			yDomain.forEach(el =>
				data.filter(dat => dat.uom === el.uom).map((curve, index) => {
					const color = colors ? colors(curve.uom, index) : '#FFFFFF';
					const curveName = curve.name;
					lines.push(
						svgData
							.append("path")
							.datum(curve.values) // 10. Binds data to the line
							.attr("class", "line") // Assign a class for styling
							.attr("id", `line-${curveName}`)
							.attr("d", d3.line()
								.x(d => { return xScale(d.x); })
								.y(d => { return yScale.find(el => el.uom === curve.uom).yScale(d.y); })
							)
							.attr("stroke", curve.color || color)
							.attr("fill-opacity", .3)
					);
				})
			);
			// Define the div for the tooltip
			var dotTooltip = d3.select("body").append("div")	
				.attr("class", "tooltip-dot")				
				.style("opacity", 0);

				createDots(dotsNomina, dotTooltip, yDomain, colors, svg, xScale, yScale, idSelector);
				createDots(dotsPortata, dotTooltip, yDomain, colors, svg, xScale, yScale, idSelector);
				createDots(dotsActualLimits, dotTooltip, yDomain, colors, svg, xScale, yScale, idSelector);
				createDots(dotsLimits, dotTooltip, yDomain, colors, svg, xScale, yScale, idSelector);

			changeContainerChart(svg);
			changeContainerlines(lines);
			changeContainerDotsLimits(dotsLimits);

			//Sliders XY
			const dragX_handler = d3.drag()
				.on("drag", slidersXDragged)
				.on("end", slidersXDragended);

			const dragY_handler = d3.drag()
				.on("drag", slidersYDragged)
				.on("end", slidersYDragended);

			// clip path x
			svg
				.append("defs")
				.append("svg:clipPath")
				.attr("id", `${idSelector.substr(1, idSelector.length)}-sliders-x-clip`)
				.append("svg:rect")
				.attr("width", offsetWidth - offsetLeft + 24)
				.attr("height", height + 54)
				.attr("x", -12)
				.attr("y", -32);
			const verticalSliders = sliders && sliders.filter(slide => slide.type === 'verticalSliders');
			verticalSliders && verticalSliders.forEach(slider => {
				const newSliderX = svg.append('g')
					.attr("clip-path", `url(${idSelector}-sliders-x-clip)`)
					.attr('class', 'slider x')
					.attr('id', slider.id);
				if (slidersActive) {
					newSliderX.append('g')
						.attr('class', 'image-slider')
						.attr("transform", `translate(${xScale(slider.x) - 12}, ${height})`)
						.append('image')
						.attr('xlink:href', iconCollection['drag'])
						.attr('width', 24)
						.attr('height', 24);
				}
				const text = newSliderX.append('g').attr('class', 'text-slider').attr('transform', `translate(${xScale(slider.x) - 12}, 0)`)
				text
					.append(`text`)
					.attr("transform", `translate(12, -10)`)
					.text(slider.name);
				newSliderX.append('g')
					.attr("clip-path", `url(${idSelector}-clip)`)
					.append("path")
					.datum([{ x: slider.x, y: yScale[0].yScale.invert(0) }, { x: slider.x, y: yScale[0].yScale.invert(height) }])
					.attr("d", d3.line()
						.x(d => { return xScale(d.x); })
						.y(d => { return yScale[0].yScale(d.y); })
					)
					.attr("stroke", '#ffffff')
					.attr("fill-opacity", 1);
				if (slidersActive) { dragX_handler(newSliderX); }
			});

			// clip path y
			svg
				.append("defs")
				.append("svg:clipPath")
				.attr("id", `${idSelector.substr(1, idSelector.length)}-sliders-y-clip`)
				.append("svg:rect")
				.attr("width", offsetWidth + 24)
				.attr("height", height + 24)
				.attr("x", 0)
				.attr("y", -12);
			const horizontalSliders = sliders && sliders.filter(slide => slide.type === 'horizontalSlider');
			horizontalSliders && horizontalSliders.forEach(slider => {
				const newSliderY = svg.append('g')
					.attr("clip-path", `url(${idSelector}-sliders-y-clip)`)
					.attr('class', 'slider y')
					.attr('id', slider.id);
				newSliderY.append('g')
					.attr("transform", `translate(${widthChart}, ${yScale[0].yScale(slider.y) + 12})`)
					.append('image')
					.attr('xlink:href', iconCollection['drag'])
					.attr('width', 24)
					.attr('height', 24)
					.attr("transform", `rotate(-90)`);
				newSliderY.append('g')
					.attr("clip-path", `url(${idSelector}-clip)`)
					.append("path")
					.datum([{ x: xDomain[0], y: slider.y }, { x: xDomain[1], y: slider.y }])
					.attr("d", d3.line()
						.x(d => { return xScale(d.x); })
						.y(d => { return yScale[0].yScale(d.y); })
					)
					.attr("stroke", '#ffffff')
					.attr("fill-opacity", 1);
				if (slidersActive) { dragY_handler(d3.selectAll('.slider.y')); }
			});
		}
		// eslint-disable-next-line
	}, [dataChart, xDomain, yDomain]);

	React.useEffect(() => {
		if (containerChart) {
			const svg = containerChart;
			//Sliders XY
			const dragX_handler = d3.drag()
				.on("drag", slidersXDragged)
				.on("end", slidersXDragended);

			const dragY_handler = d3.drag()
				.on("drag", slidersYDragged)
				.on("end", slidersYDragended);

			if (JSON.stringify(sliders) !== JSON.stringify(slidersData)) {
				onSaveSliders(slidersData);
				if (slidersActive) {
					dragX_handler(d3.selectAll('.slider.x'));
					dragY_handler(d3.selectAll('.slider.y'));
				}
			}

			if (slidersActive) {
				const iconSliderX = svg.selectAll('.x.axis g.create-sliderX')
				iconSliderX.on('click', () => createSliderX(svg));
			}

			if (slidersActive) {
				const iconSliderY = svg.selectAll('.y.axis g.create-sliderY')
				iconSliderY.on('click', () => createSliderY(svg));
			}

		}
	}, [slidersData, containerChart, domainX, domainY]);

	const createSliderX = () => {
		if (slidersData.length < limitSlider) {

			// d3.select('.create-sliderX image')
			// 	.on("mousemove", null);

			const svg = containerChart;
			const offsetLeft = offsetAxsisY * (domainY.length - 1);

			const xScale = d3.scaleTime()
				.domain(domainX)
				.range([0, widthChart - offsetLeft]);

			const yScale = d3.scaleLinear()
				.domain(domainY[0].domain)
				.range([height, 0]);

			const dragX_handler = d3.drag()
				.on("drag", slidersXDragged)
				.on("end", slidersXDragended);

			const newSliderX = svg.append('g')
				.attr("clip-path", `url(${idSelector}-sliders-x-clip)`)
				.attr('class', 'slider x')
				.attr('id', `t-${new Date().getTime()}`);
			newSliderX.append('g')
				.attr('class', 'image-slider')
				.attr("transform", `translate(-12, ${height})`)
				.append('image')
				.attr('xlink:href', iconCollection['drag'])
				.attr('width', 24)
				.attr('height', 24);
			const text = newSliderX.append('g').attr('class', 'text-slider').attr('transform', `translate(-12, 0)`)
			text
				.append(`text`)
				.attr("transform", `translate(12, -10)`)
				.text(`t${slidersData.filter(el => el.type === 'verticalSliders').length}`);
			newSliderX.append('g')
				.attr("clip-path", `url(${idSelector}-clip)`)
				.append("path")
				.datum([{ x: domainX[0], y: yScale.invert(0) }, { x: domainX[0], y: yScale.invert(height) }])
				.attr("d", d3.line()
					.x(d => { return xScale(d.x); })
					.y(d => { return yScale(d.y); })
				)
				.attr("stroke", '#ffffff')
				.attr("fill-opacity", 1);
			dragX_handler(newSliderX);
		}
	}

	function slidersXDragged(d) {
		const offsetLeft = offsetAxsisY * (domainY.length - 1);

		const xScale = d3.scaleTime()
			.domain(domainX)
			.range([0, widthChart - offsetLeft]);

		const domainYScale = yDomain.map(el => {
			let domain = el.domain;
			if (domain[1] - domain[0] <= 0) {
				domain = [el.domain[0] - 1, el.domain[1] + 1]
			}
			const step = (domain[1] - domain[0]) / 5;
			const ticks = [domain[0] - step];
			let sum = domain[0] - step;
			for (let i = 0; sum < domain[1] + step; i++) {
				sum = sum + step;
				ticks.push(sum);
			}
			return {
				uom: el.uom,
				label: el.label,
				ticks: ticks,
				step: step,
				domain: [domain[0] - step, domain[1] + step],
				yScale: d3.scaleLinear()
					.domain([domain[0] - step, domain[1] + step])
					.range([height, 0])
			}
		});

		const yScale = d3.scaleLinear()
			.domain(domainYScale[0].domain)
			.range([height, 0]);

		if (xScale.invert(d3.event.x) > domainX[1]) {
			d3.select(this).select('g.image-slider').attr('transform', `translate(${xScale(domainX[1]) - 12}, ${height})`);
			d3.select(this).select('g.text-slider').attr('transform', `translate(${xScale(domainX[1]) - 12}, 0)`);
			d3.select(this).select('path')
				.datum([{ x: domainX[1], y: yScale.invert(0) }, { x: domainX[1], y: yScale.invert(height) }]) // 10. Binds data to the line
				.attr("d", d3.line()
					.x(function (d) { return xScale(d.x); })
					.y(function (d) { return yScale(d.y); })
				);
		} else {
			d3.select(this).select('g.image-slider').attr('transform', `translate(${d3.event.x - 12}, ${height})`);
			d3.select(this).select('g.text-slider').attr('transform', `translate(${d3.event.x - 12}, 0)`);
			d3.select(this).select('path')
				.datum([{ x: xScale.invert(d3.event.x), y: yScale.invert(0) }, { x: xScale.invert(d3.event.x), y: yScale.invert(height) }]) // 10. Binds data to the line
				.attr("d", d3.line()
					.x(function (d) { return xScale(d.x); })
					.y(function (d) { return yScale(d.y); })
				);
		}
	}

	const compare = (st1, st2) => {
		if (st1.x < st2.x)
			return -1;
		if (st1.x > st2.x)
			return 1;
		return 0;
	}

	function slidersXDragended(d) {
		let newSlidersX = [...slidersData.filter(el => el.type === 'verticalSliders')];
		const slidersY = [...slidersData.filter(el => el.type === 'horizontalSlider')];
		const offsetLeft = offsetAxsisY * (domainY.length - 1);
		const xScale = d3.scaleTime()
			.domain(domainX)
			.range([0, widthChart - offsetLeft]);
		if (xScale.invert(d3.event.x) > xDomain[1]) {
			let objSlider = {};
			objSlider['id'] = d3.select(this).attr('id');
			objSlider['type'] = 'verticalSliders';
			objSlider['x'] = xDomain[1].getTime();
			const indexSlider = slidersData.findIndex(el => el.id === objSlider.id);
			if (indexSlider >= 0) {
				newSlidersX[indexSlider] = objSlider;
			} else {
				newSlidersX.push(objSlider);
			}
		} else {
			if (d3.event.x <= (-10 + ((domainY.length - 1) * offsetAxsisY))) {
				const indexDeleteElem = newSlidersX.findIndex(el => el.id === d3.select(this).attr('id'));
				if (indexDeleteElem >= 0) {
					newSlidersX = newSlidersX.filter(el => el.id !== d3.select(this).attr('id'));
					d3.select(this).remove();
				}
			} else {
				let objSlider = {};
				objSlider['id'] = d3.select(this).attr('id');
				objSlider['type'] = 'verticalSliders';
				objSlider['x'] = xScale.invert(d3.event.x).getTime();
				const indexSlider = slidersData.findIndex(el => el.id === objSlider.id);
				if (indexSlider >= 0) {
					newSlidersX[indexSlider] = objSlider;
				} else {
					newSlidersX.push(objSlider);
				}
			}
		}

		const slidersSort = newSlidersX.sort(compare);
		d3.selectAll('.slider.x').each(function (d) {
			const index = slidersSort.findIndex(el => el.id === d3.select(this).attr('id'));
			d3.select(this).select('.text-slider text').text(`t${index}`);
		});
		slidersSort.map((el, index) => el.name = `t${index}`);
		changeSlidersData([...slidersSort, ...slidersY]);
	}

	const createSliderY = () => {
		const svg = containerChart;
		const offsetLeft = offsetAxsisY * (domainY.length - 1);
		const width = widthChart - offsetLeft;

		const xScale = d3.scaleTime()
			.domain(xDomain)
			.range([0, width]);

		const yScale = d3.scaleLinear()
			.domain(domainY[0].domain)
			.range([height, 0])

		const dragY_handler = d3.drag()
			.on("drag", slidersYDragged)
			.on("end", slidersYDragended);

		const newID = new Date().getTime();
		const newSliderY = svg.append('g')
			.attr("clip-path", `url(${idSelector}-sliders-y-clip)`)
			.attr('class', 'slider y')
			.attr('id', newID);
		newSliderY.append('g')
			.attr("transform", `translate(${width}, 12)`)
			.append('image')
			.attr('xlink:href', iconCollection['drag'])
			.attr('width', 24)
			.attr('height', 24)
			.attr("transform", `rotate(-90)`);
		newSliderY.append('g')
			.attr("clip-path", `url(${idSelector}-clip)`)
			.append("path")
			.datum([{ x: xDomain[0], y: yScale.invert(0) }, { x: xDomain[1], y: yScale.invert(0) }])
			.attr("d", d3.line()
				.x(d => { return xScale(d.x); })
				.y(d => { return yScale(d.y); })
			)
			.attr("stroke", '#ffffff')
			.attr("fill-opacity", 1);
		dragY_handler(d3.selectAll('.slider.y'));
	}

	function slidersYDragged(d) {
		const offsetLeft = offsetAxsisY * (domainY.length - 1);
		const width = widthChart - offsetLeft;

		const xScale = d3.scaleTime()
			.domain(xDomain)
			.range([0, width]);

		const yScale = d3.scaleLinear()
			.domain(domainY[0].domain)
			.range([height, 0])

		if (yScale.invert(d3.event.y) < domainY[0].domain[0]) {
			d3.select(this).select('g').attr('transform', `translate(${width}, ${height + 12})`);
			d3.select(this).select('path')
				.datum([{ x: xDomain[0], y: domainY[0].domain[0] }, { x: xDomain[1], y: domainY[0].domain[0] }]) // 10. Binds data to the line
				.attr("d", d3.line()
					.x(function (d) { return xScale(d.x); })
					.y(function (d) { return yScale(d.y); })
				);
		} else {
			d3.select(this).select('g').attr('transform', `translate(${width}, ${d3.event.y})`);
			d3.select(this).select('path')
				.datum([{ x: xDomain[0], y: yScale.invert(d3.event.y - 12) }, { x: xDomain[1], y: yScale.invert(d3.event.y - 12) }]) // 10. Binds data to the line
				.attr("d", d3.line()
					.x(function (d) { return xScale(d.x); })
					.y(function (d) { return yScale(d.y); })
				);
		}
	}

	function slidersYDragended(d) {
		let newSliders = [...slidersData];
		const yScale = d3.scaleLinear()
			.domain(domainY[0].domain)
			.range([height, 0])

		if (yScale.invert(d3.event.y) < domainY[0].domain[0]) {
			let objSlider = {};
			objSlider['id'] = Number(d3.select(this).attr('id'));
			objSlider['type'] = 'horizontalSlider';
			objSlider['y'] = height + 12;
			const indexSlider = slidersData.findIndex(el => el.id === objSlider.id);
			if (indexSlider >= 0) {
				newSliders[indexSlider] = objSlider;
			} else {
				newSliders.push(objSlider);
			}
		} else {
			if (d3.event.y <= -10) {
				newSliders = newSliders.filter(el => el.id !== Number(d3.select(this).attr('id')));
				d3.select(this).remove();
			} else {
				let objSlider = {};
				objSlider['id'] = Number(d3.select(this).attr('id'));
				objSlider['type'] = 'horizontalSlider';
				objSlider['y'] = yScale.invert(d3.event.y - 12);
				const indexSlider = slidersData.findIndex(el => el.id === objSlider.id);
				if (indexSlider >= 0) {
					newSliders[indexSlider] = objSlider;
				} else {
					newSliders.push(objSlider);
				}
			}
		}


		changeSlidersData(newSliders);
	}

	React.useEffect(() => {
		if (xAxisLabel) {
			xAxisLabel.text(xLabel)
		}
	}, [xLabel, xAxisLabel]);

	React.useEffect(() => {
		if (comments && domainX && domainY) {
			const xScale = d3.scaleTime()
				.domain(domainX)
				.range([0, widthChart]);

			const yScale = d3.scaleLinear()
				.domain(domainY[0].domain)
				.range([height, 0]);

			const scaleComments = [...comments];
			scaleComments.map(comment => {
				comment.x = xScale(comment.x0);
				comment.y = yScale(comment.y0);
				return comment;
			});
			changeCommentsData(scaleComments);
			const group = d3.selectAll('.comments-chart-item');
			var drag_handler = d3.drag()
				.on("drag", commentsDragged)
				.on("end", commentsDragended);
			drag_handler(group);
		}
	}, [comments, domainX, domainY]);

	React.useEffect(() => {
		if (containerChart) {
			const createComment = d3.select(`${idSelector} .container-create-comment`);
			const commentsChart = d3.select(`${idSelector} .comments-chart-cartesian`);
			if (commentsChart.node()) {
				if (commentsActive) {
					containerChart.select('#background').attr('stroke', '#33a7df').attr('stroke-width', '2px');
					commentsChart.style('display', 'block');
					createComment.style('display', 'block');
					createComment.on("click", createComments);
				} else {
					if (containerChart.select('#background') && !zoomActive) {
						containerChart.select('#background').attr('stroke', null).attr('stroke-width', null);
					}
					commentsChart.style('display', 'none');
					createComment.style('display', 'none');
					changeNewComments(null);
				}
			}
		}
		// eslint-disable-next-line
	}, [containerChart, commentsActive]);

	function createComments() {
		if (d3.select(this).node().className === 'container-create-comment') {
			const xScale = d3.scaleTime()
				.domain(domainX)
				.range([0, widthChart]);

			const yScale = d3.scaleLinear()
				.domain(domainY[0].domain)
				.range([height, 0]);

			changeNewComments({
				id: commentsData ? `comment-${commentsData.length + 1}` : 'comment-1',
				comment: '',
				x: d3.event.offsetX - 12,
				y: d3.event.offsetY - 24,
				x0: xScale.invert(d3.event.offsetX - 12).getTime(),
				y0: yScale.invert(d3.event.offsetY - 24)
			})
		}
	}

	function commentsDragged(d) {
		const xScale = d3.scaleTime()
			.domain(domainX)
			.range([0, widthChart]);

		const yScale = d3.scaleLinear()
			.domain(domainY[0].domain)
			.range([height, 0]);

		if ((d3.event.x >= xScale(domainX[0])) && (d3.event.x <= xScale(domainX[1]) - 20)) d3.select(this).style("left", `${d3.event.x}px`);
		if ((d3.event.y >= yScale(domainY[0].domain[1])) && (d3.event.y <= yScale(domainY[0].domain[0]) - 20)) d3.select(this).style("top", `${d3.event.y}px`);
	}

	function commentsDragended(d) {
		const idComment = d3.select(this).attr('id');
		let comments = [...commentsData];

		const xScale = d3.scaleTime()
			.domain(domainX)
			.range([0, widthChart]);

		const yScale = d3.scaleLinear()
			.domain(domainY[0].domain)
			.range([height, 0]);

		const index = commentsData.findIndex(el => el.id === idComment);
		if (index >= 0 && ((d3.event.x >= xScale(domainX[0])) && (d3.event.x <= xScale(domainX[1]) - 20) && (d3.event.y >= yScale(domainY[0].domain[1])) && (d3.event.y <= yScale(domainY[0].domain[0]) - 20))) {
			comments[index].x = d3.event.x;
			comments[index].y = d3.event.y;
			comments[index].x0 = xScale.invert(d3.event.x).getTime();
			comments[index].y0 = yScale.invert(d3.event.y);
			changeCommentsData(comments);
		}
	}

	React.useEffect(() => {
		if (containerChart) {
			if (zoomActive) {
				containerChart.select('#background').attr('stroke', '#33a7df').attr('stroke-width', '2px');

				const brush = d3
					.brush() // Add the brush feature using the d3.brush function
					.extent([[0, 0], [widthChart, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
					.on("end", () => updateChart()); // Each time the brush selection changes, trigger the 'updateChart' function

				// Add the brushing panel
				const child = containerChart
					.append("g")
					.attr("class", "brush")
					.call(brush);
				changeContainBrush(child);

				// A function that set idleTimeOut to null
				let idleTimeout;

				const offsetLeft = offsetAxsisY * (domainY.length - 1);

				const xScale = d3.scaleTime()
					.domain(domainX)
					.range([0, widthChart - offsetLeft]);

				let yScale = yDomain.map(el => {
					let domain = el.domain;
					if (domain[1] - domain[0] <= 0) {
						domain = [el.domain[0] - 1, el.domain[1] + 1]
					}
					const step = (domain[1] - domain[0]) / 5;
					const ticks = [domain[0] - step];
					let sum = domain[0] - step;
					for (let i = 0; sum < domain[1] + step; i++) {
						sum = sum + step;
						ticks.push(sum);
					}
					return {
						uom: el.uom,
						label: el.label,
						ticks: ticks,
						step: step,
						domain: [domain[0] - step, domain[1] + step],
						yScale: d3.scaleLinear()
							.domain([domain[0] - step, domain[1] + step])
							.range([height, 0])
					}
				});

				const updateChart = () => {
					let extent = d3.event.selection;
					// If no selection, back to initial coordinate. Otherwise, update X axis domain
					if (!extent) {
						if (!idleTimeout) return (idleTimeout = setTimeout(() => {
							idleTimeout = null;
						}, 350)); // This allows to wait a little bit

						xScale.domain(xDomain);

						yScale = yDomain.map(el => {
							let domain = el.domain;
							if (domain[1] - domain[0] <= 0) {
								domain = [el.domain[0] - 1, el.domain[1] + 1]
							}
							const step = (domain[1] - domain[0]) / 5;
							const ticks = [domain[0] - step];
							let sum = domain[0] - step;
							for (let i = 0; sum < domain[1] + step; i++) {
								sum = sum + step;
								ticks.push(sum);
							}
							return {
								uom: el.uom,
								label: el.label,
								ticks: ticks,
								step: step,
								domain: [domain[0] - step, domain[1] + step],
								yScale: d3.scaleLinear()
									.domain([domain[0] - step, domain[1] + step])
									.range([height, 0])
							}
						});

					} else {
						xScale.domain([xScale.invert(extent[0][0]), xScale.invert(extent[1][0])]);
						
						yScale.forEach(el => {
							el.domain = [el.yScale.invert(extent[1][1]), el.yScale.invert(extent[0][1])];
							const step = (el.domain[1] - el.domain[0]) / 5;
							const ticks = [];
							let sum = el.domain[0];
							for (let i = 0; sum < el.domain[1] + step; i++) {
								sum = sum + step;
								ticks.push(sum);
							}
							el.yScale.domain(([el.yScale.invert(extent[1][1]), el.yScale.invert(extent[0][1])]));
							el.ticks = ticks;
						})
						containerChart.select(".brush").call(brush.move, null); // This remove the grey brush area as soon as the selection has been done
					}
					changeDomainX(xScale.domain());
					changeDomainY(yScale.map(el => ({ uom: el.uom, label: el.label, domain: el.domain })));

					// Update axis
					xAxis
						.transition()
						.duration(1000)
						.call(d3.axisBottom(xScale).tickSize(-height, 0, 0).tickPadding(slidersActive ? 32 : 8).tickFormat(multiFormat));
					changexAxis(xAxis);

					const newYAxis = [];
					yAxis.map(y => {
						const uom = y.attr('uom');
						const scale = yScale.find(el => el.uom === uom);
						const index = yScale.findIndex(el => el.uom === uom)
						y
							.transition()
							.duration(1000)
							.call(d3.axisLeft(scale.yScale).tickValues(scale.ticks).tickSize(-widthChart + (index * offsetAxsisY)).tickPadding(8)
							.tickFormat(d => Math.ceil(d.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")));
						newYAxis.push(y);
					})
					changeyAxis(newYAxis);

					// data chart lines
					containerlines.forEach(line => {
						//const uom = line.attr('id').split('_')[2];
						const uom = yDomain[0].uom;
						const currentYscale = yScale.find(el => el.uom === uom).yScale;
						switch (line.attr("class")) {
							case 'hover-area': {
								line
									.transition()
									.duration(1000)
									.attr("d", d3.area()
										.x(d => { return xScale(d.x) })
										.y0(height)
										.y1(d => { return currentYscale(d.y); })
									);
								break;
							}
							case 'line-hover': {
								const curveName = line.attr('id').split('-')[2];
								line
									.transition()
									.duration(1000)
									.attr("d", d3.line()
										.x(d => { return xScale(d.x) })
										.y(d => { return currentYscale(d.y); })
									)
								line.on("mousemove", () => {
									if (onHover) {
										d3.selectAll(`${idSelector} .line`).attr('stroke-opacity', .3);
										d3.event.currentTarget.setAttribute('stroke-opacity', 1);
										d3.select(`#hover-area-${curveName}`).attr('fill-opacity', .3)
									}
									const x0 = xScale.invert(d3.mouse(d3.event.currentTarget)[0]);
									const y0 = currentYscale.invert(d3.mouse(d3.event.currentTarget)[1]);
									let htmlPopover = `
										<p class="title">${findTooltipLabel(curveName.split('_')[1])}</p>
										<p><span class="axis">t:</span> ${multiFormat(x0)}</p>
										<p><span class="axis">Y:</span> ${y0.toFixed(2)} ${yScale.uom || ''}</p>
									`;
									d3
										.select(`${idSelector} .tooltip-chart-cartesian`)
										.html(htmlPopover)
										.style("left", `${d3.event.offsetX}px`)
										.style("top", `${d3.event.offsetY - 16}px`)
										.style("opacity", 1);
									d3
										.select(`${idSelector} .circle-line`)
										.attr("cx", xScale(x0))
										.attr("cy", currentYscale(y0))
										.style("stroke", colors(curveName.split('_')[2]))
										.style("opacity", 1);
								})
									.on("mouseout", () => {
										if (onHover) {
											d3.selectAll(`${idSelector} .line`).attr('stroke-opacity', 1);
											d3.select(`#hover-area-${curveName}`).attr('fill-opacity', 0)
										}
										d3
											.select(`${idSelector} .tooltip-chart-cartesian`)
											.style("opacity", 0);
										d3
											.select(`${idSelector} .circle-line`)
											.style("opacity", 0);
									});
								break;
							}
							default: {
								line
									.transition()
									.duration(1000)
									.attr(
										"d", d3.line()
											.x(function (d) { return xScale(d.x); })
											.y(function (d) { return currentYscale(d.y) })
									);
								break;
							}
						}
					});

					//ScaleY Slider 
					const scaleYSlieders = yScale[0].yScale;

					//Zoom slider Y
					containerChart.selectAll('.slider.y').each(function (d) {
						let string = d3.select(this).select('g').attr('transform');
						let translate = string.substring(string.indexOf("(") + 1, string.indexOf(")")).split(",");
						let ySlider = translate[1];
						d3.select(this).select('path')
							.transition()
							.duration(1000)
							.attr(
								"d",
								d3
									.line()
									.x(function (d) { return xScale(d.x); })
									.y(function (d) {
										ySlider = scaleYSlieders(d.y);
										return scaleYSlieders(d.y);
									})
							);
						d3.select(this).select('g')
							.transition()
							.duration(1000)
							.attr('transform', `translate(${translate[0]}, ${ySlider + 12})`);
					});

					//Zoom Dots

					containerChart.selectAll(".dotLimits")
						.transition()
						.duration(1000)
						.attr("cx", d => { return xScale(d.x); } )
						.attr("cy", d => scaleYSlieders(d.y) )
					
					containerChart.selectAll(".dotNomina")
						.transition()
						.duration(1000)
						.attr("cx", d => { return xScale(d.x); } )
						.attr("cy", d => scaleYSlieders(d.y) )

					containerChart.selectAll(".dotPortata")
						.transition()
						.duration(1000)
						.attr("cx", d => { return xScale(d.x); } )
						.attr("cy", d => scaleYSlieders(d.y) )

					containerChart.selectAll(".dotActualLimits")
						.transition()
						.duration(1000)
						.attr("cx", d => { return xScale(d.x); } )
						.attr("cy", d => scaleYSlieders(d.y) )

					//Zoom slider X
					containerChart.selectAll('.slider.x').each(function (d) {
						let string = d3.select(this).select('g').attr('transform');
						let translate = string.substring(string.indexOf("(") + 1, string.indexOf(")")).split(",");
						let xSlider = translate[0];
						d3.select(this).select('path')
							.transition()
							.duration(1000)
							.attr(
								"d",
								d3
									.line()
									.x(function (d) {
										xSlider = xScale(d.x);
										return xScale(d.x);
									})
									.y(function (d) { return scaleYSlieders(d.y); })
							);
						d3.select(this).select('g.image-slider')
							.transition()
							.duration(1000)
							.attr('transform', `translate(${xSlider - 12}, ${translate[1]})`);
						d3.select(this).select('g.text-slider')
							.transition()
							.duration(1000)
							.attr('transform', `translate(${xSlider - 12}, 0)`);
					});

					//Zoom comments
					if (commentsData) {
						let scaleComments = [...commentsData];
						scaleComments = scaleComments.map(comment => {
							comment.x = xScale(comment.x0);
							comment.y = scaleYSlieders(comment.y0);
							return comment;
						});
						changeCommentsData(scaleComments);
					}
				}

			} else {
				containBrush.remove();
				if (containerChart.select('#background') && !commentsActive) containerChart.select('#background').attr('stroke', null).attr('stroke-width', null);
			}
		}
		// eslint-disable-next-line
	}, [zoomActive]);

	const comment = newComments && { ...newComments };
	let mode = null;
	if (zoomActive) {
		mode = 'Modalità zoom area attiva';
	}
	if (commentsActive) {
		mode = 'Modalità commenti attiva'
	}

	return (
		<Cartesian id={`${idSelector.substr(1, idSelector.length)}-container`}>
			<div className="container-svg" id={idSelector.substr(1, idSelector.length)}>
				<div className="tooltip-chart-cartesian" style={{ opacity: 0 }} />
				{loading && <Loading type={'component'} />}
				{mode &&
					<div className="title-mode">
						{mode}
						<button className="cancel margin-left-10" onClick={() => {
							onChangeZoomActive();
							onChangecommentsActive();
						}} />
					</div>
				}
				{comment &&
					<React.Fragment>
						<Layer onClick={() => changeNewComments(null)} />
						<div className="tooltip-create-comments" style={{ left: `${comment.x + margin.left + 30}px`, top: `${comment.y + margin.top}px` }}>
							<div className="dflex">
								<Input
									type="text"
									className="margin-bottom-10"
									placeholder="Scrivi qualcosa"
									onChange={e => comment.comment = e.target.value}
								/>
							</div>
							<Button text={'Salva'} action={() => {
								let newComments = [];
								if (commentsData) {
									newComments = [...commentsData, ...[comment]]
								} else {
									newComments = [comment]
								}
								changeCommentsData(newComments);
								onSaveComments(newComments);
								changeNewComments(null);
							}} />
						</div>
					</React.Fragment>
				}
				{commentTooltip &&
					<React.Fragment>
						<Layer onClick={() => changeCommentTooltip(null)} />
						<div
							className="tooltip-chart-comments"
							style={{ left: `${commentTooltip.x + margin.left + 12}px`, top: `${commentTooltip.y}px` }}
						>
							<p>{commentTooltip.comment}</p>
							<ButtonLink
								text={'Elimina Nota'}
								icon={'delete'}
								action={() => {
									let comments = [...commentsData];
									comments = comments.filter(el => el.id !== commentTooltip.id);
									comments.map((el, index) => el.id = `comment-${index + 1}`);
									onSaveComments(comments.length > 0 ? comments : null);
									changeCommentsData(comments.length > 0 ? comments : null);
									changeCommentTooltip(null);
								}}
							/>
						</div>
					</React.Fragment>
				}
				<div
					className="container-create-comment"
					style={{ marginTop: margin.top > 0 ? margin.top : 32, marginLeft: margin.left, marginRight: margin.right, marginBottom: margin.bottom }}
				/>
				<div
					className="comments-chart-cartesian"
					style={{ marginTop: margin.top > 0 ? margin.top : 32, marginLeft: margin.left, marginRight: margin.right, marginBottom: margin.bottom }}
				>
					{commentsData && commentsData.map(el =>
						(
							<div
								className="comments-chart-item"
								id={el.id}
								style={{ left: `${el.x}px`, top: `${el.y}px` }}
								onClick={() => changeCommentTooltip(el)}>
								<Icon
									size={27}
									iconKey={'commentiIcon'}
									iconHover={'commentiIconHover'}
								/>
							</div>
						))}
					{comment &&
						<div className="comments-chart-item" style={{ left: `${comment.x}px`, top: `${comment.y}px` }}>
							<Icon
								size={27}
								iconKey={'commentiIcon'}
								iconHover={'commentiIconHover'}
							/>
						</div>
					}
				</div>
			</div>
		</Cartesian>
	);
}


CartesianUITrends.propTypes = {
	idSelector: PropTypes.string,
	data: PropTypes.array,
	xDomain: PropTypes.array,
	yDomain: PropTypes.array,
	xWorkPoint: PropTypes.string,
	yWorkPoint: PropTypes.string,
	margin: PropTypes.object,
	height: PropTypes.number,
	xLabel: PropTypes.string,
	onHover: PropTypes.bool,
	xUnit: PropTypes.string,
	colors: PropTypes.func,
	zoomActive: PropTypes.bool,
	comments: PropTypes.array,
	onChangeZoomActive: PropTypes.func,
	onChangecommentsActive: PropTypes.func,
	onSaveComments: PropTypes.func,
	onSaveSliders: PropTypes.func,
	findTooltipLabel: PropTypes.func,
	slidersActive: PropTypes.bool,
	sliders: PropTypes.array,
	limitSlider: PropTypes.number
};

CartesianUITrends.defaultProps = {
	idSelector: 'chart',
	data: null,
	xDomain: null,
	yDomain: [{ uom: '-', label: '-', domain: [0, 10] }],
	xWorkPoint: null,
	yWorkPoint: null,
	margin: { top: 30, right: 35, bottom: 20, left: 20 },
	height: 400,
	xLabel: '',
	onHover: false,
	xUnit: null,
	colors: null,
	zoomActive: false,
	comments: null,
	onChangeZoomActive: () => { },
	onChangecommentsActive: () => { },
	onSaveComments: () => { },
	onSaveSliders: () => { },
	findTooltipLabel: () => { },
	slidersActive: false,
	sliders: null,
	limitSlider: 10
};

export default CartesianUITrends;