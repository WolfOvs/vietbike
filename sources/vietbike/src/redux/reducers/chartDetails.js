import produce from 'immer';
import {
	GET_CHARTDETAILS_SUCCESS
} from '../actions/chartDetails';

const initialState = {
	
	firstChartData: null,
	secondChartData: null
};

const formatDate = (item) => {
	let dd = item.split("-")[0].padStart(2, "0");
	let mm = item.split("-")[1].padStart(2, "0");
	let yyyy = item.split("-")[2].split(" ")[0];
	let hh = "00";
	let mi = "00";
	let secs = "00.000";
	if(item.length > 10) {
		hh = item.split("-")[2].split(" ")[1].split(":")[0].padStart(2, "0");
		mi = item.split("-")[2].split(" ")[1].split(":")[1].padStart(2, "0");
		secs = item.split("-")[2].split(" ")[1].split(":")[2].padStart(2, "0");
	}

	const formattedDate = yyyy + '-' + mm + '-' + dd + 'T' + hh  + ':' + mi  + ':' + secs + 'Z';
	return formattedDate;
}

const isOdd = (n) => {
	return Math.abs(n % 2) == 1;
 }

const setValues = (item) => {
	let array = [];
	if(item) {
		item.map((el) => {
			if(el && el.dateStart) {
				const dateStart = el.dateStart.length <= 10 ? (el.dateStart + " 00:00:00.000") : el.dateStart;
				let dd = dateStart.split("-")[0].padStart(2, "0");
				let mm = dateStart.split("-")[1].padStart(2, "0");
				let yyyy = dateStart.split("-")[2].split(" ")[0];
				let hh = dateStart.split("-")[2].split(" ")[1].split(":")[0].padStart(2, "0");
				let mi = dateStart.split("-")[2].split(" ")[1].split(":")[1].padStart(2, "0");
				let secs = dateStart.split("-")[2].split(" ")[1].split(":")[2].padStart(2, "0");
				
				mm = (parseInt(mm) - 1).toString();

				const date = new Date(yyyy, mm, dd, hh, mi, secs);
				const formattedDate = date.getTime();

				const dateTooltip =  dd + '/' + mm + '/' +  yyyy + ' ' + hh + ':' + (mm.toString().length <= 1 ? '0' : '') + date.getUTCMinutes();

				if(el.value) {
					const value = el.value.replaceAll('.', '');
					
					array.push({
						x: formattedDate,
						y: value,
						date: dateTooltip,
						result: el.accettato,
						noteSuggerimento: el.noteSuggerimento,
						tipoSuggerimento: el.tipoSuggerimento
					});
				}
			}

			if(el && el.dateEnd) {
				const dateEnd = el.dateEnd.length <= 10 ? (el.dateEnd + " 00:00:00.000") : el.dateEnd;
				let dd = dateEnd.split("-")[0].padStart(2, "0");
				let mm = dateEnd.split("-")[1].padStart(2, "0");
				let yyyy = dateEnd.split("-")[2].split(" ")[0];
				let hh = dateEnd.split("-")[2].split(" ")[1].split(":")[0].padStart(2, "0");
				let mi = dateEnd.split("-")[2].split(" ")[1].split(":")[1].padStart(2, "0");
				let secs = dateEnd.split("-")[2].split(" ")[1].split(":")[2].padStart(2, "0");
				
				mm = (parseInt(mm) - 1).toString();

				const date = new Date(yyyy, mm, dd, hh, mi, secs);
				const formattedDate = date.getTime();

				const dateTooltip =  dd + '/' + mm + '/' +  yyyy + ' ' + hh + ':' + (mm.toString().length <= 1 ? '0' : '') + date.getUTCMinutes();

				if(el.value) {
					const value = el.value.replaceAll('.', '');
					
					array.push({
						x: formattedDate,
						y: value,
						date: dateTooltip,
						result: el.accettato,
						noteSuggerimento: el.noteSuggerimento,
						tipoSuggerimento: el.tipoSuggerimento
					});
				}
			}

			// let dd = el.date.split("-")[0].padStart(2, "0");
			// let mm = el.date.split("-")[1].padStart(2, "0");
			// let yyyy = el.date.split("-")[2].split(" ")[0];
			// let hh = el.date.split("-")[2].split(" ")[1].split(":")[0].padStart(2, "0");
			// let mi = el.date.split("-")[2].split(" ")[1].split(":")[1].padStart(2, "0");
			// let secs = el.date.split("-")[2].split(" ")[1].split(":")[2].padStart(2, "0");

			// mm = (parseInt(mm) - 1).toString();

			// const date = new Date(yyyy, mm, dd, hh, mi, secs);
			// const formattedDate = date.getTime();

			// const dateTooltip =  dd + '/' + mm + '/' +  yyyy + ' ' + hh + ':' + (mm.toString().length <= 1 ? '0' : '') + date.getUTCMinutes();

			// if(el.value) {
			// 	const value = el.value.replaceAll('.', '');
				
			// 	array.push({
			// 		x: formattedDate,
			// 		y: value,
			// 		date: dateTooltip,
			// 		result: el.accettato,
			// 		noteSuggerimento: el.noteSuggerimento,
			// 		tipoSuggerimento: el.tipoSuggerimento
			// 	});
			// }

		});
		return array.length > 0 ? array : [{x: '', y: ''}];
	} else {
		return [{x: '', y: ''}];
	}
}

