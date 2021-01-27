import React from "react";

import { CardChart, ChartHeader, ChartTable, CartesianUITrends, Loading } from "../../ui";
import { isEqualToObject, getUomByTag, getDateString, colorsUOM, findTooltipLabel, getLabelbyTagAcn } from "../../../utils";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";

function TrendCardChart(props) {
	const { dataTrend, stationID, tcsID, handleShowModal, getTrendCSV, labels, dispatchGetTrendChart } = props;

	//React state
	const [trend, changeTrend] = React.useState(dataTrend);
	const [domainY, changeDomainY] = React.useState([0, 10]);
	const [domainX, changeDomainX] = React.useState([0, 10]);
	const [dataLabels, changeDataLabels] = React.useState(null)
	const [dataListTags, changeDataListTags] = React.useState([]);

	React.useEffect(() => {
		if (JSON.stringify(labels) !== JSON.stringify(dataLabels)) {
			changeDataLabels(labels);
			const newList = [];
			labels.forEach(el => {
				el.tagList.forEach(tag => {
					if (newList.findIndex(el => el.tagAcn === tag.tagAcn) < 0) {
						newList.push(tag);
					}
				})
			});
			changeDataListTags(newList);
		}
	}, [labels, dataLabels, changeDataLabels]);

	React.useEffect(() => {
		const dataFrom = dataTrend && dataTrend.dateFrom ? new Date(dataTrend.dateFrom) : new Date(new Date().setHours(new Date().getHours() - 1))
		const dateTo = dataTrend && dataTrend.dateTo ? new Date(trend.dateTo) : new Date();
		if (dataTrend.chart) {
			const valuesY = dataTrend.chart.map(el => el.values.map(el => el.y));
			let maxValuesY = valuesY.map(element => Math.max(...element));
			let minValuesY = valuesY.map(element => Math.min(...element));
			const maxValueY = Math.max(...maxValuesY);
			const minValueY = Math.min(...minValuesY);
			changeDomainY([minValueY, maxValueY]);
		} else {
			dispatchGetTrendChart({
				station: stationID,
				measures: dataTrend.listParameters.map(el => `${tcsID}_${el.tag}_${el.uom}`),
				from: dataFrom.getTime(),
				to: dateTo.getTime(),
			}, stationID, tcsID, dataTrend.id, false);
		}
		changeDomainX([dataFrom, dateTo]);
		changeTrend(dataTrend);
	}, [stationID, tcsID, trend, dataTrend, dispatchGetTrendChart]);

	const dateFrom = trend && trend.dateFrom ? new Date(trend.dateFrom) : new Date(new Date().setHours(new Date().getHours() - 1));
	const dateTo = trend && trend.dateTo ? new Date(trend.dateTo) : new Date();
	const uomY = trend && trend.listParameters.length > 0 && getUomByTag(trend.listParameters[0].uom);
	const itemsTable = trend && trend.listParameters.map(param => {
		const element = getLabelbyTagAcn(dataListTags, param.tag);
		return ({ tag: param.tag, color: colorsUOM(param.uom), label: element.label, uom: element.uom });
	});
	const id = Date.now();

	// Generate the pdf based on a component
	const printToPdf = (idSelector) => {
		const container = document.getElementById(idSelector);
		container.classList.add('restyle');
		html2canvas(container).then(canvas => {
			var data = canvas.toDataURL();
			var pdfExportSetting = {
			  content: [
				{
				  image: data,
				  width: container.offsetWidth
				}
			  ]
			};
			pdfMake.createPdf(pdfExportSetting).download("test_file.pdf");
		  });
		container.classList.remove('restyle');
	  };

	return (
		<div id={`masonry-card-${id}`}>
		<CardChart
			title={trend.name}
			onExpand={() => handleShowModal(trend)}
		>
			<ChartHeader
				classStyle="margin-bottom-10"
				values={{
					dateFrom: getDateString(dateFrom),
					dateTo: getDateString(dateTo)
				}}
				actionBar={[
					{
						label: 'Download',
						icon: 'download',
						tooltipMenu: [
							{ icon: 'download', label: 'Download JPG', action: () => { printToPdf(`masonry-card-${id}`) } },
							{
								icon: 'download', label: 'Download CSV', action: () => {
									getTrendCSV([{
										station: stationID,
										fileName: trend.name,
										measures: trend.listParameters.map(el => `${tcsID}_${el.tag}_${el.uom}`),
										from: dateFrom.getTime(),
										to: dateTo.getTime()
									}])
								}
							}
						]
					}
				]}
			/>
			<div>
				{trend.chart ? <CartesianUITrends
					idSelector={`#cartesian-trend-${stationID}-${tcsID}-${trend.id}`}
					data={trend.chart || []}
					height={222}
					xDomain={domainX}
					yDomain={domainY}
					xLabel={'t'}
					yLabel={uomY}
					xUnit={'t'}
					yUnit={uomY}
					margin={{ top: 32, right: 32, bottom: 20, left: 20 }}
					colors={colorsUOM}
					findTooltipLabel={(tag) => findTooltipLabel(dataListTags, tag)}
				/> : <Loading type={'component'} />}
			</div>
			<ChartTable itemsTable={itemsTable} />
		</CardChart>
		</div>
	);
}

export default React.memo(TrendCardChart, (prevProps, nextProps) => isEqualToObject(prevProps, nextProps));