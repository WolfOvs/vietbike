import * as constants from './constants';
import { usePageStateTCS } from './customHook';
import { onTurnDevice, isEqualToObject } from './utilsApp';
import { getChartsParameters, pointIsRed, getDateString, colorsUOM } from './utilsChartsParameters';
import {
	getValueAndUomByTag,
	getValueByTag,
	getLabelByTag,
	getUomByTag,
	getUomByTagData,
	getColorByTreshOld,
	generateClassValues,
	renderColumnTable,
	renderValuesChart,
	getLabelByTagUi,
	renderValuesChartStation,
	chooseImg,
	isOpenPoint,
	isOpenValve,
	renderTablePems,
	configureDataIstoChart,
	configureDataRadarChart,
	findTooltipLabel,
	getLabelbyTagAcn,
	getListParameters
} from './utilsDictionaries';
import { getListParamitersSidebar } from './utilsSidebarParameters';
import { getBreadcrumbTCSDetail, getUrlWithParimeters, getTcsByStation, getStartTC } from './utilsTCS';
import { orderByStatus, getStationsByType, getStationsByID, mappingStationsByString, mappingStationsByNumber, isShowStation, getLabelsByIdPage } from './utilsStation';

export {
	constants,
	getBreadcrumbTCSDetail,
	onTurnDevice,
	orderByStatus,
	getStationsByType,
	getUrlWithParimeters,
	getChartsParameters,
	// utils parameters
	getListParamitersSidebar,
	usePageStateTCS,
	getTcsByStation,
	getStartTC,
	getStationsByID,
	mappingStationsByString,
	mappingStationsByNumber,
	pointIsRed,
	getDateString,
	colorsUOM,
	isShowStation,
	isEqualToObject,
	// dictionaries
	getValueAndUomByTag,
	getValueByTag,
	getLabelByTag,
	getUomByTag,
	getUomByTagData,
	getColorByTreshOld,
	getLabelsByIdPage,
	generateClassValues,
	renderColumnTable,
	renderValuesChart,
	getLabelByTagUi,
	renderValuesChartStation,
	chooseImg,
	isOpenPoint,
	isOpenValve,
	renderTablePems,
	configureDataIstoChart,
	configureDataRadarChart,
	findTooltipLabel,
	getLabelbyTagAcn,
	getListParameters
}