/**
 * Dictionary between code of unit measure and the real unit measure
 */
const tag_to_uom = {
	"1A": "",//digital
	"AA": "mBarD",
	"AB": "BarA",
	"AC": "Sm3/h",
	"AD": "kSm³/h",
	"AE": "BarG",
	"AF": "%",
	"AG": "rpm",
	"AH": "kW",
	"AJ": "BarD",
	"AK": "mm/s",
	"AL": "μm",
	"AM": "mm",
	"AN": "G",
	"AO": "",//n/a
	"AP": "kg/Sm³",
	"AQ": "kJ/kg",
	"AR": "h",
	"AS": "cnt",
	"AT": "mg/Sm³",
	"AU": "kJ/Sm³",
	"AV": "km",
	"AW": "kg/h",
	"AX": "Ω",
	"AY": "mBar",
	"AZ": "Bar",
	"A1": "Sm³/h",
	"A2": "Nm",
	"A3": "dga",
	"A4": "in",
	"A5": "kJ/kWh",
	"A6": "GJ/h",
	"A7": "1000m³/h",
	"A8": "m",
	"A9": "Sl/min",
	"BA": "%LEL",
	"BB": "mbarG",
	"BC": "psi A",
	"BD": "",
	"BE": "MW",
	"BF": "°F",
	"BG": "Sm³/h",
	"BH": "Nm³/h",
	"BI": "ppm",
	"BJ": "mmH2O",
	"BK": "N",
	"BL": "btu/l",
	"BM": "mils pp",
	"BN": "mm/s pk",
	"BO": "μμ",
	"BP": "psi",
	"BQ": "pps",
	"BR": "pph",
	"BS": "pph/s",
	"BT": "µm pkpk",
	"BU": "mg/Nm³",
	"BV": "%Vol",
	"BW": "m³/h",
	"BX": "kPaA",
	"BY": "kPa",
	"BZ": "kPa pk",
	"B0": "mm/s²",
	"B1": "kg/s",
	"B2": "kPaG",
	"B3": "kPaD",
	"B4": "l/min"
}

/**
 * Get UM by tag
 * @param {*} tag 
 */
export const getUomByTag = (tag) => {
	if (tag_to_uom[tag])
		return tag_to_uom[tag]
	return ' '
}

/**
 * parse data
 * @param {*} value value by tag
 */
