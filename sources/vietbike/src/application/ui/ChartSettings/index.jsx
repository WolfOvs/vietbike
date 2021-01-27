import React from 'react';
import PropTypes from "prop-types";

import { ChartSettingsContainer, Label, CheckboxLabel } from './style.js';
import { DatePickerCalendar, DatePickerTime, Button, TooltipMenu, Select, Checkbox } from '../base';
import Icon from '../base/Icon';

const ChartSettings = ({ filters, changeDateFilters, changeCheckboxFilters, updateDate, isButton, classStyle, padding, zoom, zoomAction, update, updateAction }) => {

	const [startDate, setStartDate] = React.useState(new Date());
	const [endDate, setEndDate] = React.useState(new Date());
	const [showButton, changeShowButton] = React.useState(false);

	React.useEffect(() => {
		if (filters) {
			setStartDate(new Date(filters.dateFrom));
			setEndDate(new Date(filters.dateTo));
		}
	}, [filters]);

	const handleDate = (date, type) => {
		switch (type) {
			case 'startDate':
				if (new Date().getTime() - date.getTime() >= 0) {
					setStartDate(date);
					if (endDate.getTime() - date.getTime() < 0) {
						setEndDate(date);
					}
					if (isButton) {
						changeShowButton(true);
					} else {
						changeDateFilters({
							dateFrom: date,
							dateTo: endDate,
						})
					}
				}
				break;
			case 'endDate':
				if ( date.getTime() - startDate.getTime() >= 0) {
					setEndDate(date);
					if (isButton) {
						changeShowButton(true);
					} else {
						changeDateFilters({
							dateFrom: startDate,
							dateTo: date,
						});
					}
				}
				break;
			default:
				break;
		}
	}

	const setCheckboxFilters = (item, checkbox) => {
		let options = checkbox;
		options.map((option) => {
			if(option.id === item.id) {
				option.checked = !item.checked;
			}
		});
		changeCheckboxFilters(options);
		updateAction(true);
	}

	return (
		<ChartSettingsContainer className={classStyle} padding={padding}>
			{filters &&	<div className={`dflex dflex__center--space-between ${!filters && 'dflex__center--justify-content-flexend'}`}>
					<div className="dflex dflex__center">
						<Label>Dati dal</Label>
						<DatePickerCalendar
							dateFormat={"dd/MM/yyyy"}
							selected={startDate}
							onChangeDate={date => handleDate(date, 'startDate')}
							iconKey={'iconCalendar'}
							maxDate={endDate}
							startDate={startDate}
							endDate={endDate}
						/>
						<DatePickerTime
							selected={startDate}
							onChange={date => handleDate(date, 'startDate')}
							iconKey={'iconClock'}
						/>
						<Label>al</Label>
						<DatePickerCalendar
							dateFormat={"dd/MM/yyyy"}
							selected={endDate}
							onChangeDate={date => handleDate(date, 'endDate')}
							minDate={startDate}
							//maxDate={new Date()}
							iconKey={'iconCalendar'}
							startDate={startDate}
							endDate={endDate}
						/>
						<DatePickerTime
							selected={endDate}
							onChange={date => handleDate(date, 'endDate')}
							iconKey={'iconClock'}
							minDate={startDate}
						/>
						<div className="select-station">
							{showButton &&
								<Button
									text={"Imposta"}
									className={'zoom-filter-button'}
									height={'35px'}
									width={'100px'}
									padding={'0 11px'}
									action={() => {
										if (isButton) changeShowButton(false);
										changeDateFilters({
											dateFrom: startDate,
											dateTo: endDate,
										})
										updateDate();
									}}
								/>}
						</div>
					</div>
					<div className="dflex dflex__center">
						{ filters.checkbox.map((item, index) => {
							return(
								<div className="dflex dflex__center" key={index}>
									<Checkbox 
										id={item.id}
										name={item.name}
										defaultChecked={item.checked}
										onClick={() => {setCheckboxFilters(item, filters.checkbox);}}
									/>
									<CheckboxLabel 
										backgroundColor={item.color}
										id={item.id}
										name={item.name}>
											{item.name}
											<span></span>
									</CheckboxLabel>
								</div>
							);}
						)}
						<Button
							className={'zoom-filter-button' + (zoom ? ' active' : '')}
							text={zoom ? 'Zoom Area Attiva' : 'Zoom'}
							icon={zoom ? 'closeX' : 'zoomIcon'}
							sizeIcon={zoom ? 30 : 22}
							height={'35px'}
							width={zoom ? '215px' : '100px'}
							padding={'0 11px'}
							action={zoomAction}
						/>
									
					</div>

				</div>
			}
		</ChartSettingsContainer>
	)
};

ChartSettings.propTypes = {
	filters: PropTypes.object,
	actions: PropTypes.array,
	changeFilters: PropTypes.func,
	isButton: PropTypes.bool,
	padding: PropTypes.string,
	classStyle: PropTypes.string
};

ChartSettings.defaultProps = {
	filters: null,
	actions: null,
	changeFilters: () => { },
	isButton: true,
	padding: '16px',
	classStyle: ''
};

export default ChartSettings;