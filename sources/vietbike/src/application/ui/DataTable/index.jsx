import React from 'react';

import { DataTableWrapper, TableHeader, TableBody, TableWrapper, FilterWrapper, UpdateLayer } from './styles.js';
import { formatDateDayMonthYear, formatTime, getFormatDuration } from '../Utils';
import Loading from '../LoadingPage';
import { Checkbox, Input } from '../base';

const DataTable = ({ data, activeLayer, showLoading }) => {

	const [loading, changeLoading] = React.useState(true);
	const [dataListCodeUnique, changeCodeList] = React.useState(null);
	const [dataListSistemUnique, changeSistemList] = React.useState(null);
	const [dataListTypeUnique, changeTypeList] = React.useState(null);
	const [dataListDescriptionUnique, changeDescriptionList] = React.useState(null);
	const [dataTable, changeDataTable] = React.useState(data);
	const [filteredData, changeFilteredData] = React.useState(data);
	const [filter, changeFilter] = React.useState({
		"code": [],
		"system": [],
		"type": [],
		"status": [],
		"description": []
	});

	React.useEffect(() => {
		if (JSON.stringify(data) !== JSON.stringify(dataTable)) {
			const dataListCode = data.map(el => ({ name: el.code, isVisible: true }));
			const dataListCodeUnique = uniqueValue(dataListCode);
			changeCodeList(dataListCodeUnique);

			const dataListSistem = data.map(el => ({ name: el.system, isVisible: true }));
			const dataListSistemUnique = uniqueValue(dataListSistem);
			changeSistemList(dataListSistemUnique);

			const dataListType = data.map(el => ({ name: el.type, isVisible: true }));
			const dataListTypeUnique = uniqueValue(dataListType);
			changeTypeList(dataListTypeUnique);

			const dataListDescription = data.map(el => ({ name: el.description, isVisible: true }));
			const dataListDescriptionUnique = uniqueValue(dataListDescription);
			changeDescriptionList(dataListDescriptionUnique);
			changeDataTable(data);
			changeFilteredData(data);
		}
		changeLoading(false);
	}, [data, dataTable]);

	React.useEffect(() => {
		changeLoading(false);
	}, [filteredData])

	React.useEffect(() => {
		changeLoading(showLoading)
	}, [showLoading]);

	const uniqueValue = (array) => {
		const uniq = new Set(array.map(e => JSON.stringify(e)));
		const res = Array.from(uniq).map(e => JSON.parse(e));
		return res;
	}

	const filterData = (value, data) => {
		let newData = [...data];
		newData.forEach(el => {
			if (!el.name.toLowerCase().includes(value.toLowerCase())) {
				el.isVisible = false;
			} else {
				el.isVisible = true;
			}
		});
		return newData;
	}

	const changeTextFilter = (e, type, data) => {
		const dataList = filterData(e.target.value, data);
		switch (type) {
			case 'code':
				changeCodeList(dataList);
				break;
			case 'system':
				changeSistemList(dataList);
				break;
			case 'type':
				changeTypeList(dataList);
				break;
			case 'description':
				changeDescriptionList(dataList);
				break;
			default:
		}
	}

	const onChecked = (event, type, val) => {
		let newFilter = { ...filter };
		if (event.target.checked) {
			newFilter[type].push(val);
		} else {
			const newFilterType = newFilter[type].filter(el => el !== val);
			newFilter[type] = newFilterType
		}
		changeFilter(newFilter);
		filterTable(newFilter)
	}

	const filterTable = (newFilter) => {
		const newData = [];
		dataTable.forEach(el => {
			const filteredCode = newFilter.code.length > 0 ? newFilter.code.findIndex(ele => ele === el.code) >= 0 : true;
			const filteredSistem = newFilter.system.length > 0 ? newFilter.system.findIndex(ele => ele === el.system) >= 0 : true;
			const filteredType = newFilter.type.length > 0 ? newFilter.type.findIndex(ele => ele === el.type) >= 0 : true;
			const filteredStatus = newFilter.status.length > 0 ? newFilter.status.findIndex(ele => ele === el.status) >= 0 : true;
			const filteredDescriptions = newFilter.description.length > 0 ? newFilter.description.findIndex(ele => ele === el.description) >= 0 : true;
			if (filteredCode && filteredSistem && filteredType && filteredStatus && filteredDescriptions) {
				newData.push(el)
			}
		})
		changeFilteredData(newData);
	}

	const resetFilterList = () => {
		changeCodeList(filterData('', dataListCodeUnique));
		changeSistemList(filterData('', dataListSistemUnique));
		changeTypeList(filterData('', dataListTypeUnique));
		changeDescriptionList(filterData('', dataListDescriptionUnique));
	}

	const changeOpenFilter = (el) => {
		const clickedFilter = el.target.parentNode;
		const allFilters = document.querySelectorAll('.head-menu');
		if (clickedFilter.classList.contains('open-filter')) {
			allFilters.forEach(el => {
				el.classList.remove('open-filter');
				if (el.querySelector('.search-box')) {
					el.querySelector('.search-box').value = "";
				}
			});
		} else {
			allFilters.forEach(el => {
				el.classList.remove('open-filter');
				if (el.querySelector('.search-box')) {
					el.querySelector('.search-box').value = "";
				}
			});
			clickedFilter.classList.add('open-filter');
			if (clickedFilter.querySelector('.search-box'))
				clickedFilter.querySelector('.search-box').focus();
		}
		resetFilterList();
	}

	return (
		<TableWrapper>
			<DataTableWrapper>
				<TableHeader>
					<tr>
						<th className="date-head">
							DATA <br />INNESCO
            </th>
						<th className="time-head">
							ORA <br />INNESCO <span> (h:m:s)</span>
						</th>
						<th className="duration-head">
							DURATA <br />ALLARME<span> (h:m:s)</span>
						</th>
						<th className="head-menu code-head">
							CODICE
              <div className={filter.code.length > 0 ? 'toggle-menu checked' : 'toggle-menu'} onClick={(e) => changeOpenFilter(e)}></div>
							<div className="hamburger"></div>
							<FilterWrapper className="filter-wrapper code-head">
									<div className="padding-left-8 padding-right-8 padding-top-16 padding-bottom-16 dflex"><Input id={"code"} onChange={(e) => changeTextFilter(e, 'code', dataListCodeUnique)} /></div>
									<ul>
										{dataListCodeUnique && dataListCodeUnique.map((el, index) => {
											return (
												<li key={index} className={`${!el.isVisible && 'hidden'}`}>
													<Checkbox
														id={el.name}
														name={el.name}
														defaultChecked={filter['code'].findIndex(filter => filter === el.name) >= 0}
														onClick={(e) => {
															changeLoading(true);
															onChecked(e, 'code', el.name, dataTable)
														}}
													/>
													<label>{el.name}</label>
												</li>
											)
										})
										}
									</ul>
								</FilterWrapper>
						</th>
						<th className="head-menu sistem-head">
							SISTEMA
              <div className={filter.system.length > 0 ? 'toggle-menu checked' : 'toggle-menu'} onClick={(e) => changeOpenFilter(e)}></div>
							<div className="hamburger"></div>
							<FilterWrapper className="filter-wrapper sistem-head">
									<div className="padding-left-8 padding-right-8 padding-top-16 padding-bottom-16 dflex"><Input id={"system"} onChange={(e) => changeTextFilter(e, 'system', dataListSistemUnique)} /></div>
									<ul>
										{dataListSistemUnique && dataListSistemUnique.map((el, index) => {
											return (
												<li key={index} className={`${!el.isVisible && 'hidden'}`}>
													<Checkbox
														id={el.name}
														name={el.name}
														defaultChecked={filter['system'].findIndex(filter => filter === el.name) >= 0}
														onClick={(e) => {
															changeLoading(true);
															onChecked(e, 'system', el.name, dataTable)
														}}
													/>
													<label>{el.name}</label>
												</li>
											)
										})
										}
									</ul>
								</FilterWrapper>
						</th>
						<th className="head-menu type-head">
							TIPO
              <div className={filter.type.length > 0 ? 'toggle-menu checked' : 'toggle-menu'} onClick={(e) => changeOpenFilter(e)}></div>
							<div className="hamburger"></div>
							<FilterWrapper className="filter-wrapper type-head">
									<div className="padding-left-8 padding-right-8 padding-top-16 padding-bottom-16 dflex"><Input id={"type"} onChange={(e) => changeTextFilter(e, 'type', dataListTypeUnique)} /></div>
									<ul>
										{dataListTypeUnique && dataListTypeUnique.map((el, index) => {
											return (
												<li key={index} className={`${!el.isVisible && 'hidden'}`}>
													<Checkbox
														id={el.name}
														name={el.name}
														defaultChecked={filter['type'].findIndex(filter => filter === el.name) >= 0}
														onClick={(e) => {
															changeLoading(true);
															onChecked(e, 'type', el.name, dataTable)
														}}
													/>
													<label>{el.name}</label>
												</li>
											)
										})
										}
									</ul>
								</FilterWrapper>
						</th>
						<th className="head-menu status-head">
							STATO
              <div className={filter.status.length > 0 ? 'toggle-menu checked' : 'toggle-menu'} onClick={(e) => changeOpenFilter(e)}></div>
							<div className="hamburger"></div>
							<FilterWrapper className="filter-wrapper status-head">
									<ul>
										<li key={true}>
											<Checkbox
												id={"status-normal"}
												name={"status-normal"}
												defaultChecked={filter['status'].findIndex(filter => filter === true) >= 0}
												onClick={(e) => {
													changeLoading(true);
													onChecked(e, 'status', true, dataTable)
												}}
											/>
											<label>ALLARM</label>
										</li>
										<li key="false">
											<Checkbox
												id={"status-alarm"}
												name={"status-alarm"}
												defaultChecked={filter['status'].findIndex(filter => filter === false) >= 0}
												onClick={(e) => {
													changeLoading(true);
													onChecked(e, 'status', false, dataTable)
												}}
											/>
											<label>NORMAL</label>
										</li>
									</ul>
								</FilterWrapper>
						</th>
						<th className="head-menu">
							DESCRIZIONE
              <div className={filter.description.length > 0 ? 'toggle-menu checked' : 'toggle-menu'} onClick={(e) => changeOpenFilter(e)}></div>
							<div className="hamburger"></div>
							<FilterWrapper className="filter-wrapper desc-head">
								<div className="padding-left-8 padding-right-8 padding-top-16 padding-bottom-16 dflex">
									<Input id={"description"} onChange={(e) => changeTextFilter(e, 'description', dataListDescriptionUnique)} />
								</div>
								<ul>
									{dataListDescriptionUnique && dataListDescriptionUnique.map((el, index) => {
										return (
											<li key={index} className={`${!el.isVisible && 'hidden'}`}>
												<Checkbox
													id={el.name}
													name={el.name}
													defaultChecked={filter['description'].findIndex(filter => filter === el.name) >= 0}
													onClick={(e) => {
														changeLoading(true);
														onChecked(e, 'description', el.name, dataTable)
													}}
												/>
												<label>{el.name}</label>
											</li>
										)
									})
									}
								</ul>
							</FilterWrapper>
						</th>
					</tr>
				</TableHeader>
				<TableBody>
					{filteredData && filteredData.map((el, index) => {
						return (
							<tr key={index} className={el.status === true ? 'alarm' : ''}>
								<td className="date-head">
									{formatDateDayMonthYear(el.date)}
								</td>
								<td className="time-head">
									{`${formatTime(el.date).hours}:${formatTime(el.date).minutes}:${formatTime(el.date).seconds}`} .<span>{`${formatTime(el.date).milliseconds}`}</span>
								</td>
								<td className="duration-head">
									{el.duration ? `${getFormatDuration(el.duration).hours}:${getFormatDuration(el.duration).minutes}:${getFormatDuration(el.duration).seconds}` : ' - '}
								</td>
								<td className="code-head">
									{el.code}
								</td>
								<td className="sistem-head">
									{el.system}
								</td>
								<td className="type-head">
									{el.type}
								</td>
								<td className={`status ${el.status} status-head`}>
									{el.status === false ? 'NORMAL' : 'ALARM'}
								</td>
								<td className="description-data">
									<div>
										{el.description}
									</div>
								</td>
							</tr>
						);
					})}
				</TableBody>
			</DataTableWrapper>
			{loading && <Loading type={'component'} />}
			{activeLayer &&
				<UpdateLayer className="dflex">
					<span>Clicca sul bottone imposta per aggiornare la lista degli allarmi</span>
				</UpdateLayer>
			}
		</TableWrapper>
	)
};

export default DataTable;