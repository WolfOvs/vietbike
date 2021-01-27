import React from 'react';
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import it from "date-fns/locale/it";

import IconCollecgtion from '../../base/Icon/svg';
import { InputDate } from './style';

const DatePickerCalendar = ( { selected, onChangeDate, dateFormat, iconKey, minDate, maxDate, popperPlacement, startDate, endDate } ) => {

	const interval = endDate && startDate && (endDate.getMonth() - startDate.getMonth()) === 0 ? endDate.getDate() - startDate.getDate() : -1;

	return (
		<InputDate className="dflex dflex__center" icon={IconCollecgtion[iconKey]}>
			<DatePicker
				locale={it}
				className="custom-input-datepicker"
				popperClassName="custom-poppover-datepicker"
				calendarClassName="custom-calendar-datepicker"
				dayClassName={date => {
					const equalSelected = (date.getFullYear() === selected.getFullYear() && (date.getMonth() === selected.getMonth())) && (date.getDate() === selected.getDate());
					const minorMinDate = minDate && (date.getFullYear() === minDate.getFullYear()) && (date.getMonth() === minDate.getMonth()) &&(date.getTime() < minDate.getTime());
					const greaterMaxDate = maxDate && (date.getFullYear() === maxDate.getFullYear()) && (date.getMonth() === maxDate.getMonth()) &&(date.getTime() > maxDate.getTime());
					if(equalSelected) {
						return 'custom-day-datepicker selected';
					}
					if(minorMinDate) {
						return 'custom-day-datepicker disabled';
					}
					if(greaterMaxDate) {
						return 'custom-day-datepicker disabled';
					}
					return 'custom-day-datepicker';
				}}
				selected={selected}
				dateFormat={dateFormat}
				onChange={onChangeDate}
				minDate={minDate}
				maxDate={maxDate}
				popperPlacement={popperPlacement}
				startDate={interval > 0 ? startDate : null}
        		endDate={interval > 0 ? endDate : null}
			/>
		</InputDate>
	)
};

DatePickerCalendar.propTypes = {
	selected: PropTypes.object, 
	onChangeDate: PropTypes.func, 
	dateFormat: PropTypes.string, 
	iconKey: PropTypes.string, 
	minDate: PropTypes.object, 
	maxDate: PropTypes.object,
	popperPlacement: PropTypes.string,
	startDate: PropTypes.object, 
	endDate: PropTypes.object
};

DatePickerCalendar.defaultProps = {
	selected: null, 
	onChangeDate: () => {}, 
	dateFormat: 'dd/MM/yyyy', 
	iconKey: 'calendar', 
	minDate: null, 
	maxDate: null,
	popperPlacement: 'top-start',
	startDate: null, 
	endDate: null
};

export default DatePickerCalendar;