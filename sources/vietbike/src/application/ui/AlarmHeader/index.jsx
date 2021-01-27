import React from 'react';

import { ChartHeaderWrapper, Label } from './style.js';
import { AlarmSwitch, Select, Button, DatePickerCalendar, DatePickerTime  } from "../base";

const AlarmHeader = ({ values, selectList, getFilters, changeActiveLayer }) => {

	const [startDate, setStartDate] = React.useState(new Date(values.dateFrom));
	const [endDate, setEndDate] = React.useState(new Date(values.dateTo));
	const [isReal, changeisReal] = React.useState(values.isReal);
	const [valueActive, changeValueActive] = React.useState(values.valueActive);
	const [showButton, changeShowButton] = React.useState(false);

	React.useEffect(() => {
		changeValueActive(values.valueActive);
		changeisReal(values.isReal);
		setStartDate(new Date(values.dateFrom));
		setEndDate(new Date(values.dateTo));
	}, [values]);

	return (
		<ChartHeaderWrapper>
			<div className="dflex dflex__center--space-between">
				<div className="dflex dflex__center">
					<Label>Allarmi dal</Label>
					<DatePickerCalendar
						dateFormat={"dd/MM/yyyy"}
						selected={startDate}
						onChangeDate={date => {
							changeShowButton(true);
							changeActiveLayer(true);
							setStartDate(date)
						}}
						iconKey={'calendar'}
						maxDate={endDate}
						startDate={startDate}
        		endDate={endDate}
					/>
					<DatePickerTime
						selected={startDate}
						onChange={date => {
							changeShowButton(true);
							changeActiveLayer(true);
							setStartDate(date);
						}}
						iconKey={'clock'}
					/>
					<Label>al</Label>
					<DatePickerCalendar
						dateFormat={"dd/MM/yyyy"}
						selected={endDate}
						onChangeDate={date => {
							changeShowButton(true);
							changeActiveLayer(true);
							setEndDate(date)
						}}
						minDate={startDate}
						maxDate={new Date()}
						iconKey={'calendar'}
						startDate={startDate}
        		endDate={endDate}
					/>
					<DatePickerTime
						selected={endDate}
						onChange={date => {
							changeShowButton(true);
							changeActiveLayer(true);
							setEndDate(date);
						}}
						iconKey={'clock'}
						minDate={startDate}
						maxDate={new Date()}
					/>
					<Label>in</Label>
					<Select
						valueActive={valueActive ? valueActive.key : ''}
						options={selectList}
						onChange={(key) => {
							changeShowButton(true);
							changeActiveLayer(true);
							changeValueActive(selectList.find(el => el.key === key));
						}}
					/>
					<div className="select-station">
						{showButton &&
							<Button
								text={"Imposta"}
								height={'28px'}
								padding={'0 8px'}
								action={() => {
									changeShowButton(false);
									changeActiveLayer(false);
									getFilters({
										dateFrom: startDate,
										dateTo: endDate,
										isReal: isReal,
										valueActive: valueActive
									})
								}}
							/>}
					</div>
				</div>
				<AlarmSwitch
					toggleTitle={"Real time"}
					toggleChange={() => {
						changeShowButton(true);
						changeActiveLayer(true);
						changeisReal(!isReal)
					}}
					toggleValue={isReal}
				/>
			</div>
		</ChartHeaderWrapper>
	);
};

export default AlarmHeader;