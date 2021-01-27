import iconCollection from "../base/Icon/svg";
import * as d3 from 'd3';

/**
 * Set of colors used inUI
 */
export const Colors = {
	hawkesBlue: "#EEF0F8",
	mischka: "#AAAEBD",
	fiord: "#515569",
	manatee: "#8B8FA4",
	linkWater: "#C5C8D8",
	tangaroa: "#101426",
	white: "#FFF",
	black: "#000",
	mabel: "#C9E7E5",
	cobalt: "#004C97",
	malibu: "#62B5E5",
	neonBlue: "#3766FF",
	regalBlue: "#1F4368",
	persianBlue: "#1A4C97",
	egyptianBlue: "#16438B",
	smalt: "#00438C",
	whiteIce: "#E0F3F2",
	amaranth: "#f04450",
	red: "#ef3340",
	greyChateau: "#97999B",
	blueWhale: "#132237",
	oysterBay: "#D8E3EA",
	prussianBlue: "#00447A",
	pigmentGreen: "#009A44",
	eastBay: "#4F556D",
	jade: "#00bc62",
	dimGray: "#717171",
	slateGrey: "#71768c",
	freeSpeechRed: '#a80e02',
	mulledWine: '#4e4d4f',
	bourbon: '#BA6740',
	jambalaya: '#654435',
	matisse: '#385C80',
	midnight: '#223045',
	scarpaFlow: '#656266',
	spunPearl: '#9F9CA1',
	whiteLilac: '#D9D8DA',
	zircon: '#F3F4F4',
	monsoon: '#807B80',
	persianRed: '#d73530',
	mediumSeaGreen: '#42b86b'
};

/**
 * Set of functions to use basic method of D3 js
 */