const getValueType = (value) => {
	switch (typeof value) {
		case 'string':
		case 'number':
			if (value === 'true' || value === 'false') {
				return value;
			}
			if (value[0] === '[') {
				return JSON.parse(value.replace(/'/g, ""))
			}
			return isNaN(Number(Number(value).toFixed(2))) ? value : Number(Number(value).toFixed(2));
		default: return value;
	}
}

/**
 * Get value by tag
 * @param {*} data 
 * @param {*} tag 
 */
export const getValueByTag = (data, tag) => {
	if (data && data[tag]) {
		return getValueType(data[tag].V);
	}
	return ''
}


/**
 * Get tag uom by tag value
 * @param {*} data 
 * @param {*} tag 
 */
export const getUomByTagData = (data, tag) => {
	if (data) {
		if (data[tag]) {
			return data[tag].U
		}
	}
	return ''
}

/**
 * Get value and UM by tag
 * @param {*} data 
 * @param {*} tag 
 */
export const getValueAndUomByTag = (data, tag) => {
	if (data[tag] && data[tag] !== undefined) {
		return `${getValueType(data[tag].V)} ${tag_to_uom[data[tag].U]}`
	}
	return 'Value'
}

/**
 * Get Label by TagAcn
 * @param {*} tag relative to the label I want to see
 * @param {*} where position or page where I want to put the label
 */
export const getLabelByTag = (labels, tag, type) => {
	if (labels) {
		const label = labels.find(el => el.tagAcn === tag);
		if (label && label[type]) {
			return label[type];
		}
	}
	return ' - ';
}

/**
 * Get Label by TagUi
 * @param {*} tag relative to the label I want to see
 * @param {*} where position or page where I want to put the label
 */
export const getLabelByTagUi = (labels, tag, type) => {
	if (labels) {
		const label = labels.find(el => el.tagUi === tag);
		if (label && label[type]) {
			return label[type];
		}
	}
	return ' - ';
}

/**
 * Get class for color by thresholds
 * @param {*} data 
 * @param {*} tag 
 * @param {*} thresholds 
 */
export const getColorByTreshOld = (dataTag, objThresholds) => {
	let classe = '';
	if (objThresholds && dataTag !== '') {
		if (objThresholds.threshold4 && dataTag <= objThresholds.threshold4) {
			classe = 'pre-alarm';
		}

		if (objThresholds.threshold3 && dataTag <= objThresholds.threshold3) {
			classe = 'alarm';
		}

		if (objThresholds.threshold2 && dataTag <= objThresholds.threshold2) {
			classe = 'block';
		}

		if (objThresholds.threshold1 && dataTag <= objThresholds.threshold1) {
			classe = 'not-trusted';
		}

		if (objThresholds.threshold5 && dataTag >= objThresholds.threshold5) {
			classe = 'pre-alarm';
		}

		if (objThresholds.threshold6 && dataTag >= objThresholds.threshold6) {
			classe = 'alarm';
		}

		if (objThresholds.threshold7 && dataTag >= objThresholds.threshold7) {
			classe = 'block';
		}

		if (objThresholds.threshold8 && dataTag >= objThresholds.threshold8) {
			classe = 'not-trusted';
		}
	}

	return classe;
}

/**
 * class digital values
 * @param {*} data 
 * @param {*} value 
 * @param {*} tagList 
 * @param {*} thresholds 
 */
export const generateClassValues = (data, value, tagList, thresholds, isCentral) => {
	const findValue = tagList && tagList.find(tag => tag.tagUi === value.tagUi);

	if (findValue) {
		const tagAcn = getTagAcnSplit(tagList, value.tagUi);
		const tagThresholds = isCentral ? findValue.tagAcn : tagAcn;
		const dataTag = data[tagAcn] && getValueType(data[tagAcn].V);
		const objThresholds = thresholds && thresholds.find(t => isCentral ? t.tag === tagThresholds : t.tag.split('_')[1] === tagThresholds);
		if (value.isDigital) {
			return `${getValueByTag(data, tagAcn) === 'true' ? 'orange-digital' : 'grey-digital'}`;
		}
		return getColorByTreshOld(dataTag, objThresholds);
	}
	return '';
}

const getTagAcnSplit = (labels, tagUi) => {
	if (getLabelByTagUi(labels, tagUi, 'tagAcn')) {
		if (getLabelByTagUi(labels, tagUi, 'tagAcn').split('_').length > 1) {
			return getLabelByTagUi(labels, tagUi, 'tagAcn').split('_')[1];
		}
		return getLabelByTagUi(labels, tagUi, 'tagAcn');
	}
	return getLabelByTagUi(labels, tagUi, 'tagAcn');
}

/**
 * render Table page
 * @param {*} data 
 * @param {*} labels 
 * @param {*} thresholds 
 * @param {*} drawChart 
 */
export const renderColumnTable = ({ data, labels, typeTag, thresholds, drawChart, isCentral }) => {

	const renderInfo = (info) => {
		return info.map(item => {
			const tagAcn = getTagAcnSplit(labels.tagList, item.tagUi);
			const idTC = getLabelByTagUi(labels.tagList, item.tagUi, 'tagAcn').split('_').length > 1 ? getLabelByTagUi(labels.tagList, item.tagUi, 'tagAcn').split('_')[0] : null;
			const metadata = getLabelByTagUi(labels.tagList, item.metadata, 'tagAcn');
			let valueLabel = getValueAndUomByTag(data, tagAcn);
			let classValue = generateClassValues(data, item, labels.tagList, thresholds, isCentral);
			if (idTC && idTC !== 'S') {
				valueLabel = getValueAndUomByTag(data.tcs.find(tc => tc.id === Number(idTC)), tagAcn);
				classValue = generateClassValues(data.tcs.find(tc => tc.id === Number(idTC)), item, labels.tagList, thresholds, isCentral);
			}
			const tag = getLabelByTagUi(labels.tagList, item.tagUi, typeTag);
			const labelTable = getLabelByTagUi(labels.tagList, item.tagUi, 'labelTable');

			switch (item.type) {
				case 'progressbar':
					return ({
						label: tag,
						title: labelTable,
						value: valueLabel,
						progressbar: [getValueByTag(data, tagAcn) || 0, item.range, item.axis && 'axis'],
						metadata: metadata,
						metaTagAcn: tagAcn,
						metaTagUi: item.tagUi,
						class: classValue
					});
				case 'digital':
					return ({
						label: tag,
						title: labelTable,
						value: getValueByTag(data, tagAcn) === 'true' ? 'Attivo' : getValueByTag(data, tagAcn) === 'false' ? 'Disattivo' : 'value',
						metadata: metadata,
						metaTagAcn: tagAcn,
						metaTagUi: item.tagUi,
						class: classValue
					});
				default:
					return ({
						label: tag,
						title: labelTable,
						value: valueLabel,
						metadata: metadata,
						metaTagAcn: tagAcn,
						metaTagUi: item.tagUi,
						class: classValue
					});
			}
		})
	}

	const renderCars = (card) => {
		if (card.cards) {
			if (card.type === 'chart') {
				return ({
					title: card.title,
					type: card.type,
					chart: card.chart && drawChart(card.chart),
					info: card.info && renderInfo(card.info),
					cards: card.cards.map(el => renderCars(el))
				})
			} else {
				return {
					title: card.title,
					info: card.info && renderInfo(card.info),
					cards: card.cards.map(el => renderCars(el))
				}
			}
		} else {
			if (card.type === 'chart') {
				return ({
					title: card.title,
					type: card.type,
					chart: card.chart && drawChart(card.chart),
					info: card.info && renderInfo(card.info)
				})
			} else {
				return {
					title: card.title,
					info: card.info && renderInfo(card.info)
				}
			}
		}
	}

	return {
		singleColumn: labels.tablePage && labels.tablePage.singleColumns && labels.tablePage.singleColumns.map(column => (
			column.map(card => {
				return ({ cards: card.cards.map(el => renderCars(el)) });
			})
		)),
		columns: labels.tablePage && labels.tablePage.columns && labels.tablePage.columns.map(column => (
			column.map(card => {
				if (card.cards) {
					return { cards: card.cards.map(el => renderCars(el)) };
				} else {
					return [{}];
				}
			})
		))
	}
}

//PEMS function state
const multiAlert = (code) => {
	switch (Number(code)) {
		case 2: return 'Limite massimo predizione NOx superato';
		case 3: return 'Limite massimo predizione CO superato';
		case 4: return 'Valore minimo di CO predetto non raggiunto';
		case 5: return 'Turbina in condizioni non stabili (transitorio)';
		case 6: return 'Indicazione Blow Out incipiente';
		case 7: return 'Minimo carico tecnico non raggiunto';
		case 8: return 'Errore Calcolo concentrazione NOx';
		case 9: return 'Errore Calcolo concentrazione CO';
		case 10: return 'Errore Calcolo concentrazione O2';
		case 11: return 'Valore minimo di NOx predetto non raggiunto';
		default: return 'value'
	}
};

const maschineState = (code) => {
	switch (code.toUpperCase()) {
		case 'A1': return 'Macchina accesa';
		case 'A2': return 'Macchina in accensione';
		case 'A3': return 'Macchina in spegnimento';
		case 'A4': return 'Macchina ferma';
		case 'A5': return 'Macchina in manutenzione/mappatura';
		default: return 'value';
	}
}

const workStates = (code) => {
	switch (code.toUpperCase()) {
		case 'F': return 'Turbina ferma';
		case 'NF': return 'Turbina in normale funzionamento';
		case 'SMT': return 'Sotto minimo tecnico';
		case 'DNF': return 'Mappatura / Prove';
		case 'ND': return 'Non disponibile';
		case 'FS': return 'Analizzatore SME fuori servizio';
		case 'LIR': return 'Limite inferiore rilevabilità';
		case 'TRA': return 'Transitorio';
		default: return 'value';
	}
}

/**
 * render Table Pems page
 * @param {*} data 
 * @param {*} labels 
 * @param {*} thresholds 
 * @param {*} drawChart 
 */
export const renderTablePems = ({ data, labels, typeTag, thresholds }) => {
	return labels.tablePems && labels.tablePems.map(el => el.map(column => {
		switch (column.type) {
			case 'alertMaschineStates': {
				let infoReturn = [];
				column.info.forEach(info => {
					const tagAcn = getTagAcnSplit(labels.tagList, info.tagUi);
					const idTC = getLabelByTagUi(labels.tagList, info.tagUi, 'tagAcn').split('_').length > 1 ? getLabelByTagUi(labels.tagList, info.tagUi, 'tagAcn').split('_')[0] : null;
					const metadata = getLabelByTagUi(labels.tagList, info.tagUi, 'tagAcn');
					let valueLabel = getValueByTag(data, tagAcn);
					let classValue = generateClassValues(data, info, labels.tagList, thresholds);
					if (idTC) {
						valueLabel = getValueByTag(data.tcs.find(tc => tc.id === Number(idTC)), tagAcn);
						classValue = generateClassValues(data.tcs.find(tc => tc.id === Number(idTC)), info, labels.tagList, thresholds);
					}
					const labelTable = getLabelByTagUi(labels.tagList, info.tagUi, 'labelTable');
					switch (info.type) {
						case 'multiAlert': {
							if (valueLabel.length > 0) {
								return valueLabel.forEach((el, index) => {
									infoReturn.push({
										type: 'alert',
										metaTagAcn: tagAcn,
										metaTagUi: info.tagUi,
										metadata: metadata,
										value: multiAlert(el),
										title: `${labelTable} ${index}`,
										class: `pems ${info.class} ${classValue}`
									})
								})
							}
							break;
						}
						case 'maschineState': {
							infoReturn.push({
								type: 'alert',
								metaTagAcn: tagAcn,
								metaTagUi: info.tagUi,
								metadata: metadata,
								value: maschineState(valueLabel),
								title: labelTable,
								class: `pems ${info.class} ${classValue}`
							});
							break;
						}
						case 'workStates': {
							infoReturn.push({
								type: 'alert',
								metaTagAcn: tagAcn,
								metaTagUi: info.tagUi,
								metadata: metadata,
								value: workStates(valueLabel),
								title: labelTable,
								class: `pems ${info.class} ${classValue}`
							});
							break;
						}
						default: {
							infoReturn.push({
								type: 'alert',
								metaTagAcn: tagAcn,
								metaTagUi: info.tagUi,
								metadata: metadata,
								value: valueLabel,
								title: labelTable,
								class: `pems ${info.class} ${classValue}`
							});
							break;
						}
					}
				});
				return ({
					title: column.title,
					info: infoReturn
				})
			}
			default: {
				return ({
					title: column.title,
					info: column.info.map(info => {
						const tagAcn = getTagAcnSplit(labels.tagList, info.tagUi);
						const idTC = getLabelByTagUi(labels.tagList, info.tagUi, 'tagAcn').split('_').length > 1 ? getLabelByTagUi(labels.tagList, info.tagUi, 'tagAcn').split('_')[0] : null;
						const metadata = getLabelByTagUi(labels.tagList, info.tagUi, 'tagAcn');
						let valueLabel = getValueAndUomByTag(data, tagAcn);
						let classValue = generateClassValues(data, info, labels.tagList, thresholds);
						if (idTC) {
							valueLabel = getValueAndUomByTag(data.tcs.find(tc => tc.id === Number(idTC)), tagAcn);
							classValue = generateClassValues(data.tcs.find(tc => tc.id === Number(idTC)), info, labels.tagList, thresholds);
						}
						const tag = getLabelByTagUi(labels.tagList, info.tagUi, typeTag);
						const tagScale = getLabelByTagUi(labels.tagList, info.scale, 'tagAcn').split('_')[1];
						const valueScale = getValueAndUomByTag(data.tcs.find(tc => tc.id === Number(idTC)), tagScale)
						return ({
							type: info.type,
							metaTagAcn: tagAcn,
							metaTagUi: info.tagUi,
							metadata: metadata,
							label: tag,
							value: valueLabel,
							scale: info.scale && valueScale,
							class: `${info.class} ${classValue}`
						})
					})
				})
			}
		}

	}));
}

/**
 * render values chart page
 * @param {*} data 
 * @param {*} labels 
 * @param {*} thresholds 
 */
export const renderValuesChart = ({ data, labels, typeTag, thresholds }) => {
	return labels.chartValues && labels.chartValues.map(value => {
		switch (value.type) {
			case 'multiRelatedLabel': {
				return ({
					x: value.x,
					y: value.y,
					valueAlign: value.valueAlign,
					type: 'relatedLabel',
					title: value.title,
					value: value.value.map(el => {
						const tagAcn = getTagAcnSplit(labels.tagList, el.tagUi);
						const tag = getLabelByTagUi(labels.tagList, el.tagUi, 'tagAcn');
						const valueLabel = value.isDigital ? getLabelByTagUi(labels.tagList, el.tagUi, typeTag) : getValueAndUomByTag(data, tagAcn);
						const hoverText = getLabelByTagUi(labels.tagList, el.tagUi, 'labelTooltip');
						return (
							{
								label: el.label,
								value: valueLabel,
								hoverText: hoverText,
								property: tag,
								metadata: tag,
								tagUi: el.tagUi,
								class: generateClassValues(data, el, labels.tagList, thresholds)
							}
						)
					}),
					arrow: value.arrow
				});
			}
			default: {
				const tagAcn = getTagAcnSplit(labels.tagList, value.tagUi);
				const tag = getLabelByTagUi(labels.tagList, value.tagUi, 'tagAcn');
				const valueLabel = value.isDigital ? getLabelByTagUi(labels.tagList, value.tagUi, typeTag) : getValueAndUomByTag(data, tagAcn);
				const hoverText = getLabelByTagUi(labels.tagList, value.tagUi, 'labelTooltip');
				return ({
					x: value.x,
					y: value.y,
					valueAlign: value.valueAlign,
					type: value.type,
					value: valueLabel,
					hoverText: hoverText,
					property: tag,
					metadata: tag,
					tagUi: value.tagUi,
					arrow: value.type === 'blueLabel' && value.arrow,
					class: generateClassValues(data, value, labels.tagList, thresholds)
				});
			}
		}
	});
}

/**
 * Render values by station chart
 * @param {*} data 
 * @param {*} labels 
 * @param {*} indexTC 
 * @param {*} thresholds 
 * @param {*} typeTag 
 */
export const renderValuesChartStation = ({ data, labels, indexTC, thresholds, typeTag }) => {
	return (
		labels.chartValuesTC[indexTC].values.map(value => {

			const tag = getLabelByTagUi(labels.tagList, value.tagUi, 'tagAcn');
			let tagAcn = getTagAcnSplit(labels.tagList, value.tagUi);
			const valueThreshold = getValueByTag(data, tagAcn);
			const valueLabel = value.isDigital ? getLabelByTagUi(labels.tagList, value.tagUi, typeTag) : getValueAndUomByTag(data, tagAcn);
			const hoverText = getLabelByTagUi(labels.tagList, value.tagUi, 'labelTooltip');

			return ({
				x: value.x,
				y: value.y,
				valueAlign: value.valueAlign,
				type: value.type,
				value: valueLabel,
				hoverText: hoverText,
				property: getLabelByTagUi(labels.tagList, value.tagUi, 'tagAcn'),
				metadata: getLabelByTagUi(labels.tagList, value.tagUi, 'tagAcn'),
				tagUi: value.tagUi,
				arrow: value.type === 'blueLabel' && value.arrow,
				class: getColorByTreshOld(valueThreshold, thresholds && thresholds.find(el => el.tag === tag))
			});
		})
	);
};


/**
 * change Imahe Gas Fuel
 * @param {*} data 
 */
export const chooseImg = (data, labels, tagUi) => {
	let tagAcn = getLabelByTagUi(labels.tagList, tagUi, 'tagAcn');
	let value = parseFloat(getValueByTag(data, tagAcn));
	switch (true) {// true | value
		case value === 100:
			return 'gasCombustibileMASLivello2_100';
		case value >= 80 && value <= 99:
			return 'gasCombustibileMASLivello2_80_99';
		case value >= 60 && value <= 79:
			return 'gasCombustibileMASLivello2_60_79';
		case value >= 40 && value <= 59:
			return 'gasCombustibileMASLivello2_40_59';
		case value >= 20 && value <= 39:
			return 'gasCombustibileMASLivello2_20_39';
		case value >= 1 && value <= 19:
			return 'gasCombustibileMASLivello2_1_19';
		default: return '';
	}
}

/**
 * isOpenPoint Gss fuel
 * @param {*} data 
 * @param {*} labels 
 * @param {*} values 
 * @param {*} limitNumber 
 */
export const isOpenPoint = (data, labels, values, limitNumber = 99) => {
	let condition = true;
	values.forEach(value => {
		let tagAcn = getLabelByTagUi(labels.tagList, value, 'tagAcn');
		let valueData = getValueByTag(data, tagAcn);
		let type = typeof valueData;
		switch (type) {
			case 'number':
				condition = condition && valueData < limitNumber;
				break;
			case 'string':
				condition = condition && valueData === 'true';
				break;
			default:
				break;
		}
	});
	return condition;
}

/**
 * isOpenValve Gss fuel
 * @param {*} data 
 * @param {*} labels 
 * @param {*} values 
 */
export const isOpenValve = (data, labels, valve, limitNUmber = 99) => {
	let tagAcn = getTagAcnSplit(labels.tagList, valve);
	let valueData = getValueByTag(data, tagAcn);
	let type = typeof valueData;
	switch (type) {
		case 'number':
			return valueData ? valueData < limitNUmber ? true : false : null;
		case 'string':
			return valueData ? valueData === 'true' ? true : false : null;
		default:
			return null;
	}
};

/**
 * exchaust spaces wheel isto chart
 * @param {*} data 
 * @param {*} values 
 * @param {*} labels 
 * @param {*} typeTag 
 */
export const configureDataIstoChart = (data, values, labels, typeTag = 'tagCliente') => {
	return values.map(value =>
		(
			{
				"temp": getLabelByTagUi(labels.tagList, value, typeTag),
				"metadata": getLabelByTagUi(labels.tagList, value, 'tagAcn'),
				"value": getValueByTag(data, getLabelByTagUi(labels.tagList, value, 'tagAcn'))
			}
		)
	);
}

/**
 * exchaust spaces wheel radarChart
 * @param {*} param0 
 */
export const configureDataRadarChart = ({ dataChart, tcs, labels, typeTag = 'tagCliente' }) => {
	return labels.chartImage.map(chart => {
		const data = chart.data.map(el => {
			const x = getLabelByTagUi(labels.tagList, el.tagUi, 'tagAcn');
			const tagAcn = getLabelByTagUi(labels.tagList, el.tagUi, 'tagAcn');
			const labelTag = getLabelByTagUi(labels.tagList, el.tagUi, typeTag);
			const obj = {};
			obj[x] = {
				value: getValueByTag(dataChart, tagAcn),
				label: el.label,
				tooltip: labelTag,
				uom: chart.uom,
			}
			return obj;
		});
		return (
			{
				x: chart.x,
				y: chart.y,
				data: data,
				domain: chart.domain,
				x0: chart['x0'],
				ticks: chart.ticks,
			}
		)
	});
}


//Trend functions

const getTagAcnSplitTrend = (tagAcn) => {
	if (tagAcn) {
		if (tagAcn.split('_').length > 1) {
			return tagAcn.split('_')[1];
		}
		return tagAcn;
	}
}
//getTooltipLabel chart
export const findTooltipLabel = (dataListTags, tag) => {
	const findIndex = dataListTags.length > 0 ? dataListTags.findIndex(el => getTagAcnSplitTrend(el.tagAcn) === tag) : -1;
	const element = dataListTags.find(el => el.tagAcn === tag);
	if (findIndex >= 0) {
		return element.labelTrend;
	}
	return ' - ';
};

//Get label by tagAcn
export const getLabelbyTagAcn = (dataListTags, tag) => {
	const findIndex = dataListTags.length > 0 ? dataListTags.findIndex(el => getTagAcnSplitTrend(el.tagAcn) === tag) : -1;
	if (findIndex >= 0) {
		const element = dataListTags[findIndex];
		return { label: element.labelTrend, uom: getUomByTag(element.uom) };
	}
	return { label: ' - ', uom: '' }
}

export const getListParameters = (listParameters, dataListTags) => {
	if(listParameters && dataListTags) {
		const returnListParams = [];
		listParameters.forEach(el => {
			const indexElement = dataListTags.findIndex(tag => getTagAcnSplitTrend(tag.tagAcn) === el.tag);
			if( indexElement >= 0) {
				returnListParams.push(dataListTags[indexElement]);
			}
		});
		return returnListParams;
	}
	return [];
}