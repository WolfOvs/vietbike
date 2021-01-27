import config from '../config/api-config';
import { fetchResource } from './api';

const pipelinesService = {
	getPipelinesList(options) {
		const url = config.endpoints().urlPipelines;

	//   	 return [
	//  			   {
	//  				  "coordinates":{
	//  					 "longitudine":"9.941000000",
	//  					 "latitudine":"44.106000000"
	//  				  },
	//  				  "idMetanodotto":45860,
	//  				  "descMetanodotto":"S. Stefano-Livorno",
	//  				  "areaImpiantistica":"BOLANO",
	//  				  "pressione":"23.88",
	//  				  "portata":"23503.13",
	//  				  "insertDate":"20-11-2020",
	//  				  "isOpenPopup":true,
	//  				  "id":45860
	//  			   },
	//  			   {
	//  				  "coordinates":{
	//  					 "longitudine":"10.547000000",
	//  					 "latitudine":"43.600000000"
	//  				  },
	//  				  "idMetanodotto":14083,
	//  				  "descMetanodotto":"Palaia - Collesalvetti",
	//  				  "areaImpiantistica":"MORTAIOLO",
	//  				  "pressione":"55.60",
	//  				  "portata":"-240171.00",
	//  				  "insertDate":"20-11-2020",
	//  				  "isOpenPopup":true,
	//  				  "id":14083
	//  			   },
	//  			   {
	//  				  "coordinates":{
	//  					 "longitudine":"10.548000000",
	//  					 "latitudine":"43.108000000"
	//  				  },
	//  				  "idMetanodotto":4500100,
	//  				  "descMetanodotto":"Livorno - Piombino",
	//  				  "areaImpiantistica":"CAMPIGLIA",
	//  				  "pressione":"47.48",
	//  				  "portata":"-48915.00",
	//  				  "insertDate":"20-11-2020",
	//  				  "isOpenPopup":true,
	//  				  "id":4500100
	//  			   },
	//  			   {
	//  				  "coordinates":{
	//  					 "longitudine":"11.480000000",
	//  					 "latitudine":"43.113000000"
	//  				  },
	//  				  "idMetanodotto":4103653,
	//  				  "descMetanodotto":"Chiusi - Torrenieri",
	//  				  "areaImpiantistica":"ABBADIA",
	//  				  "pressione":"47.20",
	//  				  "portata":"4300.31",
	//  				  "insertDate":"20-11-2020",
	//  				  "isOpenPopup":true,
	//  				  "id":4103653
	//  			   },
	//  			   {
	//  				  "coordinates":{
	//  					 "longitudine":"11.005000000",
	//  					 "latitudine":"43.627000000"
	//  				  },
	//  				  "idMetanodotto":4101549,
	//  				  "descMetanodotto":"Der. Per Siena",
	//  				  "areaImpiantistica":"EMPOLI SUD",
	//  				  "pressione":"47.58",
	//  				  "portata":"0.00",
	//  				  "insertDate":"20-11-2020",
	//  				  "isOpenPopup":true,
	//  				  "id":4101549
	//  			   },
	//  			   {
	//  				  "coordinates":{
	//  					 "longitudine":"11.760000000",
	//  					 "latitudine":"43.189000000"
	//  				  },
	//  				  "idMetanodotto":4510530,
	//  				  "descMetanodotto":"Met. Foiano della Chiana - Torrenieri",
	//  				  "areaImpiantistica":"SINALUNGA",
	//  				  "pressione":null,
	//  				  "portata":"59090.63",
	//  				  "insertDate":"20-11-2020",
	//  				  "isOpenPopup":true,
	//  				  "id":4510530
	//  			   },
	//  			   {
	//  				  "coordinates":{
	//  					 "longitudine":"11.480000000",
	//  					 "latitudine":"43.113000000"
	//  				  },
	//  				  "idMetanodotto":4104828,
	//  				  "descMetanodotto":"Chiusi - Torrenieri",
	//  				  "areaImpiantistica":"RANIERI III",
	//  				  "pressione":null,
	//  				  "portata":"0.00",
	//  				  "insertDate":"20-11-2020",
	//  				  "isOpenPopup":true,
	//  				  "id":4104828
	//  			   },
	//  			   {
	//  				  "coordinates":{
	//  					 "longitudine":"11.000",
	//  					 "latitudine":"43.699"
	//  				  },
	//  				  "idMetanodotto":145572,
	//  				  "descMetanodotto":"Montelupo - Palaia",
	//  				  "areaImpiantistica":"SUESE OLT",
	//  				  "pressione":"58.68",
	//  				  "portata":"448500.00",
	//  				  "insertDate":"20-11-2020",
	//  				  "isOpenPopup":true,
	//  				  "id":145572
	//  			   },
	//  			   {
	//  				  "coordinates":{
	//  					 "longitudine":"11.003000000",
	//  					 "latitudine":"43.874000000"
	//  				  },
	//  				  "idMetanodotto":4500800,
	//  				  "descMetanodotto":"Montelupo - Agliana",
	//  				  "areaImpiantistica":"LASTRA A SIGNA",
	//  				  "pressione":null,
	//  				  "portata":"-21880.00",
	//  				  "insertDate":"20-11-2020",
	//  				  "isOpenPopup":true,
	//  				  "id":4500800
	//  			   },
	//  			   {
	//  				  "coordinates":{
	//  					 "longitudine":"10.337000000",
	//  					 "latitudine":"43.594000000"
	//  				  },
	//  				  "idMetanodotto":14557,
	//  				  "descMetanodotto":"All. OLT di Livorno (tratto terra)",
	//  				  "areaImpiantistica":"SUESE OLT",
	//  				  "pressione":"58.68",
	//  				  "portata":"448500.00",
	//  				  "insertDate":"20-11-2020",
	//  				  "isOpenPopup":true,
	//  				  "id":14557
	//  			   }
	//  			   ,
	//  			   {
	//  				  "coordinates":{
	//  					 "longitudine":"11.828000000",
	//  					 "latitudine":"43.071000000"
	//  				  },
	//  				  "idMetanodotto":145572,
	//  				  "descMetanodotto":"Chiusi torrenieri2",
	//  				  "areaImpiantistica":"SUESE OLT",
	//  				  "pressione":"58.68",
	//  				  "portata":"448500.00",
	//  				  "insertDate":"20-11-2020",
	//  				  "isOpenPopup":true,
	//  				  "id":145572
	//  			   }
	//   ]
		      return fetchResource(url, {method: 'POST', body: JSON.stringify({})})
		      	.then(res => res.pipelines)
		      	.catch((error) => {
		      		console.error('Error:', error);
		      	  });
	}
};

/* Call rest api get list stations */
export default pipelinesService;
