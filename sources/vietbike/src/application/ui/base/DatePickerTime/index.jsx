import React from 'react';
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import IconCollection from '../../base/Icon/svg';
import { InputTime } from './style';

const DatePickerTime = ({ selected, onChange, dateFormat, iconKey, showTimeSelect, showTimeSelectOnly, timeIntervals, timeCaption, timeFormat, maxDate, minDate }) => {
	return (
		<InputTime className="dflex dflex__center" icon={IconCollection[iconKey]}>
			<DatePicker
				className="custom-input-datepicker"
				popperClassName="custom-poppover-datepicker"
				calendarClassName="custom-calendar-datepicker"
				selected={selected}
				dateFormat={dateFormat}
				timeFormat={timeFormat}
				onChange={onChange}
				showTimeSelect={showTimeSelect}
				showTimeSelectOnly={showTimeSelectOnly}
				timeIntervals={timeIntervals}
				timeCaption={timeCaption}
			/>
		</InputTime>
	)
};

DatePickerTime.propTypes = {
	selected: PropTypes.object,
	onChange: PropTypes.func,
	dateFormat: PropTypes.string,
	iconKey: PropTypes.string,
	showTimeSelect: PropTypes.bool,
	showTimeSelectOnly: PropTypes.bool,
	timeIntervals: PropTypes.number,
	timeCaption: PropTypes.string,
	timeFormat: PropTypes.string,
	maxDate: PropTypes.object, 
	minDate: PropTypes.object
};

DatePickerTime.defaultProps = {
	selected: null,
	onChange: () => { },
	dateFormat: 'HH:mm',
	iconKey: 'clock',
	showTimeSelect: true,
	showTimeSelectOnly: true,
	timeIntervals: 15,
	timeCaption: 'Time',
	timeFormat: 'HH:mm',
	maxDate: new Date(), 
	minDate: null
};

export default DatePickerTime;