export const UtilsChart = {
	/**
	 * Function to draw a rect with d3
	 * @param {*} svg container where draw the figure
	 * @param {*} w width of the figure (without px)
	 * @param {*} h height of the figure (without px)
	 * @param {*} fill background color of the figure
	 * @param {*} x (optionally)[0] coordinate in the container (without px)
	 * @param {*} y (optionally)[0] coordinate in the container (without px)
	 * @param {*} bor_c (optionally)[0] border color of the figure 
	 * @param {*} bor_w (optionally)[0] border width of the figure 
	 * @param {*} bor_r (optionally)[0] border radius of the figure
	 * @param {*} c (optionally)[''] class or classes added to the figure
	 * @param {*} md (optionally)[''] add a value to data-reference-label attribute
	 */
	drawRect: ({ svg, w = 0, h = 0, fill, x = 0, y = 0, bor_c = 0, bor_w = 0, bor_r = 0, c = '', md = '', rot = 0, dasharray = 'none' }) => {
		const r = svg
			.append(`rect`)
			.attr(`x`, `${x}px`)
			.attr(`y`, `${y}px`)
			.attr(`width`, `${w}px`)
			.attr(`height`, `${h}px`)
			.attr(`fill`, `${fill}`)
			.attr(`stroke`, `${bor_c}`)
			.attr(`stroke-width`, `${bor_w}`)
			.attr(`rx`, `${bor_r}`)
			.attr(`ry`, `${bor_r}`)
			.attr(`class`, `${c}`)
			.attr(`transform`, `rotate(${rot})`)
			.attr('stroke-dasharray', dasharray);
		if (md !== '')
			r.attr(`data-reference-label`, `${md}`);
		return r;
	},
	/**
	 * Function to draw a simple Text with d3
	 * @param {*} svg container where draw the figure
	 * @param {*} x (optionally)[0] coordinate in the container (without px)
	 * @param {*} y (optionally)[0] coordinate in the container (without px)
	 * @param {*} w width of the figure (without px)
	 * @param {*} h height of the figure (without px)
	 * @param {*} fill background color of the figure
	 * @param {*} text value of the text inserted  
	 * @param {*} f_size font size of the text
	 * @param {*} f_weight fornt weight of the text
	 * @param {*} f_space letter spacing in the text
	 * @param {*} align (optionally)[middle] text ancor, can be: middle, start, end
	 * @param {*} rotate (optionally)[0] rotation of the label that contain the text
	 */
	drawText: ({ svg, x = 0, y = 0, w = 0, h = 0, fill, fillOpacity = 1, text, f_size = '.7em', f_weight = 500, f_space, align = 'middle', rotate = 0, f_style = 'normal', md = '', c = '', tagUi }) => {
		const t = svg
			.append(`text`)
			.text(`${text}`)
			.attr(`x`, `${x}px`)
			.attr(`y`, `${y}px`)
			.attr(`width`, `${w}px`)
			.attr(`height`, `${h}px`)
			.attr(`fill`, `${fill}`)
			.attr('fill-opacity', fillOpacity)
			.attr(`font-size`, `${f_size}`)
			.attr(`font-weight`, `${f_weight}`)
			.style(`text-anchor`, `${align}`)
			.attr(`letter-spacing`, `${f_space}`)
			.attr(`transform`, `rotate(${rotate})`)
			.attr(`font-style`, f_style)
			.attr('class', c);
		if (md !== '') {
			t.attr(`data-reference-label`, `${md}`);
		}
		if (tagUi !== '') {
			t.attr(`data-tag-ui`, `${tagUi}`);
		}
		return t;
	},
	/**
	 * Function to draw a complex Path with d3
	 * @param {*} svg container where draw the figure
	 * @param {*} path string contain the path of svg
	 * @param {*} fill background color of the figure
	 * @param {*} bor_c (optionally)[0] border color of the figure 
	 * @param {*} bor_w (optionally)[0] border width of the figure 
	 * @param {*} c (optionally)[''] class or classes added to the figure
	 */
	drawPath: ({ container, fill, path, c = '', bor_c = 0, bor_w = 0 }) => {
		return container
			.append(`path`)
			.attr(`d`, path)
			.attr(`fill`, `${fill}`)
			.attr(`class`, `${c}`)
			.attr(`stroke`, `${bor_c}`)
			.attr(`stroke-width`, `${bor_w}`);
	},
	/**
	 * Function to draw a Line between 2 points with d3
	 * @param {*} svg container where draw the figure
	 * @param {*} x1 initial coordinate in the container (without px)
	 * @param {*} y1 initial coordinate in the container (without px)
	 * @param {*} x2 final in the container (without px)
	 * @param {*} y2 final in the container (without px)
	 * @param {*} strokeWidth width of the line 
	 * @param {*} strokeColor color of the figure 
	 */
	drawLine: ({ svg, x1, y1, x2, y2, strokeWidth, strokeColor, strokeOpacity = 1, dasharray }) => {
		return svg
			.append(`line`)
			.attr(`x1`, x1)
			.attr(`y1`, y1)
			.attr(`x2`, x2)
			.attr(`y2`, y2)
			.attr(`stroke-width`, strokeWidth)
			.attr(`stroke-opacity`, strokeOpacity)
			.attr(`stroke`, `${strokeColor}`)
			.attr('stroke-dasharray', dasharray);
	},
	/**
 * Function to draw a Circle with d3
 * @param {*} svg container where draw the figure
 * @param {*} w width of the figure (without px)
 * @param {*} h height of the figure (without px)
 * @param {*} fill background color of the figure
 * @param {*} cx (optionally)[0] coordinate of the center of the circle in the container (without px)
 * @param {*} cy (optionally)[0] coordinate of the center of the circle in the container(without px)
 * @param {*} bor_c (optionally)[0] border color of the figure 
 * @param {*} bor_w (optionally)[0] border width of the figure 
 */
	drawCircle: ({ svg, w, h, r, fill, fillOpacity = 1, cx = 0, cy = 0, bor_c = 0, bor_w = 0, c }) => {
		return svg
			.append(`circle`)
			.attr(`width`, w)
			.attr(`height`, h)
			.attr(`cx`, cx)
			.attr(`cy`, cy)
			.attr(`r`, r)
			.attr(`fill`, `${fill}`)
			.attr(`fill-opacity`, `${fillOpacity}`)
			.attr(`stroke`, `${bor_c}`)
			.attr(`stroke-width`, `${bor_w}`)
			.attr('class', c);
	},
	/**
	 * Function to draw a Group component in the figure
	 * @param {*} svg container where draw the figure
	 * @param {*} x (optionally)[0] coordinate in the container (without px)
	 * @param {*} y (optionally)[0] coordinate in the container (without px)
	 * @param {*} c (optionally)[''] class or classes added to the figure
	 * @param {*} scale (optionally)[1] scale group element and everything inside it
	 */
	drawG: ({ svg, x = 0, y = 0, c = '', id = '', scale = 1, rotate = 0, md = '', clipPath = '' }) => {
		let transform = ``;
		if (scale !==1)
			transform += `scale(${scale})`;
		if (rotate !==0)
			transform += `rotate(${rotate})`;
		if (x !==0 || y !==0)
			transform += `translate(${x},${y})`;
		const g =
			svg.append(`g`)
				.attr(`transform`, `${transform}`)
				.attr(`class`, `${c}`)
				.attr('id', id);
		if (md !== '')
			g.attr('data-reference-label', md)
		if (clipPath !=='')
			g.attr("clip-path", "url(#clip)");
		return g;
	},
	/**
	 * Function to draw an Image component in the figure
	 * @param {*} svg container where draw the figure
   * @param {*} url url of the image 
	 * @param {*} w width of the image (without px)
	 * @param {*} h height of the image (without px)
	 * @param {*} x (optionally)[0] coordinate in the container (without px)
	 * @param {*} y (optionally)[0] coordinate in the container (without px)
	 */
	drawImage({ svg, url, w, h, x = 0, y = 0, r = 0, c = '', md, tagUi }) {
		return svg.append("image")
			.attr("xlink:href", url)
			.attr(`width`, `${w}px`)
			.attr(`height`, `${h}px`)
			.attr(`transform`, `rotate(${r})translate(${x},${y})`)
			.attr(`class`, `${c}`)
			.attr(`data-reference-image`, `${md}`)
			.attr('data-tag-ui', tagUi);
	},
	/**
	 * Function to create a background with 2 color applicable then to other component using its ID
	 * if x1==x2 linear gradient not change the color horizontally
	 * if x2==y2 = 100% linear gradient change the color diagonally
	 * @param {*} svg container where insert the property
	 * @param {*} id id that can be use to apply the background to other elements
	 * @param {*} c1 first color of background
	 * @param {*} c2 second color of background
	 * @param {*} limit between 0 and 100% of the background where change c1 to c2
	 * @param {*} x1 (optionally)[0] X where start the linear gradient
	 * @param {*} x2 (optionally)[0] X where finish the linear gradient
	 * @param {*} y1 (optionally)[0] Y where start the linear gradient
	 * @param {*} y2 (optionally)[0] Y where finish the linear gradient
	 */
	createBicolorFill: ({ svg, id, c1, c2, c3, c4, c5, p2 = 0, p3 = 0, p4 = 0, x1 = 0, x2 = 0, y1 = 0, y2 = '100%' }) => {
		// Create the svg:defs element and the main gradient definition.
		let svgDefs = svg.append('defs')
		let mainGradient = svgDefs.append('linearGradient')
			.attr('x1', x1)
			.attr('x2', x2)
			.attr('y1', y1)
			.attr('y2', y2)
			.attr('id', id);
		// Create the stops of the main gradient. Each stop will be assigned
		// a class to style the stop using CSS.
		c1 && mainGradient.append('stop')
			.attr('offset', `0%`)
			.attr('style', `stop-color:${c1};stop-opacity:1`);
		p2 && mainGradient.append('stop')
			.attr('offset', `${p2}`)
			.attr('style', `stop-color:${c2};stop-opacity:1`);
		p3 && c3 && mainGradient.append('stop')
			.attr('offset', `${p3}`)
			.attr('style', `stop-color:${c3};stop-opacity:1`);
		p4 && c4 && mainGradient.append('stop')
			.attr('offset', `${p4}`)
			.attr('style', `stop-color:${c4};stop-opacity:1`);
		c5 && mainGradient.append('stop')
			.attr('offset', `100%`)
			.attr('style', `stop-color:${c5};stop-opacity:1`);
	},
	getStationSvgDimensions: ({ offsetWidth, offsetHeight, minHeight, baseWidth, heightScheme, minScale }) => {
		const scale =
			((offsetHeight / minHeight) > minScale)
				? (offsetHeight / heightScheme)
				: minScale;
		const containerWidth = baseWidth * scale < offsetWidth ? offsetWidth : baseWidth * scale;
		const containerHeight = offsetHeight < minHeight ? minHeight : offsetHeight;
		return { containerWidth, containerHeight };
	}
}

