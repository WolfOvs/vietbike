export const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const unitOfmeasure = {
	'temperatura': { value: 'DegC', exp: '' },
	'pressione': { value: 'bar', exp: '' },
	'umidita': { value: '%', exp: '' },
	'densita': { value: 'Kg/Sm3', exp: '' },
	'potere_calorifico': { value: 'KJ/Kg', exp: '' },
	'densita_molecolare': { value: '', exp: '' },

	'velocita_gg': { value: 'rpm', exp: '' },
	'velocita_tp': { value: 'rpm', exp: '' },
	'velocita_co_ce': { value: 'rpm', exp: '' },
	'potenza': { value: 'MW', exp: '' },
	'ore_marcia_totali': { value: 'h', exp: '' },
	'num_di_avviamenti': { value: '', exp: '' },

	// TC PAGE
	'diff_pres_asp_tuga': { value: 'mBardD', exp: '' },
	'nox': { value: 'mg/Nm', exp: '' },
	'co': { value: 'mg/Nm', exp: '' },
	'o2': { value: '%', exp: '' },
	'temp_asp_coce_1': { value: 'DegC', exp: '' },
	'pres_asp_coce_1': { value: 'barG', exp: '' },
	'temp_mand_coce_1': { value: 'DegC', exp: '' },
	'pres_mand_coce_1': { value: 'barG', exp: '' },
	'flow_coce_1': { value: 'kSm3/h', exp: '' },
	'antipumping_1': { value: '%', exp: '' },
	'pw_iso_1': { value: '%', exp: '' },
	'temp_asp_coce_2': { value: 'DegC', exp: '' },
	'pres_asp_coce_2': { value: 'barG', exp: '' },
	'temp_mand_coce_2': { value: 'DegC', exp: '' },
	'pres_mand_coce_2': { value: 'barG', exp: '' },
	'flow_coce_2': { value: 'kSm3/h', exp: '' },
	'antipumping_2': { value: '%', exp: '' },
	'pw_iso_2': { value: '%', exp: '' },
	'temp_asp_tuga': { value: 'DegC', exp: '' },
	'pres_asp_tuga': { value: 'barG', exp: '' },
	'temp_mand_coax': { value: 'DegC', exp: '' },
	'pres_mand_coax': { value: 'barG', exp: '' },
	'temp_sca_tp': { value: 'DegC', exp: '' },
	'pres_sca_gg': { value: 'barG', exp: '' },
	'temp_sca_gg': { value: 'DegC', exp: '' },
	'gas_fuel': { value: 'kSm3/h', exp: '' },

	// MAPPING DLE PAGE
	"P2SEL": 'psi',
	"PS3SEL": 'psi',
	"PS3EST": 'psi',
	"P54SEL": 'psi',
	"T2SEL": 'degF',
	"T3SEL": 'degF',
	"T54SEL": 'degF',
	"T54_REF": 'degF',
	"TFLMAX_ABAL": 'degF',
	"TFLMAX_BIAS": 'degF',
	"TFLCYCS_BIAS": 'degF',
	"TFLMIN_ABAL": 'degF',
	"TFLIREF": 'degF',
	"TFLIREF_ABAL": 'degF',
	"TFLIREF_BIAS": 'degF',
	"TFLOREF_ABAL": 'degF',
	"TFLOREF_BIAS": 'degF',
	"TFLMIN_BIAS": 'degF',
	"WF36_CNTRL": 'n/d',
	"LHVSEL": 'BTU/lbm',
	"SGSEL": 'n/d',
	"CP_CV_SEL": 'n/d',
	"ZGASSEL": 'n/d',
	"MFCO2": 'n/d',
	"MFN2": 'n/d',
	"BRNDMD": 'icnts',
	"BRNREQ": 'icnts',
	"TFLAMEPCT": 'pct',
	"TFLMAX": 'degF',
	"TFLCYCS": 'degF',
	"TFLMIN": 'degF',
	"TFLPDFS": 'degF',
	"TFLIDFS": 'degF',
	"TFLODFS": 'degF',
	"TFLOREF": 'degF',
	"WFQPERRCOR": 'pct',
	"PX36_A": 'psia',
	"PX36_B": 'psia',
	"PX36SEL": 'psi',
	"P_ACSTICJ": 'psi',
	"BWFQPERRSP": 'psi',
	"LABCINHIB": 'LOG',
	"XNGGSEL": 'rpm',
	"XNGG_REF": 'rpm',
	"XNGGR": 'rpm',
	"XNPTSEL": 'rpm',
	"XNPT_REF": 'rpm',
	"POWER": 'KW',
	"DWB36": 'pps',
	"DWB36MAN": 'n/d',
	"DWB36PCT": 'n/pct',
	"DWB36MAX": 'pps',
	"CDPSEL": '%',
	"WB3": 'pps',
	"WB26": 'pps',
	"WFMAX": 'pph',
	"WF36DMD": 'pph',
	"WFLBO": 'pph',
	"WFPLTDMD": 'pph',
	"WFPILM": 'pph',
	"WFINRDMD": 'pph',
	"WFINRM": 'pph',
	"WFOTRDMD": 'pph',
	"WFOTRM": 'pph',
	"GP1OSEL": 'psi',
	"GP1ISEL": 'psi',
	"GP1PSEL": 'psi',
	"GP2ISEL": 'psi',
	"GP2OSEL": 'psi',
	"GP2PSEL": 'psi',
	"TFUELSEL": 'degC',
	"PLTSEL": '%',
	"INRSEL": '%',
	"OTRSEL": '%',
	"NOX": 'mg/NM',
	"CO": 'mg/NM',
	"O2": '%',

	//Mapping Vibration page
	"joining_side_x": { value: 'n/d', exp: '' },
	"joining_side_x_amp_1": { value: 'n/d', exp: '' },
	"joining_side_x_amp_2": { value: 'n/d', exp: '' },
	"joining_side_x_phase_1": { value: 'n/d', exp: '' },
	"joining_side_y": { value: 'n/d', exp: '' },
	"joining_side_y_amp_1": { value: 'n/d', exp: '' },
	"joining_side_y_amp_2": { value: 'n/d', exp: '' },
	"joining_side_y_phase_1": { value: 'n/d', exp: '' },
	"joining_opposite_side_x": { value: 'n/d', exp: '' },
	"joining_opposite_side_x_amp_1": { value: 'n/d', exp: '' },
	"joining_opposite_side_x_amp_2": { value: 'n/d', exp: '' },
	"joining_opposite_side_x_phase_1": { value: 'n/d', exp: '' },
	"joining_opposite_side_y": { value: 'n/d', exp: '' },
	"joining_opposite_side_y_amp_1": { value: 'n/d', exp: '' },
	"joining_opposite_side_y_amp_2": { value: 'n/d', exp: '' },
	"joining_opposite_side_y_phase_1": { value: 'n/d', exp: '' },
	"axial_displacements_a_coce": { value: 'n/d', exp: '' },
	"axial_displacements_b_coce": { value: 'n/d', exp: '' },
	"gas_generator_dm2000": { value: 'n/d', exp: '' },
	"gas_generator_filter_gg": { value: 'n/d', exp: '' },
	"seismic_power_turbine_1": { value: 'n/d', exp: '' },
	"seismic_power_turbine_1_1x": { value: 'n/d', exp: '' },
	"seismic_power_turbine_1_2x": { value: 'n/d', exp: '' },
	"seismic_power_turbine_2": { value: 'n/d', exp: '' },
	"seismic_power_turbine_2_1x": { value: 'n/d', exp: '' },
	"seismic_power_turbine_2_2x": { value: 'n/d', exp: '' },
	"bearing_1_x": { value: 'n/d', exp: '' },
	"bearing_1_x_amp_1x": { value: 'n/d', exp: '' },
	"bearing_1_x_amp_2x": { value: 'n/d', exp: '' },
	"bearing_1_x_phase_1x": { value: 'n/d', exp: '' },
	"bearing_2_x": { value: 'n/d', exp: '' },
	"bearing_2_x_amp_1x": { value: 'n/d', exp: '' },
	"bearing_2_x_amp_2x": { value: 'n/d', exp: '' },
	"bearing_2_x_phase_1x": { value: 'n/d', exp: '' },
	"bearing_1_y": { value: 'n/d', exp: '' },
	"bearing_1_y_amp_1x": { value: 'n/d', exp: '' },
	"bearing_1_y_amp_2x": { value: 'n/d', exp: '' },
	"bearing_1_y_phase_1x": { value: 'n/d', exp: '' },
	"bearing_2_y": { value: 'n/d', exp: '' },
	"bearing_2_y_amp_1x": { value: 'n/d', exp: '' },
	"bearing_2_y_amp_2x": { value: 'n/d', exp: '' },
	"bearing_2_y_phase_1x": { value: 'n/d', exp: '' },
	"axial_displacements_a_tuga": { value: 'n/d', exp: '' },
	"axial_displacements_b_tuga": { value: 'n/d', exp: '' },
};

