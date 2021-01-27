import React from 'react';
import PropTypes from "prop-types";

import {
	Modal,
	ChartSettings,
	CartesianUITrends,
	ChartTable,
	Tabs,
	TrendsSelectTag,
	Select,
	TrendsListTags,
	Input,
	Loading
} from "../../ui";
import { getUomByTag, colorsUOM, isEqualToObject, getDateString, findTooltipLabel } from "../../../utils";

const TrendModalChart = (props) => {

	const {
		dataTrend,
		stationID,
		tcsID,
		handleShowModal,
		showModal,
		type,
		getTrendCSV,
		saveTrend,
		labels,
		currentChart,
		archive,
		dispatchGetChartByParameters,
		dispatchGetTrendChart,
		dispatchResetCurrentChart
	} = props;

	//React state

	//State trend labels
	const [showLoading, changeshowLoading] = React.useState(true);
	const [nameTrend, changeNameTrend] = React.useState(dataTrend.name);
	const [errorName, changeErrorName] = React.useState(false);
	const [trend, changeTrend] = React.useState(dataTrend);
	const [trendChart, changeTrendChart] = React.useState([]);
	const [datalistParameters, changeDataListParameters] = React.useState(null);
	const [dataLabels, changeDataLabels] = React.useState(null);
	const [dateFilters, changeDatefFilters] = React.useState({ dateFrom: new Date(dataTrend.dateFrom), dateTo: new Date(dataTrend.dateTo) });

	//state chart
	const [domainY, changeDomainY] = React.useState([0, 10]);
	const [domainX, changeDomainX] = React.useState([0, 10]);
	const [zoomActive, changeZoomActive] = React.useState(false);
	const [commentsActive, changeCommentsActive] = React.useState(false);

	//state edit dataset
	const [activeTab, changeActiveTab] = React.useState(type === 'edit' ? 'chart' : 'dataSet');
	const [activeTabTags, changeActiveTabTags] = React.useState('forPage');
	const [valueSelectPage, changeValueSelectPage] = React.useState(null);
	const [optionsSelect, changeOptionsSelect] = React.useState([]);
	const [dataListSelect, changeDataListSelect] = React.useState([]);
	const [dataListTags, changeDataListTags] = React.useState([]);
	const [dataListTagsFilteres, changeDataListTagsFilteres] = React.useState([]);
	const [dataTable, changeDataTable] = React.useState([]);

	//React useEffect
	React.useEffect(() => {
		return () => dispatchResetCurrentChart();
	}, [dispatchResetCurrentChart]);

	React.useEffect(() => {
		const dateFrom = dataTrend && dataTrend.dateFrom ? new Date(dataTrend.dateFrom) : new Date(new Date().setHours(new Date().getHours() - 1));
		const dateTo = dataTrend && dataTrend.dateTo ? new Date(dataTrend.dateTo) : new Date();
		if (dataTrend.chart) {
			const valuesY = dataTrend.chart.map(el => el.values.map(el => el.y));
			let maxValuesY = valuesY.map(element => Math.max(...element));
			let minValuesY = valuesY.map(element => Math.min(...element));
			const maxValueY = Math.max(...maxValuesY);
			const minValueY = Math.min(...minValuesY);
			if (Math.abs(minValueY) !== Infinity && Math.abs(maxValueY) !== Infinity) {
				changeDomainY([minValueY, maxValueY]);
			}
			changeTrendChart(dataTrend.chart);
			changeshowLoading(false);
		} else {
			dispatchGetTrendChart({
				station: stationID,
				measures: dataTrend.listParameters.map(el => `${tcsID}_${el.tag}_${el.uom}`),
				from: dateFrom.getTime(),
				to: dateTo.getTime(),
			}, stationID, tcsID, dataTrend.id, archive);
		}
		changeDomainX([dateFrom, dateTo]);
		changeTrend(dataTrend);
		changeDatefFilters({ dateFrom: dateFrom, dateTo: dateTo });
	}, [stationID, tcsID, dataTrend, archive, dispatchGetTrendChart]);

	React.useEffect(() => {
		if (JSON.stringify(labels) !== JSON.stringify(dataLabels)) {
			const newList = [];
			labels.forEach(el => {
				el.tagList.forEach(tag => {
					if (newList.findIndex(el => el.tagAcn === tag.tagAcn) < 0) {
						newList.push(tag);
					}
				})
			});
			changeOptionsSelect(labels.map(el => ({
				key: el.idPage,
				value: el.idUI
			})));
			changeValueSelectPage(labels[0].idPage);
			changeDataLabels(labels);
			changeDataListTags(newList);
			changeDataListTagsFilteres(newList)
			changeDataListSelect(labels[0].tagList);
		}
	}, [labels, dataLabels]);

	React.useEffect(() => {
		if (dataLabels) {
			changeValueSelectPage(dataLabels[0].idPage);
			changeDataListSelect(dataLabels[0].tagList);
			changeDataListTagsFilteres(dataListTags);
		}
	}, [activeTabTags, dataLabels, dataListTags])

	React.useEffect(() => {
		if (dataListTags.length > 0) {
			const newListParameters = trend.listParameters.map(el =>
				dataListTags.find(tag => tag.tagAcn === el.tag) ||
				{
					labelTable: "-",
					labelTooltip: "-",
					labelTrend: "-",
					tagAcn: el.tag,
					tagCliente: "-",
					tagUi: "-",
					tagVendor: "-",
					uom: "-"
				}
			);
			changeDataListParameters(newListParameters);
		}
	}, [dataListTags, trend]);

	React.useEffect(() => {
		if (currentChart) {
			const valuesY = currentChart.map(el => el.values.map(el => el.y));
			let maxValuesY = valuesY.map(element => Math.max(...element));
			let minValuesY = valuesY.map(element => Math.min(...element));
			const maxValueY = Math.max(...maxValuesY);
			const minValueY = Math.min(...minValuesY);
			if (Math.abs(minValueY) !== Infinity && Math.abs(maxValueY) !== Infinity) {
				changeDomainY([minValueY, maxValueY]);
			}
			const tableSliders = generateTableSlider(trend.sliders ? trend.sliders.filter(el => el.type === 'verticalSliders') : [], currentChart);
			changeTrendChart(currentChart);
			changeDataTable(tableSliders);
			changeshowLoading(false);
		}
	}, [currentChart, trend]);

	//Change Filetrs date to chart
	const changeFilters = (filters) => {
		const dateFrom = filters.dateFrom.getTime();
		const dateTo = filters.dateTo.getTime();
		changeDatefFilters(filters);
		changeDomainX([dateFrom, dateTo]);
		changeshowLoading(true);
		dispatchGetChartByParameters({
			station: stationID,
			measures: datalistParameters.map(el => `${tcsID}_${el.tagAcn}_${el.uom}`),
			from: filters.dateFrom.getTime(),
			to: filters.dateTo.getTime(),
		})
	}

	//change comments chart
	const onChangeComments = (comments) => {
		let newTrend = { ...trend };
		newTrend.comments = comments;
		changeTrend(newTrend);
	}

	//change slider
	const onChangeSliders = (sliders) => {
		let newTrend = { ...trend };
		newTrend.sliders = sliders;
		const tableSliders = generateTableSlider(sliders.filter(el => el.type === 'verticalSliders'), trendChart);
		changeDataTable(tableSliders);
		changeTrend(newTrend);
	}

	//Return to tableSlider on trends
	const generateTableSlider = (sliders, trendChart) => {
		const tableSliders = [];
		sliders.forEach(slider => {
			let obj = { name: slider.id, value: slider.x, listParam: [] };
			if(slider.x >= domainX[0] && slider.x <= domainX[1]) {
				trendChart.forEach(el => {
					const values = el.values;
					const indexValue = values.reduce(function (r, a, i, aa) {
						return i && Math.abs(aa[r].x - slider.x) < Math.abs(a.x - slider.x) ? r : i;
					}, -1);
					const name = el.name.split('_');
					obj.listParam.push({
						param: name.length > 0 ? name[1] : name,
						value: indexValue >= 0 ? values[indexValue].y : null
					});
				});
			}else {
				obj.listParam = dataTable.find(data => data.name === obj.name) && dataTable.find(data => data.name === obj.name).listParam;
			}
			tableSliders.push(obj);
		});
		return tableSliders;
	}

	//Filter data to search tag
	const filterData = (value) => {
		let newData = [...dataListTags];
		return newData.filter(el => el.tagCliente.toLowerCase().includes(value.toLowerCase()));
	}

	//Search tag to list tags
	const searchTag = (e) => {
		const filtered = filterData(e.target.value);
		if (filtered) {
			changeDataListTagsFilteres(filtered)
		}
	}

	//change select
	const handleSelectChange = (optionKey) => {
		changeDataListSelect(dataLabels.find(tags => tags.idPage === optionKey).tagList);
	}

	//Add parameters to trends
	const addParameters = (el) => {
		let newDataList = [...datalistParameters];
		if (newDataList.length > 0) {
			if (el.uom === newDataList[0].uom) {
				newDataList.push(el);
				changeDataListParameters(newDataList);
				changeListParamiters(newDataList);
				return true;
			} else {
				return false;
			}
		}
		newDataList.push(el);
		changeDataListParameters(newDataList);
		changeListParamiters(newDataList);
		return true;
	}

	//remove parameters to trend
	const removeParameters = (el) => {
		let newDataList = [...datalistParameters];
		if (newDataList.length > 0) {
			if (el.uom === newDataList[0].uom) {
				newDataList = newDataList.filter(tag => tag.tagAcn !== el.tagAcn);
				changeDataListParameters(newDataList);
				changeListParamiters(newDataList);
				return true;
			} else {
				return false;
			}
		}
		newDataList = newDataList.filter(tag => tag.tagAcn !== el.tagAcn);
		changeDataListParameters(newDataList);
		changeListParamiters(newDataList);
		return true;
	}

	//change list parmeters
	const changeListParamiters = (listParameters) => {
		changeshowLoading(true);
		dispatchGetChartByParameters({
			station: stationID,
			measures: listParameters.map(el => `${tcsID}_${el.tagAcn}_${el.uom}`),
			from: dateFilters.dateFrom.getTime(),
			to: dateFilters.dateTo.getTime()
		})
	}

	//render tabs tag forPage or forTags
	const getRenderTabsTag = (activeTabTags) => {
		switch (activeTabTags) {
			case 'forPage':
				return (
					<React.Fragment>
						<div className="padding-left-16 padding-right-16">
							<Select
								valueActive={valueSelectPage}
								options={optionsSelect}
								onChange={handleSelectChange}
							/>
						</div>
						<TrendsListTags
							classStyle="margin-top-16"
							tags={dataListSelect}
							isChecked={(el) => datalistParameters.findIndex(param => param.tagAcn === el.tagAcn) >= 0}
							actiontag={(el) => addParameters(el)}
							icons={['iconaAdded', 'addIcon']}
						/>
					</React.Fragment>
				);
			case 'forTags':
				return (
					<React.Fragment>
						<div className="dflex padding-left-16 padding-right-16">
							<Input
								height={18}
								onChange={searchTag}
							/>
						</div>
						<TrendsListTags
							classStyle="margin-top-16"
							tags={dataListTagsFilteres}
							isChecked={(el) => datalistParameters.findIndex(param => param.tagAcn === el.tagAcn) >= 0}
							actiontag={(el) => addParameters(el)}
							icons={['iconaAdded', 'addIcon']}
						/>
					</React.Fragment>
				)
			default:
				return <Loading />
		}
	}

	//render tabs chart and data set
	const getRenderTabs = (tab) => {
		switch (tab) {
			case 'chart':
				return (
					<React.Fragment>
						<ChartSettings
							actions={[
								{
									label: 'Zoom Area',
									active: zoomActive,
									icon: zoomActive ? 'zoomBlue' : 'zoomPlus',
									action: () => {
										changeCommentsActive(false);
										changeZoomActive(!zoomActive);
									}
								},
								{
									label: 'Attiva Commenti',
									active: commentsActive,
									icon: trend && trend.comments ? 'iconaCommentiPallino' : 'iconaCommenti',
									action: () => {
										changeZoomActive(false);
										changeCommentsActive(!commentsActive);
									}
								},
								{
									label: 'Download',
									icon: 'download',
									tooltipMenu: [
										{ icon: 'download', label: 'Download JPG', action: () => { console.log('Download JPG') } },
										{
											icon: 'download', label: 'Download CSV', action: () => {
												getTrendCSV([{
													station: stationID,
													fileName: nameTrend,
													measures: datalistParameters.map(el => `${tcsID}_${el.tagAcn}_${el.uom}`),
													from: dateFilters.dateFrom.getTime(),
													to: dateFilters.dateTo.getTime()
												}]);
											}
										}
									]
								}
							]}
						/>
						<div>
							<CartesianUITrends
								idSelector={`#cartesian-trend-modal-${stationID}-${tcsID}-${trend.id}`}
								loading={showLoading}
								data={trendChart}
								height={300}
								xDomain={domainX}
								yDomain={domainY}
								xLabel={'t'}
								yLabel={uomY}
								xUnit={'t'}
								yUnit={uomY}
								margin={{ top: 32, right: 40, bottom: 44, left: 40 }}
								colors={colorsUOM}
								onHover={true}
								comments={trend.comments}
								sliders={trend.sliders}
								zoomActive={zoomActive}
								commentsActive={commentsActive}
								slidersActive={true}
								onChangeZoomActive={() => changeZoomActive(false)}
								onChangecommentsActive={() => changeCommentsActive(false)}
								onSaveComments={onChangeComments}
								onSaveSliders={onChangeSliders}
								findTooltipLabel={(tag) => findTooltipLabel(dataListTags, tag)}
							/>
						</div>
						<div className="padding-16">
							<ChartTable itemsTable={itemsTable} dataTable={dataTable} />
						</div>
					</React.Fragment>
				)
			case 'dataSet':
				return (
					<div className="dflex padding-16">
						<TrendsSelectTag title={'Selezione dati'}>
							<Tabs
								itemsTab={[
									{
										text: 'Per pagina',
										key: 'forPage',
										action: () => changeActiveTabTags('forPage')
									},
									{
										text: 'Per tag',
										key: 'forTags',
										action: () => changeActiveTabTags('forTags')
									}
								]}
								currentTab={activeTabTags}
								borderTab={'none'}
							></Tabs>
							{getRenderTabsTag(activeTabTags)}
						</TrendsSelectTag>
						<TrendsSelectTag title={`Dati sul grafico (${datalistParameters && datalistParameters.length})`}>
							<TrendsListTags
								tags={datalistParameters}
								actiontag={(el) => removeParameters(el)}
								icons={['iconaDelete', 'iconaDelete']}
								showLayerAdd={true}
							/>
						</TrendsSelectTag>
					</div>
				)
			default:
				return <Loading />
		}
	}

	const uomY = trend && trend.listParameters.length > 0 && getUomByTag(trend.listParameters[0].uom);
	const itemsTable = datalistParameters ? datalistParameters.map(param => {
		return ({ tag: param.tagAcn, color: colorsUOM(param.uom), label: param.labelTrend, uom: getUomByTag(param.uom) });
	}) : [];

	return (
		<Modal
			showModal={showModal}
			onClose={() => handleShowModal(false)}
			input={{
				value: nameTrend,
				placeholder: 'Nome trend',
				onChange: (e) => {
					changeErrorName(false);
					changeNameTrend(e.target.value);
				},
				error: errorName
			}}
			actionButton={[{
				text: 'Salva Trend', icon: 'save', action: () => {
					let newTrend = { ...trend };
					if (nameTrend.length > 0) {
						newTrend.name = nameTrend;
						newTrend.dateFrom = dateFilters.dateFrom.getTime();
						newTrend.dateTo = dateFilters.dateTo.getTime();
						newTrend.listParameters = datalistParameters.map(el => ({ tag: el.tagAcn, uom: el.uom }));
						newTrend.chart = trendChart;
						saveTrend(newTrend, type)
					} else {
						changeErrorName(true);
					}
				}
			}
			]}
		>
			<Tabs
				itemsTab={[
					{
						text: 'Serie dati',
						key: 'chart',
						action: () => changeActiveTab('chart')
					},
					{
						text: 'Modifica serie dati',
						key: 'dataSet',
						action: () => changeActiveTab('dataSet')
					}
				]}
				currentTab={activeTab}
			>
				<ChartSettings
					classStyle="margin-left-32"
					padding={'0'}
					filters={{
						dateFrom: dateFilters.dateFrom.getTime(),
						dateTo: dateFilters.dateTo.getTime()
					}}
					changeFilters={changeFilters}
				/>
			</Tabs>
			{getRenderTabs(activeTab)}
		</Modal>
	);
}


TrendModalChart.propTypes = {
	dataTrend: PropTypes.object,
	saveTrend: PropTypes.func,
	labels: PropTypes.array
};

TrendModalChart.defaultProps = {
	dataTrend: {},
	saveTrend: () => { },
	labels: null
};

export default React.memo(TrendModalChart, (prevProps, nextProps) => isEqualToObject(prevProps, nextProps));