/**
 * Set of complex functions that join more D3 js functions to do a specific task
 */
export const UtilsChartEnsemble = {
	/**
	 * Function used only to create the background color of labels that are in the charts
	 */
	propertyBicolor: ({ svg, id = 'bluBicolor', id_stroke = 'bluBicolorStroke', limit = '50%' }) => {
		// Create bicolor for all react
		UtilsChart.createBicolorFill({
			svg: svg,
			id: id,
			c1: Colors.prussianBlue,
			c2: Colors.white,
			limit: limit
		});
		// Create bicolor for all react border
		UtilsChart.createBicolorFill({
			svg: svg,
			id: id_stroke,
			c1: Colors.prussianBlue,
			c2: Colors.oysterBay,
			limit: limit
		});
	},
	/**
	 * Function use to draw all components of the simple blue label (one rect and one text) 
	 */
	labelBlue: ({ svg, x, y, value = '', cg = 'labelGroup', c = 'svgLabel', md = '', arrow, hoverText, styleValue, valueAlign, tagUi }) => {
		const g = UtilsChart.drawG({ svg, x, y, c: cg });
		const valueContainer = UtilsChart.drawText({
			svg: g,
			x: 0,
			y: 0,
			text: value,
			f_size: styleValue.f_size ? styleValue.f_size : '9px',
			f_weight: styleValue.f_weight ? styleValue.f_weight : 400,
			f_style: styleValue.f_style ? styleValue.f_style : '',
			align: valueAlign,
			fill: styleValue.fill ? styleValue.fill : Colors.white,
			c: c,
			md,
			tagUi
		});
		let xArrow = 0;
		let widthRect = valueContainer.node().getBBox().width;
		switch (valueAlign) {
			case 'start':
				xArrow = (widthRect / 2);
				break;
			case 'end':
				xArrow = -(widthRect / 2);
				break;
			default:
				xArrow = 0;
		}
		if (arrow) {
			UtilsChart.drawLine({
				svg: g,
				x1: arrow.x1 !== undefined ? arrow.x1 : xArrow,
				y1: arrow.y1 !== undefined ? arrow.y1 : 3,
				x2: arrow.x2,
				y2: arrow.y2,
				strokeWidth: '1.5px',
				strokeColor: Colors.white,
				strokeOpacity: 0.7,
				dasharray: '2'
			})
			UtilsChart.drawCircle({
				svg: g,
				w: 6,
				h: 6,
				r: 3,
				fill: Colors.white,
				cx: arrow.x2,
				cy: arrow.y2,
			})
			UtilsChart.drawCircle({
				svg: g,
				w: 3,
				h: 3,
				r: 1.5,
				fill: Colors.matisse,
				cx: arrow.x2,
				cy: arrow.y2,
			})
		}
		if (hoverText) {
			valueContainer.on("mousemove", () => {
				let htmlPopover = `<p>${hoverText}</p>`;
				let popover = document.querySelector(`.tooltip-chart`);
				popover.innerHTML = htmlPopover;
				popover.style.left = `${d3.event.pageX}px`;
				popover.style.top = `${d3.event.pageY - 10}px`;
				popover.style.opacity = '1';
			});
			valueContainer.on("mouseout", () => {
				let popover = document.querySelector(`.tooltip-chart`);
				popover.style.opacity = '0';
			});
		}
		return valueContainer;
	},
	/**
	 * Function use to draw all components of label with line and array value
	 */
	relatedLabel: ({ svg, x, y, title, value = '', arrow, valueAlign }) => {
		const g = UtilsChart.drawG({
			svg,
			x: x,
			y: y,
			c: 'labelGroup'
		});
		if (title) {
			UtilsChart.drawText({
				svg: g,
				text: title,
				align: 'start',
				f_size: '10px',
				f_weight: 500,
				f_style: 'italic',
				fill: Colors.white,
				fillOpacity: 0.5,
			});
		}
		const label = value.map((el, index) => {
			let textLabel = null;
			if (el.label) {
				textLabel = UtilsChart.drawText({
					svg: g,
					x: 0,
					y: 15 + 15 * index,
					text: `${el.label}:`,
					align: 'start',
					f_size: '10px',
					f_weight: 500,
					f_style: 'italic',
					fill: Colors.white,
					fillOpacity: 0.5
				});
			}
			const newValue = UtilsChart.drawText({
				svg: g,
				x: textLabel ? textLabel.node().getBBox().width + 5 : 0,
				y: 15 + 15 * index,
				text: el.value,
				f_size: '9px',
				f_weight: 400,
				f_style: '',
				align: 'start',
				fill: Colors.white,
				c: `svgLabel ${el.class}`,
				md: el.metadata,
				tagUi: el.tagUi
			});
			if (el.hoverText) {
				newValue.on("mousemove", () => {
					let htmlPopover = `<p>${el.hoverText}</p>`;
					let popover = document.querySelector(`.tooltip-chart`);
					popover.innerHTML = htmlPopover;
					popover.style.left = `${d3.event.pageX}px`;
					popover.style.top = `${d3.event.pageY - 10}px`;
					popover.style.opacity = '1';
				});
				newValue.on("mouseout", () => {
					let popover = document.querySelector(`.tooltip-chart`);
					popover.style.opacity = '0';
				});
			}
			return newValue;
		});
		let xArrow = 0;
		let widthRect = g.node().getBBox().width;
		switch (valueAlign) {
			case 'middle':
				xArrow = (widthRect / 2);
				break;
			case 'end':
				xArrow = widthRect;
				break;
			default:
				xArrow = 0;
		}
		if (arrow) {
			UtilsChart.drawLine({
				svg: g,
				x1: arrow.x1 ? arrow.x1 : xArrow,
				y1: arrow.y1 ? arrow.y1 : g.node().getBBox().height,
				x2: arrow.x2,
				y2: arrow.y2,
				strokeWidth: '1.5px',
				strokeColor: Colors.white,
				strokeOpacity: 0.7,
				dasharray: '2'
			})
			UtilsChart.drawCircle({
				svg: g,
				w: 6,
				h: 6,
				r: 3,
				fill: Colors.white,
				cx: arrow.x2,
				cy: arrow.y2,
			})
			UtilsChart.drawCircle({
				svg: g,
				w: 3,
				h: 3,
				r: 1.5,
				fill: Colors.matisse,
				cx: arrow.x2,
				cy: arrow.y2,
			})
		}
		return label;
	},
	/**
	 * Function to draw 2 label with unit measure and value, they are 
	*/
	unitValueLabel: ({ svg, x, y, c, value, styleValue, hoverText, md = '', valueAlign = 'start', tagUi }) => {
		const g = UtilsChart.drawG({ svg, x, y, c: 'unitValue', md });
		const valueContainer = UtilsChart.drawText({
			svg: g,
			x: 0,
			y: 0,
			text: value,
			f_size: styleValue.f_size ? styleValue.f_size : '9px',
			f_weight: styleValue.f_weight ? styleValue.f_weight : 400,
			f_style: styleValue.f_style ? styleValue.f_style : '',
			align: valueAlign,
			fill: styleValue.fill ? styleValue.fill : Colors.white,
			c: c,
			md,
			tagUi
		});
		if (hoverText) {
			valueContainer.on("mousemove", () => {
				let htmlPopover = `<p>${hoverText}</p>`;
				let popover = document.querySelector(`.tooltip-chart`);
				popover.innerHTML = htmlPopover;
				popover.style.left = `${d3.event.pageX}px`;
				popover.style.top = `${d3.event.pageY - 10}px`;
				popover.style.opacity = '1';
			});
			valueContainer.on("mouseout", () => {
				let popover = document.querySelector(`.tooltip-chart`);
				popover.style.opacity = '0';
			});
		}
		return valueContainer;
	}
}

