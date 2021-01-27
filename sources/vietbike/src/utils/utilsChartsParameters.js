import { getUomList } from '../config/uom-list';

export const getChartsParameters = (listParameters, data) => {
	const filtered = Object.keys(data)
		.filter(key => listParameters.includes(key))
		.reduce((obj, key) => {
			obj[key] = data[key];
			return obj;
		}, {});
	return filtered;
}

export const pointIsRed = ({ x, y }) => {
	if (y > x * 0.177999 - 1.83517) return false;
	if (y < Math.pow(x, 2) * 0.00183) return false;
	return true;
}

const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
	"Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];

// const monthNamesEng = ["January", "February", "March", "April", "May", "June",
// 	"July", "August", "September", "October", "November", "December"
// ];

export const getDateString = (date) => {
	if(date) {
		return `
		${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} - ${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()} : ${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}	`
	}
	return '';
}

export const colorsUOM = (uom, scale = 0) => {
	// let uomList = getUomList();
	let uomList = {
			"color":[
				"rgb(238, 89, 139)",
				"rgb(89, 107, 238)",
				"rgb(238, 124, 89)",
				"rgb(0, 209, 131)",
				"rgb(0, 155, 211)",
				"rgb(1, 110, 229)"
			   ]
		   };


	let color = 'rgba(255, 255, 255, 1)';
	
	if (uomList) {
		const index = scale % uomList.color.length;
		color = uomList.color[index]
	}
	return color;
}

