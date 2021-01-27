import React from 'react';
import PropTypes from "prop-types";
import { Modal, ChartSettings, TrendsListDownload } from "../../ui";

const TrendModalDownload = (props) => {

	const { station, tcs, showModal, onCloseModal, trendsTC, getTrendCSV } = props;

	const [trendsFiltered, changeTrendsFiltered] = React.useState(trendsTC);
	const [checkList, changeCheckList] = React.useState([]);
	const [dateFilters, changeDateFilters] = React.useState({
		dateFrom: new Date(new Date().setDate(new Date().getDate() - 1)),
		dateTo: new Date()
	});

	React.useEffect(() => {
		const newTrends = [...trendsTC].map(el => ({...el, ...{isVisible: true}}));
		changeTrendsFiltered(newTrends);
	}, [trendsTC]);

	const filterData = (value, data) => {
		let newData = [...data];
		return newData.map(el => {
			const newEl = {...el}
			if (!el.name.toLowerCase().includes(value.toLowerCase())) {
				newEl.isVisible = false;
			} else {
				newEl.isVisible = true;
			}
			return newEl;
		});
	}

	const changeTextFilter = (e) => {
		const dataList = filterData(e.target.value, trendsTC);
		changeTrendsFiltered(dataList)
	}

	const handleChangeCheckList = (e, trend) => {
		let newCheckList = [...checkList];
		if(e.target.checked) {
			if(newCheckList.findIndex(el => el.id === trend.id) < 0 || newCheckList.length === 0) {
				newCheckList.push(trend);
				changeCheckList(newCheckList);
			}
		}else {
			if(newCheckList.findIndex(el => el.id === trend.id) >= 0) {
				changeCheckList(newCheckList.filter(el => el.id !== trend.id));
			}
		}
	}

	const downloadCSV = () => {
		let filters = checkList.map(elem => 
			({
				station: station,
				fileName: elem.name,
				measures: elem.listParameters.map(el => `${tcs}_${el.tag}_${el.uom}`),
				from: dateFilters.dateFrom.getTime(),
				to: dateFilters.dateTo.getTime()
			})
		)
		getTrendCSV(filters);
	}

	return (
		<Modal
			title={"Download CSV"}
			showModal={showModal}
			onClose={() => onCloseModal(false)}
			maxWidth={'688px'}
		>
			<ChartSettings
				filters={dateFilters}
				changeFilters={changeDateFilters}
				isButton={false}
			/>
			<TrendsListDownload 
				searchInput={{
					placeholder: 'Cerca trend per nome',
					onChange: changeTextFilter
				}}
				trendsFiltered={trendsFiltered}
				checkList={checkList} 
				handleChangeCheckList={handleChangeCheckList}
				button={{
					action: downloadCSV,
					title: 'Scarica il CSV'
				}}
			/>
		</Modal>
	);
}


TrendModalDownload.propTypes = {
	station: PropTypes.string,
	tcs: PropTypes.string,
	showModal: PropTypes.bool,
	onCloseModal: PropTypes.func,
	trendsTC: PropTypes.array,
	getTrendCSV: PropTypes.func
};

TrendModalDownload.defaultProps = {
	station: '',
	tcs: '',
	showModal: false,
	onCloseModal: () => { },
	trendsTC: [],
	getTrendCSV: () => { }
};

export default TrendModalDownload;