/**
* Function to resize the graphics and label when dimesion
* of page change or the first time the picture
* Zoom is applied based on the width
*/
export const manageZoomByWidth = ({
	graphics,
	svg,
	baseW,
	baseH,
	container,
	minScale,
	maxScale,
	marginLeft = 0,
	marginTop = 0
}) => {
	const containerWidth = container && container.offsetWidth;
	const containerHeight = window.innerHeight - 96;
	let getScale = Math.min(
		containerWidth / baseW,
		containerHeight / baseH
	);
	let scale = getScale;
	if (getScale < minScale) {
		scale = minScale
	}
	if (getScale > maxScale) {
		scale = maxScale;
	}
	const differenceX = (containerWidth - (baseW * scale)) > 0
		? (containerWidth - (baseW * scale))
		: 0;
	graphics.attr(
		`transform`,
		`translate(${differenceX / 2 + marginLeft}, ${marginTop}) scale(${scale})`
	);
	// contenitore se disegno più piccolo, altrimenti uguale al disegno
	const svgW = baseW * scale > containerWidth ? baseW * scale : containerWidth;
	const svgH = baseH * scale;
	svg.attr(`width`, `${svgW}px`).attr(`height`, `${svgH}px`);
}

/**
 * Draw all label in the chart based on the configuration passed
 * Go to turbocharger page in app to see how implement a configuration for this function
 * @param {*} svg container where draw all the labels
 * @param {*} labels configuration passed to draw labels in the chart
 */