export default (state = initialState, action) => (
	produce(state, draft => {
		switch (action.type) {
			case GET_CHARTDETAILS_SUCCESS:
				const chart = action.payload.chartData;
				if(chart.status === 'OK') {
					draft.firstChartData = {
						id: 1,
						name: "NominePortateLimiti",
						dateFrom: formatDate(chart.startDate),
						dateTo: formatDate(chart.endDate),
						listParameters: [
							{
								tag: "Nomina",
								uom: "AC"
							},
							{
								tag: "Portata",
								uom: "AC"
							},
							{
								tag: "LimitiAttuali",
								uom: "AC"
							},
							{
								tag: "LimitiSuggeriti",
								uom: "AC"
							},
							{
								tag: "LimitiRifiutati",
								uom: "AC"
							}	
						],
						sliders: [],
						comments: null,
						dataTable: [],
						chart: [
							{
								name: "Nomina",
								values: setValues(chart.nomine),
								uom: "AC",
								color: "rgb(238, 89, 139)"
							},
							{
								name: "Portata",
								values: setValues(chart.portata),
								uom: "AC",
								color: "rgb(89, 107, 238)"
							},
							{
								name: "LimitiAttuali",
								values: setValues(chart.limitiAttuali),
								uom: "AC",
								color: "rgb(238, 124, 89)"
							},
							{
								name: "LimitiSuggeriti",
								values: setValues(chart.limitiSuggeriti),
								uom: "AC",
								color: "rgb(0, 209, 131)"
							},
							// {
							// 	name: "LimitiRifiutati",
							// 	values: setValues(chart.limitiSuggeriti),
							// 	uom: "AC",
							// 	color: "rgb(0, 209, 131)"
							// }
						]
					}
					
					draft.secondChartData = {
						id: 1,
						name: "Pressioni",
						dateFrom: formatDate(chart.startDate),
						dateTo: formatDate(chart.endDate),
						listParameters: [
							{
								tag: "PressioneMonte",
								uom: "AZ"
							},
							{
								tag: "PressioneValle",
								uom: "AZ"
							}
							
						],
						sliders: [],
						comments: null,
						dataTable: [],
						chart: [
							{
								name: "PressioneMonte",
								values: setValues(chart.pressioneIN),
								uom: "AZ",
								color: "rgb(89,222,238)"
							},
							{
								name: "PressioneValle",
								values: setValues(chart.pressioneOUT),
								uom: "AZ",
								color: "rgb(1, 110, 229)"
							}
						]
					}

					let changeDataLimiti = draft.firstChartData.chart;
					let changeDataSuggeriti = draft.firstChartData.chart;
					
					let firstDomainX = draft.firstChartData.chart[1].values[0].x;
					let lastDomainX = draft.firstChartData.chart[1].values[draft.firstChartData.chart[1].values.length - 1].x;
					
					 if(changeDataLimiti[2].values.length > 0) {

					 	let newSuggeriti = [];
					 	let newLimiti = [];

					 	changeDataLimiti[2].values.forEach((el, index) => {
							if(el.x && el.y){
								if(index === 0) {
									let obj = {
										x: firstDomainX,
										y: changeDataLimiti[2].values[0].y
									}
									let obj2 = {
										x: changeDataLimiti[2].values[1] ? changeDataLimiti[2].values[1].x : lastDomainX,
										y: changeDataLimiti[2].values[0].y
									}
									newSuggeriti.push(el)
									newSuggeriti.push(obj2)
								}
   
								if(index === 1) {
									let obj = {
										x: changeDataLimiti[2].values[index + 1] ? changeDataLimiti[2].values[index + 1].x : lastDomainX,
										y: changeDataLimiti[2].values[index].y
									}
									newSuggeriti.push(el)
									newSuggeriti.push(obj)
								}
   
								if(index > 1) {
									let obj = {
										x: changeDataLimiti[2].values[index + 1] ? changeDataLimiti[2].values[index + 1].x : lastDomainX,
										y: changeDataLimiti[2].values[index].y
									}
									newSuggeriti.push(el)
									newSuggeriti.push(obj)
								}
							}
					 		
					 	})

						let array = [];

						 changeDataLimiti[3].values.forEach((el, index) => {
								array.push(el);

								if(isOdd(index)) {
									let objSuggeriti = {
										color: 'rgb(0, 209, 131)',
										name: 'LimitiSuggeriti',
										uom:'AC',
										values: null
									}
									objSuggeriti.values = array;
									changeDataLimiti.push(objSuggeriti);

									array = [];
								}
						 });
						 
						 changeDataLimiti.splice(3, 1);
						 console.log('changeDataLimiti', changeDataLimiti)
					 }

				} else {
					draft.chartData = {};
				}
				break;
			default:
				break;
		}
	})
)