//Verify param id
export const stationsParam = '0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21'
export const turbochangerParam = '0|1|2|3|4|5|6|7'

//Url accordion menu sidebar
export const urlAccordionMenu = (currentStationId, currentTurbochargerId) => {
	if (Number(currentStationId) === 2) {
		return (
			[
				{
					titleAccordion: window.dictionary('misurati'),
					paths: [
						{
							title: window.dictionary('tenuta_gas_co_ce'),
							url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/tenutaGasCOCE/coce1`
						},
						{
							title: window.dictionary('olio'),
							url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/olio/sintetico`
						},
						{
							title: window.dictionary('mappatura_dle'),
							url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/mappaturaDLE`
						},
						{
							title: window.dictionary('vibrazioni'),
							url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/vibrazioni/GG`
						},
						{
							title: window.dictionary('ventilazione'),
							url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/ventilazione/cabinato`
						},
						{
							title: window.dictionary('exhaustSpacesWheel'),
							url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/scaricoSpaziRuota`
						},
						{
							title: window.dictionary('gas_combustibile'),
							url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/gasCombustibile`
						}
					]
				},
				{
					titleAccordion: window.dictionary('calcolati'),
					paths: [
						{
							title: window.dictionary('prestazioni'),
							url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/prestazioni/coax`
						},
						{
							title: 'PEMS',
							url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/pems`
						},
						{
							title: window.dictionary('curve'),
							url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/curva/coce1`
						}
					]
				}
			]
		)
	}
	return (
		[
			{
				titleAccordion: window.dictionary('misurati'),
				paths: [
					{
						title: window.dictionary('tenuta_gas_co_ce'),
						url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/tenutaGasCOCE/coce1`
					},
					{
						title: window.dictionary('olio'),
						url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/olio/sintetico`
					},
					{
						title: window.dictionary('mappatura_dle'),
						url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/mappaturaDLE`
					},
					{
						title: window.dictionary('vibrazioni'),
						url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/vibrazioni/GG`
					},
					{
						title: window.dictionary('ventilazione'),
						url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/ventilazione/cabinato`
					},
					{
						title: window.dictionary('exhaustSpacesWheel'),
						url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/scaricoSpaziRuota`
					},
					{
						title: window.dictionary('gas_combustibile'),
						url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/gasCombustibile`
					}
				]
			},
			{
				titleAccordion: window.dictionary('calcolati'),
				paths: [
					{
						title: window.dictionary('prestazioni'),
						url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/prestazioni/coax`
					},
					{
						title: window.dictionary('curve'),
						url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/curva/coce1`
					}
				]
			}
		]
	)
};

//Url menu sidebar
export const urlMenuSidebar = (currentStationId, currentTurbochargerId) => [
	{
		key: "panoramicaTcs",
		title: window.dictionary('panoramica_tc'),
		url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/trend`,
		active: false
	},
	{
		key: "panoramicaStazione",
		title: window.dictionary('trend'),
		url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/trend`,
		active: true
	},
	{
		key: "avvisiTcs",
		title: window.dictionary('avvisi'),
		url: `/panoramicaStazione/${currentStationId}/panoramicaTCS/${currentTurbochargerId}/avvisi`,
		active: false
	}
]

// check old data
export const checkOld5Time = 300000;
export const checkOld10Time = 600000;