export const drawBlueLabels = (svg, labels) => {
	const variableValues = {};
	labels.forEach(label => {
		let newlabel = null;
		switch (label.type) {
			case 'unitValue':
				newlabel = UtilsChartEnsemble.unitValueLabel({
					svg,
					x: label.x,
					y: label.y,
					c: label.class ? label.class : 'unitValue',
					value: label.value,
					styleValue: label.styleValue ? label.styleValue : {},
					hoverText: label.hoverText ? label.hoverText : "",
					md: label.metadata,
					valueAlign: label.valueAlign,
					tagUi: label.tagUi
				});
				variableValues[label.property] = newlabel;
				break;
			case 'blueLabel':
				newlabel = UtilsChartEnsemble.labelBlue({
					svg,
					x: label.x,
					y: label.y,
					value: label.value,
					styleValue: label.styleValue ? label.styleValue : {},
					valueAlign: label.valueAlign,
					hoverText: label.hoverText,
					hoverStyle: label.hoverStyle ? label.hoverStyle : {},
					arrow: label.arrow,
					c: label.class,
					md: label.metadata,
					tagUi: label.tagUi
				});
				variableValues[label.property] = newlabel;
				break;
			case 'relatedLabel':
				newlabel = UtilsChartEnsemble.relatedLabel(
					{
						svg,
						x: label.x,
						y: label.y,
						title: label.title,
						value: label.value,
						valueAlign: label.valueAlign,
						arrow: label.arrow,
					});
				let properties = label.value.map(el => el.property);
				properties.forEach((property, index) => variableValues[property] = { value: newlabel[index], type: 'relatedLabel' });
				break;
			default:
				newlabel = UtilsChart.drawText({
					svg,
					x: label.x,
					y: label.y,
					text: label.value,
					align: label.align,
					f_size: label.f_size ? label.f_size : '9px',
					f_weight: label.f_weight ? label.f_weight : 400,
					f_style: label.f_style ? label.f_style : 'normal',
					fill: label.fill ? label.fill : Colors.slateGrey,
					rotate: label.rotate,
					w: label.w || 'auto',
					h: label.h || 'auto',
					tagUi: label.tagUi
				});
				variableValues[label.property] = newlabel;
				break;
		}
	});
	return variableValues;
}

