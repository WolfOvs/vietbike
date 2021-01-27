/**
 * Return true if obj1 === obj2
 * @param {*} obj1 
 * @param {*} obj2 
 */
export const isEqualToObject = (obj1, obj2) => {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const formatDateDayMonthYear = (mill) => {
	const date = new Date(mill / 1000000);
	return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
}

export const formatTime = (date) => {
	const duration = date / 1000000;
	const newDate = new Date(duration);
	let milliseconds = newDate.getMilliseconds(),
		seconds = newDate.getSeconds() < 10 ? `0${newDate.getSeconds()}` : newDate.getSeconds(),
		minutes = newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : newDate.getMinutes(),
		hours = newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();

	return {
		"hours": hours,
		"minutes": minutes,
		"seconds": seconds,
		"milliseconds": milliseconds
	};
}

export const getFormatDuration = (date) => {
	const duration = date / 1000000;
	let seconds = parseInt((duration/1000)%60)
			, minutes = parseInt((duration/(1000*60))%60)
			, hours = parseInt((duration/(1000*60*60))%24);
			
	hours = (hours < 10) ? `0${hours}` : hours;
	minutes = (minutes < 10) ? `0${minutes}` : minutes;
	seconds = (seconds < 10) ? `0${seconds}` : seconds;

	return {
		"hours": hours,
		"minutes": minutes,
		"seconds": seconds,
	}
}