/**
 * Draw Image chart
 * @param {*} svg container chart
 * @param {*} images images array
 */
export const drawImageInChart = (svg, images) => {
	let imagesChart = {};
	images.forEach(image => {
		const img = iconCollection[image.url];
		imagesChart[image.property] = UtilsChart.drawImage({
			svg,
			url: img,
			w: image.w,
			h: image.h,
			x: image.x,
			y: image.y,
			c: image.c,
			r: image.r,
			md: image.property,
			tagUi: image.tagUi
		});
		if (image.hoverText) {
			imagesChart[image.property].on("mousemove", () => {
				let htmlPopover = `<p>${image.hoverText}</p>`;
				let popover = document.querySelector(`.tooltip-chart`);
				popover.innerHTML = htmlPopover;
				popover.style.left = `${d3.event.pageX}px`;
				popover.style.top = `${d3.event.pageY - 10}px`;
				popover.style.opacity = '1';
			});
			imagesChart[image.property].on("mouseout", () => {
				let popover = document.querySelector(`.tooltip-chart`);
				popover.style.opacity = '0';
			});
		}
	});
	
	return imagesChart;
}

/**
 * Add listener to all labels to manage hover and scroll on click
 */
export const scrollAndHighlightData = (openTtreshOldModal) => {
	const labels = document.querySelectorAll('[data-reference-label]');
	labels.forEach(label => {
		label.addEventListener('click', e => clickLabel(e, openTtreshOldModal));
	});
}

const clickLabel = (e, openTtreshOldModal) => {
	const metadata = e.target.getAttribute('data-reference-label');
	if (e.target.hasAttribute('open-modal')) {
		openTtreshOldModal(metadata);
	} else {
		highlightData(metadata);
	}
}

/**
 * Function that manage hover and scroll on click for all
 * labels
 * @param {*} metadata 
 */
const highlightData = (metadata) => {
	const tableData = document.querySelectorAll(`[data-reference-table = "${metadata}"]`);
	let minScroll = null;
	if (tableData.length > 0) {
		tableData.forEach(el => {
			el.classList.add('highlight');
			setTimeout(() => {
				el.classList.remove('highlight');
			}, 4000);
		});
		minScroll = tableData[0].getBoundingClientRect().top;
		const wrapperBody = document.querySelector('#wrapper-body');
		const step = wrapperBody.scrollTop + 42;
		if (step < minScroll) {
			wrapperBody.scrollTo({
				top: minScroll - 100,
				behavior: 'smooth'
			});
		}
	}
}

/**
 * Remove the chart when user change tab ar data will be updated
 */
export const cleanSvg = (chart) => {
	if (chart) {
		while (chart.firstChild) {
			chart.removeChild(chart.firstChild);
		}
	}
}