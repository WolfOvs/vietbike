
const uom = {
	"AF": "BarG",
	"AM": "kJ/kWh",
	"AI": "mg/Nm3",
	"AL": "cnt",
	"BA": "degF",
	"AW": "kW",
	"AS": "phi",
	"AN": "m3/h",
	"AJ": "barA",
	"AF": "barG",
	"AJ": "BarA",
	"A8": "icnts",
	"AD": "kSm3/h",
	"AQ": "mm",
	"AO": "micron",
	"AY": "m",
	"A3": "psia",
	"A1": "Ohm",
	"A7": "BTU/lbm",
	"A0": "mmH20",
	"AP": "dga",
	"AZ": "mbar",
	"A4": "mmH20D",
	"AK": "h",
	"AV": "GJ/h",
	"AC": "%",
	"AZ": "mBar",
	"AE": "degC",
	"A5": "in",
	"BD": "pps",
	"BE": "pph",
	"AX": "barD",
	"BC": "psp",
	"AB": "rpm",
	"AH": "mbarD",
	"A2": "kg/h",
	"AT": "kJ/kg",
	"BB": "LOG",
	"AR": "mm/s",
	"AU": "kg/s",
	"AG": "MW",
	"A9": "pct",
	"A6": "psi",
	"AA": "n/d"
}

const mappingData =
	[{
		"ABI": { "label": "Nome TC3", "value": "", "um": "AA" },
		"ABJ": { "label": "Tipo TC3", "value": "", "um": "AA" },
		"ABK": { "label": "Gruppo TC3", "value": "", "um": "AA" },
		"ABL": { "label": "Stato TC3", "value": "", "um": "AA" },
		"ABM": { "label": "Velocità CO/CE", "value": "", "um": "AB" },
		"ABN": { "label": "Percentuale chiusura antipompaggio 1 TC3", "value": "", "um": "AC" },
		"ABO": { "label": "Stato valvola Antipompaggio 1 TC3", "value": "", "um": "AA" },
		"ABP": { "label": "Percentuale chiusura antipompaggio 2 TC3", "value": "", "um": "AC" },
		"ABQ": { "label": "Stato valvola Antipompaggio 2 TC3", "value": "", "um": "AA" },
		"ABR": { "label": "Portata Mandata calcolata COCE TC3 2°Stadio", "value": "", "um": "AD" },
		"ABS": { "label": "Temperatura di Aspirazione TC3", "value": "", "um": "AE" },
		"ABT": { "label": "Pressione Aspirazione TC3", "value": "", "um": "AF" },
		"ABU": { "label": "Portata Aspirazione TC3", "value": "", "um": "AD" },
		"ABV": { "label": "Temperatura Mandata TC3 COCE sensore 1 2°Stadio", "value": "", "um": "AE" },
		"ABW": { "label": "Pressione Mandata TC3 COCE sensore 1 2°Stadio", "value": "", "um": "AF" },
		"ABX": { "label": "Portata Mandata da SCS COCE TC3 2°Stadio", "value": "", "um": "AD" },
		"ABY": { "label": "Potenza COCE TC3", "value": "", "um": "AG" },
		"ABZ": { "label": "Modalità funzionamento TC3", "value": "", "um": "AA" },
		"AB0": { "label": "∆P Aspirazione TU/GA TC3", "value": "", "um": "AH" },
		"AB1": { "label": "Cems (Corr. 15% 02) NOX TC3", "value": "", "um": "AI" },
		"AB2": { "label": "Cems (Corr. 15% 02)CO TC3", "value": "", "um": "AI" },
		"AB3": { "label": "Cems (Corr. 15% 02)O2 TC3", "value": "", "um": "AC" },
		"AB4": { "label": "Temperatura Asp CO/CE 1° Stadio sensore 1 TC3", "value": "", "um": "AE" },
		"AB5": { "label": "Temperatura Asp CO/CE 1° Stadio sensore 2 TC3", "value": "", "um": "AE" },
		"AB6": { "label": "Pressione Aspirazione CO/CE 1°Stadio sensore 1 TC3", "value": "", "um": "AF" },
		"AB7": { "label": "Temperatura Mand, CO/CE 1° Stadio TC3", "value": "", "um": "AE" },
		"AB8": { "label": "Pressione Mand. CO/CE 1°Stadio TC3", "value": "", "um": "AF" },
		"AB9": { "label": "Portata CO/CE 1° Stadio TC3", "value": "", "um": "AD" },
		"ACA": { "label": "Power ISO TC3", "value": "", "um": "AC" },
		"ACB": { "label": "Temperatura Asp CO/CE 2° Stadio TC3", "value": "", "um": "AE" },
		"ACC": { "label": "Pressione Aspirazione CO/CE 2°Stadio TC3", "value": "", "um": "AF" },
		"ACD": { "label": "Temperatura Aspirazione TU/GA (CO/AX) SEL TC3", "value": "", "um": "AE" },
		"ACE": { "label": "Pressione Asp TU/GA TC3", "value": "", "um": "AF" },
		"ACF": { "label": "Pressione Mandata CO/AX SEL TC3", "value": "", "um": "AJ" },
		"ACG": { "label": "Temperatura Mandata CO/AX SEL TC3", "value": "", "um": "AE" },
		"ACH": { "label": "Temperatura Scarico TP TC3", "value": "", "um": "AE" },
		"ACI": { "label": "Pressione Scarico G.G TC3", "value": "", "um": "AJ" },
		"ACJ": { "label": "Temperatura Scarico (mandata) G.G TC3", "value": "", "um": "AE" },
		"ACK": { "label": "Portata Gas Fuel TC3", "value": "", "um": "AD" },
		"ACL": { "label": "Stato Portata Gas Fuel TC3", "value": "", "um": "AA" },
		"ACM": { "label": "∆P Scarico TU/GA TC3", "value": "", "um": "AH" },
		"ACN": { "label": "Velocità G.G TC3 SEL", "value": "", "um": "AB" },
		"ACO": { "label": "Velocità G.G TC3 Sens. A", "value": "", "um": "AB" },
		"ACP": { "label": "Velocità G.G TC3 Sens. B", "value": "", "um": "AB" },
		"ACQ": { "label": "Velocità TP e COCE TC3 SEL", "value": "", "um": "AB" },
		"ACR": { "label": "Velocità  PT TC3 Sens. A", "value": "", "um": "AB" },
		"ACS": { "label": "Velocità  PT TC3 Sens. B", "value": "", "um": "AB" },
		"ACT": { "label": "Ore marcia totali TC3", "value": "", "um": "AK" },
		"ACU": { "label": "Numero di Avviamenti TC3", "value": "", "um": "AL" },
		"ACV": { "label": "Consumo Specifico TC3", "value": "", "um": "AM" },
		"ACW": { "label": "Rapporto di Compressione COCE TC3", "value": "", "um": "AA" },
		"ACX": { "label": "Portata Volumetrica COCE TC3", "value": "", "um": "AN" },
		"ACY": { "label": "Portata condizioni standard da torsiometro TC3", "value": "", "um": "AD" },
		"ACZ": { "label": "Portata condizioni standard da Differenza di pressione (dp) occhio girante TC3", "value": "", "um": "AD" },
		"AC0": { "label": "Lato Accoppiamento(Assex) COCE TC3", "value": "", "um": "AO" },
		"AC1": { "label": "Lato Accoppiamento(Assex) Ampiezza 1x COCE TC3", "value": "", "um": "AO" },
		"AC2": { "label": "Lato Accoppiamento(Assex) Ampiezza 2x COCE TC3", "value": "", "um": "AO" },
		"AC3": { "label": "Lato Accoppiamento(Assex) fase 1x COCE TC3", "value": "", "um": "AP" },
		"AC4": { "label": "Lato Accoppiamento(AsseY)  COCE TC3", "value": "", "um": "AO" },
		"AC5": { "label": "Lato Accoppiamento(AsseY) Ampiezza 1x  COCE TC3", "value": "", "um": "AO" },
		"AC6": { "label": "Lato Accoppiamento(AsseY) Ampiezza 2x COCE TC3", "value": "", "um": "AO" },
		"AC7": { "label": "Lato Accoppiamento(AsseY) fase 1x COCE TC3", "value": "", "um": "AP" },
		"AC8": { "label": "Lato Opposto Accoppiamento(Assex) COCE  TC3", "value": "", "um": "AO" },
		"AC9": { "label": "Lato Opposto Accoppiamento(Assex) Ampiezza 1x COCE TC3", "value": "", "um": "AO" },
		"ADA": { "label": "Lato Opposto Accoppiamento(Assex) Ampiezza 2x COCE TC3", "value": "", "um": "AO" },
		"ADB": { "label": "Lato Accoppiamento(Assex) fase 1x COCE TC3", "value": "", "um": "AP" },
		"ADC": { "label": "Lato Opposto Accoppiamento(AsseY) COCE TC3", "value": "", "um": "AO" },
		"ADD": { "label": "Lato Opposto Accoppiamento(AsseY) Ampiezza 1x COCE TC3", "value": "", "um": "AO" },
		"ADE": { "label": "Lato Opposto Accoppiamento(AsseY) Ampiezza 2x COCE TC3", "value": "", "um": "AO" },
		"ADF": { "label": "Lato Accoppiamento(AsseY) fase 1x COCE TC3", "value": "", "um": "AP" },
		"ADG": { "label": "Spostamenti Assiali A COCE TC3", "value": "", "um": "AQ" },
		"ADH": { "label": "Spostamenti Assiali B COCE TC3", "value": "", "um": "AQ" },
		"ADI": { "label": "Vibrazioni Gas Generator da DM2000 TUGA TC3", "value": "", "um": "AR" },
		"ADJ": { "label": "Vibrazioni Gas Generator filtrato su Vel G.G TUGA TC3", "value": "", "um": "AR" },
		"ADK": { "label": "Vibrazioni Turbina di Potenza Sismico 1 TUGA TC3", "value": "", "um": "AR" },
		"ADL": { "label": "Vibrazioni Turbina di Potenza Sismico 1 1x TUGA TC3", "value": "", "um": "AR" },
		"ADM": { "label": "Vibrazioni Turbina di Potenza Sismico 1 2x TUGA TC3", "value": "", "um": "AR" },
		"ADN": { "label": "Vibrazioni Turbina di Potenza Sismico 2 TUGA TC3", "value": "", "um": "AR" },
		"ADO": { "label": "Vibrazioni Turbina di Potenza Sismico 2 1x TUGA TC3", "value": "", "um": "AR" },
		"ADP": { "label": "Vibrazioni Turbina di Potenza Sismico 2 2x TUGA TC3", "value": "", "um": "AR" },
		"ADQ": { "label": "Bearing 1 (Asse X) TUGA TC3", "value": "", "um": "AO" },
		"ADR": { "label": "Bearing 1 (Asse X) Ampiezza 1x TUGA TC3", "value": "", "um": "AO" },
		"ADS": { "label": "Bearing 1 (Asse X) Ampiezza 2x TUGA TC3", "value": "", "um": "AO" },
		"ADT": { "label": "Bearing 1 (Asse X) Fase 1x TUGA TC3", "value": "", "um": "AS" },
		"ADU": { "label": "Bearing 2 (Asse X) TUGA TC3", "value": "", "um": "AO" },
		"ADV": { "label": "Bearing 2 (Asse X) Ampiezza 1x TUGA TC3", "value": "", "um": "AO" },
		"ADW": { "label": "Bearing 2 (Asse X) Ampiezza 2x TUGA TC3", "value": "", "um": "AO" },
		"ADX": { "label": "Bearing 2 (Asse X) Fase 1x  TUGA TC3", "value": "", "um": "AP" },
		"ADY": { "label": "Bearing 1 (Asse Y) TUGA TC3", "value": "", "um": "AO" },
		"ADZ": { "label": "Bearing 1 (Asse Y) Ampiezza 1x  TUGA TC3", "value": "", "um": "AO" },
		"AD0": { "label": "Bearing 1 (Asse Y) Ampiezza 2x TUGA TC3", "value": "", "um": "AO" },
		"AD1": { "label": "Bearing 1 (Asse Y) Fase 1x TUGA TC3", "value": "", "um": "AS" },
		"AD2": { "label": "Bearing 2 (Asse Y) TUGA TC3", "value": "", "um": "AO" },
		"AD3": { "label": "Bearing 2 (Asse Y) Ampiezza 1x TUGA TC3", "value": "", "um": "AO" },
		"AD4": { "label": "Bearing 2 (Asse Y) Ampiezza 2x TUGA TC3", "value": "", "um": "AO" },
		"AD5": { "label": "Bearing 2 (Asse Y) Fase 1x TUGA TC3", "value": "", "um": "AP" },
		"AD6": { "label": "Spostamenti Assiali A TUGA TC3", "value": "", "um": "AQ" },
		"AD7": { "label": "Spostamenti Assiali B TUGA TC3", "value": "", "um": "AQ" },
		"AD8": { "label": "Temperatura Scarico G.G rif TUGA TC3", "value": "", "um": "AE" },
		"AD9": { "label": "Differenza Pressione Condotto Aspirazione TUGA TC3", "value": "", "um": "AH" },
		"AEA": { "label": "Differenza Pressione Condotto Scarico TUGA TC3", "value": "", "um": "AH" },
		"AEB": { "label": "Ap. Bleed Mandata. CO/AX TUGA TC3", "value": "", "um": "AC" },
		"AEC": { "label": "Consumo LHV (lower heating value) Combustibile TUGA TC3", "value": "", "um": "AT" },
		"AED": { "label": "Portata Gas Combustibile (fuel) TUGA TC3", "value": "", "um": "AU" },
		"AEE": { "label": "Consumo calorico TUGA TC3", "value": "", "um": "AV" },
		"AEF": { "label": "Potenza Torsioemetro TC3", "value": "", "um": "AW" },
		"AEG": { "label": "Potenza Attesa da Site TUGA TC3", "value": "", "um": "AW" },
		"AEH": { "label": "Differenza percentuale potenza TUGA TC3", "value": "", "um": "AC" },
		"AEI": { "label": "Consumo Specifico TUGA TC3", "value": "", "um": "AM" },
		"AEJ": { "label": "Consumo specifico attesa da Site TUGA TC3", "value": "", "um": "AM" },
		"AEK": { "label": "Differenza percentuale consumo specifico TUGA TC3", "value": "", "um": "AC" },
		"AEL": { "label": "Temperatura Ingresso Aria Cabinato Motore Sens. A Cabinato Motore", "value": "", "um": "AE" },
		"AEM": { "label": "Temperatura Ingresso Aria Cabinato Motore Sens. B Cabinato Motore", "value": "", "um": "AE" },
		"AEN": { "label": "Differenza di pressione sensore 1 Cabinato Motore", "value": "", "um": "AH" },
		"AEO": { "label": "Temperatura Sensore 1 Cabinato Unità", "value": "", "um": "AE" },
		"AEP": { "label": "Temperatura Sensore 2 Cabinato Unità", "value": "", "um": "AE" },
		"AEQ": { "label": "Differenza di pressione sensore 1 Cabinato Unità", "value": "", "um": "AH" },
		"AER": { "label": "Differenza di pressione sensore 2 Cabinato Unità", "value": "", "um": "AH" },
		"AES": { "label": "Rapporto di Compressione", "value": "", "um": "AA" },
		"AET": { "label": "Comando Valvola Antipompaggio", "value": "", "um": "AC" },
		"AEU": { "label": "Pressione Differenziale Occhio Girante", "value": "", "um": "AH" },
		"AEV": { "label": "P2-P1", "value": "", "um": "AX" },
		"AEW": { "label": "Prevalenza Totale", "value": "", "um": "AT" },
		"AEX": { "label": "Pressione Aspirazione CO/CE 1°Stadio sensore 2 TC3", "value": "", "um": "AF" },
		"AEY": { "label": "Temperatura Mandata TC3 COCE sensore 2 2°Stadio", "value": "", "um": "AE" },
		"AEZ": { "label": "Pressione Mandata TC3 COCE sensore 2 2°Stadio", "value": "", "um": "AF" },
		"AE0": { "label": "Differenza calcolo portata", "value": "", "um": "AC" },
		"AE1": { "label": "Prevalenza Isoentropica COCE TC3", "value": "", "um": "AY" },
		"AE2": { "label": "Prevalenza Polientropica COCE TC3", "value": "", "um": "AY" },
		"AE3": { "label": "Rendimento Isoentropico COCE TC3", "value": "", "um": "AC" },
		"AE4": { "label": "Rendimento Politropico COCE TC3", "value": "", "um": "AC" },
		"AE5": { "label": "Rendimenti Isen. Exp. CO/AX TC3", "value": "", "um": "AC" },
		"AE6": { "label": "Rendimenti Isen. CO/AX TC3", "value": "", "um": "AC" },
		"AE7": { "label": "Differenza rendimento CO/AX TC3", "value": "", "um": "AC" },
		"AE8": { "label": "Rendimento pol. CO/AX TC3", "value": "", "um": "AC" },
		"AE9": { "label": "Pressione  Mandata CO/AX A TC3", "value": "", "um": "AJ" },
		"AFA": { "label": "Pressione  Mandata CO/AX B TC3", "value": "", "um": "AJ" },
		"AFB": { "label": "Pressione  Mandata CO/AX EST TC3", "value": "", "um": "AJ" },
		"AFC": { "label": "Temperatura Mandata CO/AX 1A TC3", "value": "", "um": "AE" },
		"AFD": { "label": "Temperatura Mandata CO/AX 1B TC3", "value": "", "um": "AE" },
		"AFE": { "label": "Temperatura Mandata CO/AX 2A TC3", "value": "", "um": "AE" },
		"AFF": { "label": "Temperatura Mandata CO/AX 2B TC3", "value": "", "um": "AE" },
		"AFG": { "label": "Pressione Ambientale - Delta Pressione Aspirazione", "value": "", "um": "AJ" },
		"AFH": { "label": "Feedback pos. IGV", "value": "", "um": "AP" },
		"AFI": { "label": "Rapporto Compressione CO/AX", "value": "", "um": "AA" },
		"AFJ": { "label": "CDP Select", "value": "", "um": "AC" },
		"AFK": { "label": "CDP Demand", "value": "", "um": "AC" },
		"AFL": { "label": "CDP Riferimento", "value": "", "um": "AC" },
		"AFM": { "label": "CDP Sensore A", "value": "", "um": "AC" },
		"AFN": { "label": "CDP Sensore B", "value": "", "um": "AC" },
		"AFO": { "label": "Temperatura Aspirazione TU/GA A TC3", "value": "", "um": "AE" },
		"AFP": { "label": "Temperatura Aspirazione TU/GA B TC3", "value": "", "um": "AE" },
		"AFQ": { "label": "Flame detector A", "value": "", "um": "AC" },
		"AFR": { "label": "Flame detector B", "value": "", "um": "AC" },
		"AFS": { "label": "Temperatura Aspirazione CO/CE I", "value": "", "um": "AE" },
		"AFT": { "label": "Temperatura Mandata CO/CE I", "value": "", "um": "AE" },
		"AFU": { "label": "Potenza a cond. Rif.", "value": "", "um": "AW" },
		"AFV": { "label": "Heat Rate a Cond. Rif", "value": "", "um": "AM" },
		"AFW": { "label": "Set Point Antipompaggio 1", "value": "", "um": "AZ" },
		"AFX": { "label": "Set Point Antipompaggio 2", "value": "", "um": "AZ" },
		"AFY": { "label": "Misura Antipompaggio 1", "value": "", "um": "AZ" },
		"AFZ": { "label": "Misura Antipompaggio 2", "value": "", "um": "AZ" },
		"AF0": { "label": "Feedback Valvola Antipompaggio 1", "value": "", "um": "AC" },
		"AF1": { "label": "Feedback Valvola Antipompaggio 2", "value": "", "um": "AC" },
		"AF2": { "label": "Concentrazione Gas Aspirazione Sensore Flangia", "value": "", "um": "AC" },
		"AF3": { "label": "Concentrazione Gas Aspirazione Sensore 1 cappa acustica", "value": "", "um": "AC" },
		"AF4": { "label": "Concentrazione Gas Aspirazione Sensore 2 cappa acustica", "value": "", "um": "AC" },
		"AF5": { "label": "Concentrazione Gas Aspirazione Sensore 3 cappa acustica", "value": "", "um": "AC" },
		"AF6": { "label": "Concentrazione Gas Mandata Sensore Flangia", "value": "", "um": "AC" },
		"AF7": { "label": "Concentrazione Gas Mandata Sensore 1 cappa acustica", "value": "", "um": "AC" },
		"AF8": { "label": "Concentrazione Gas Mandata Sensore 2 cappa acustica", "value": "", "um": "AC" },
		"AF9": { "label": "Concentrazione Gas Mandata Sensore 3 cappa acustica", "value": "", "um": "AC" },
		"AGA": { "label": "Concentrazione Gas Centralina Tenuta", "value": "", "um": "AC" },
		"AGB": { "label": "Concentrazione Gas Uscita Cabinato Unità Sensore A", "value": "", "um": "AC" },
		"AGC": { "label": "Concentrazione Gas Uscita Cabinato Unità Sensore B", "value": "", "um": "AC" },
		"AGD": { "label": "Concentrazione Gas Uscita Cabinato Unità Sensore C", "value": "", "um": "AC" },
		"AGE": { "label": "Temperatura Cuscinetto 1 SEL Sist. Lub Power Wheel TC3", "value": "", "um": "AE" },
		"AGF": { "label": "Temperatura Cuscinetto 1 A Sist. Lub Power Wheel TC3", "value": "", "um": "AE" },
		"AGG": { "label": "Temperatura Cuscinetto 1 B Sist. Lub Power Wheel TC3", "value": "", "um": "AE" },
		"AGH": { "label": "Temperatura Cuscinetto 2 SEL Sist. Lub Power Wheel TC3", "value": "", "um": "AE" },
		"AGI": { "label": "Temperatura Cuscinetto 2 A Sist. Lub Power Wheel TC3", "value": "", "um": "AE" },
		"AGJ": { "label": "Temperatura Cuscinetto 2 B Sist. Lub Power Wheel TC3", "value": "", "um": "AE" },
		"AGK": { "label": "Temperatura Reggisp. Inattivo SEL Sist. Lub Power Wheel TC3", "value": "", "um": "AE" },
		"AGL": { "label": "Temperatura Reggisp. Inattivo A Sist. Lub Power Wheel TC3", "value": "", "um": "AE" },
		"AGM": { "label": "Temperatura Reggisp. Inattivo B Sist. Lub Power Wheel TC3", "value": "", "um": "AE" },
		"AGN": { "label": "Temperatura Reggisp. Attivo SEL Sist. Lub Power Wheel TC3", "value": "", "um": "AE" },
		"AGO": { "label": "Temperatura Reggisp. Attivo A Sist. Lub Power Wheel TC3", "value": "", "um": "AE" },
		"AGP": { "label": "Temperatura Reggisp. Attivo B Sist. Lub Power Wheel TC3", "value": "", "um": "AE" },
		"AGQ": { "label": "Pressione Collettore Sist. Lub CO/CE", "value": "", "um": "AF" },
		"AGR": { "label": "Temperatura Collettore Sist. Lub CO/CE", "value": "", "um": "AE" },
		"AGS": { "label": "Temperatura Cuscinetto 1 A Sist. Lub CO/CE TC3", "value": "", "um": "AE" },
		"AGT": { "label": "Temperatura Cuscinetto 1 B Sist. Lub CO/CE TC3", "value": "", "um": "AE" },
		"AGU": { "label": "Temperatura Cuscinetto 2 A Sist. Lub CO/CE TC3", "value": "", "um": "AE" },
		"AGV": { "label": "Temperatura Cuscinetto 2 B Sist. Lub CO/CE TC3", "value": "", "um": "AE" },
		"AGW": { "label": "Temperatura Reggisp. Inattivo A Sist. Lub CO/CE TC3", "value": "", "um": "AE" },
		"AGX": { "label": "Temperatura Reggisp. Inattivo B Sist. Lub CO/CE TC3", "value": "", "um": "AE" },
		"AGY": { "label": "Temperatura Reggisp. Attivo A Sist. Lub CO/CE TC3", "value": "", "um": "AE" },
		"AGZ": { "label": "Temperatura Reggisp. Attivo B1 Sist. Lub CO/CE TC3", "value": "", "um": "AE" },
		"AG0": { "label": "Temperatura Reggisp. Attivo B2 Sist. Lub CO/CE TC3", "value": "", "um": "AE" },
		"AG1": { "label": "Stato Oil Cooler 1 TC3 Sist. Lub TC3", "value": "", "um": "AA" },
		"AG2": { "label": "Stato Oil Cooler 2 TC3 Sist. Lub TC3", "value": "", "um": "AA" },
		"AG3": { "label": "Stato Oil Cooler 3 TC3 Sist. Lub TC3", "value": "", "um": "AA" },
		"AG4": { "label": "Stato Motore 88QE-1 Sist. Lub TC3", "value": "", "um": "AA" },
		"AG5": { "label": "Stato Motore 88QA Sist. Lub TC3", "value": "", "um": "AA" },
		"AG6": { "label": "Stato Pompa Meccanica 1 Sist. Lub TC3", "value": "", "um": "AA" },
		"AG7": { "label": "Differenza Pressione Filtri Sist. Lub", "value": "", "um": "AX" },
		"AG8": { "label": "Pressione Mandata a monte Oil Cooler Sist. Lub TC3", "value": "", "um": "AF" },
		"AG9": { "label": "Pressione Mandata Emergenza A valle motore 88QE-1 Sist. Lub TC3", "value": "", "um": "AF" },
		"AHA": { "label": "Differenza di pressione serbatoio/atm vicino serbatoio Sist. Lub TC3", "value": "", "um": "A0" },
		"AHB": { "label": "Differenza di pressione serbatoio/atm lontano serbatoio Sist. Lub TC3", "value": "", "um": "A0" },
		"AHC": { "label": "Stato resistenza termica serbatoio Sist. Lub TC3", "value": "", "um": "AA" },
		"AHD": { "label": "Temperatura Serbatoio Sist. Lub TC3", "value": "", "um": "AE" },
		"AHE": { "label": "Livello Serbatoio Sist. Lub TC3", "value": "", "um": "AC" },
		"AHF": { "label": "Temperatura Collettore sel Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHG": { "label": "Temperatura Collettore sens. A Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHH": { "label": "Temperatura Collettore sens. B Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHI": { "label": "Pressione Collettore Sist. Olio Sint. TC3", "value": "", "um": "AF" },
		"AHJ": { "label": "Temperatura scarico AGB sel Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHK": { "label": "Temperatura scarico AGB sens. A Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHL": { "label": "Temperatura scarico AGB sens. B Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHM": { "label": "Temperatura scavanage A sump. Sel. Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHN": { "label": "Temperatura scavanage A sump. Sens A Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHO": { "label": "Temperatura scavanage A sump. Sens B Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHP": { "label": "Temperatura scavanage B sump. Sel. Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHQ": { "label": "Temperatura scavanage B sump. Sens A Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHR": { "label": "Temperatura scavanage B sump. Sens B Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHS": { "label": "Temperatura scavanage C sump. Sel. Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHT": { "label": "Temperatura scavanage C sump. Sens A Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHU": { "label": "Temperatura scavanage C sump. Sens B Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AHV": { "label": "Chip Det. A Scarico AGB Sist. Olio Sint. TC3", "value": "", "um": "A1" },
		"AHW": { "label": "Chip Det. B Scarico AGB Sist. Olio Sint. TC3", "value": "", "um": "A1" },
		"AHX": { "label": "Chip Det. Sump A Sist. Olio Sin. TC3", "value": "", "um": "A1" },
		"AHY": { "label": "Chip Det. Sump B Sist. Olio Sint. TC3", "value": "", "um": "A1" },
		"AHZ": { "label": "Chip Det. Sump C Sist. Olio Sint. TC3", "value": "", "um": "A1" },
		"AH0": { "label": "Pressione Scarico Scavanage Sist. Olio Sint. TC3", "value": "", "um": "AF" },
		"AH1": { "label": "Differenza Pressione Filtri 1 Sist. Olio Sint. TC3", "value": "", "um": "AX" },
		"AH2": { "label": "Stato Motore 88HQ-1 Sist. Olio Sint. TC3", "value": "", "um": "AA" },
		"AH3": { "label": "Differenza Pressione Filtri 2 Sist. Olio Sint. TC3", "value": "", "um": "AX" },
		"AH4": { "label": "Differenza Pressione Filtri 3 Sist. Olio Sint.  TC3", "value": "", "um": "AX" },
		"AH5": { "label": "Stato Valvola 33QP-1 Sist. Olio Sint. TC3", "value": "", "um": "AA" },
		"AH6": { "label": "Stato Valvola 33HP-1 Sist. Olio Sint. TC3", "value": "", "um": "AA" },
		"AH7": { "label": "Temperatura Serbatoio Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AH8": { "label": "Livello Serbatoio Sist. Olio Sint. TC3", "value": "", "um": "AC" },
		"AH9": { "label": "Temperatura Serbatoio Avviamento Idraulico Sist. Olio Sint. TC3", "value": "", "um": "AE" },
		"AIA": { "label": "Livello Serbatoio Avviamento Idaulico Sist. Olio Sint. TC3", "value": "", "um": "AC" },
		"AIB": { "label": "Concentrazione Gas Vent sec #1 sfiato secondario Sist. Tenuta a Gas TC3", "value": "", "um": "AC" },
		"AIC": { "label": "Portata gas vent primario #1 sfiato primario Sist. Tenuta a Gas TC3", "value": "", "um": "A2" },
		"AID": { "label": "Pressione vent prim #1 sfiato primario Sist. Tenuta a Gas TC3", "value": "", "um": "AZ" },
		"AIE": { "label": "Portata gas vent primario #2 sfiato primario Sist. Tenuta a Gas TC3", "value": "", "um": "A2" },
		"AIF": { "label": "Pressione vent prim #2 sfiato primario Sist. Tenuta a Gas TC3", "value": "", "um": "AZ" },
		"AIG": { "label": "Concentrazione Gas Vent sec #2 sfiato secondario Sist. Tenuta a Gas TC3", "value": "", "um": "AC" },
		"AIH": { "label": "Differenza di pressione mandata buffer Gas Sist. Tenuta a Gas TC3", "value": "", "um": "AH" },
		"AII": { "label": "Differenza di pressione bilanc. Buffer Gas Sist. Tenuta a Gas TC3", "value": "", "um": "AH" },
		"AIJ": { "label": "Differenza di pressione Aspirazione buffer gas Sist. Tenuta a Gas TC3", "value": "", "um": "AH" },
		"AIK": { "label": "Ps. Aria Sbarr. Tenute a Gas Sist. Tenuta a Gas TC3", "value": "", "um": "AH" },
		"AIL": { "label": "Dp PreFiltro Buffer Gas Sist. Tenuta a Gas TC3", "value": "", "um": "AH" },
		"AIM": { "label": "Valv. Contr. Gas Tenuta Sist. Tenuta a Gas TC3", "value": "", "um": "AC" },
		"AIN": { "label": "Posizione Valvola Sist. Tenuta a Gas TC3", "value": "", "um": "AC" },
		"AIO": { "label": "PS. Aria Tenute a Gas Sist. Tenuta a Gas TC3", "value": "", "um": "AZ" },
		"AIP": { "label": "Ps. Aria Tenute a gas Sist. Tenuta a Gas TC3", "value": "", "um": "AZ" },
		"AIQ": { "label": "Temperatura Aria Tenute a gas Sist. Tenuta a Gas TC3", "value": "", "um": "AE" },
		"AIR": { "label": "Differenza pressione filtri buffer gas Sist. Tenuta a Gas TC3", "value": "", "um": "AH" },
		"AIS": { "label": "Stato motore  88SE Sist. Tenuta a Gas TC3", "value": "", "um": "AA" },
		"AIT": { "label": "Stato motore 88SC Sist. Tenuta a Gas TC3", "value": "", "um": "AA" },
		"AIU": { "label": "Differenza pressione gas tenuta bilanc. (contr.) Sist. Tenuta a Gas TC3", "value": "", "um": "AH" },
		"AIV": { "label": "Differenza pressione gas tenuta bilanc. (Set.) Sist. Tenuta a Gas TC3", "value": "", "um": "AH" },
		"AIW": { "label": "Stato Valvola L33SGB_O Sist. Tenuta a Gas TC3", "value": "", "um": "AA" },
		"AIX": { "label": "Pressione Fuel gas da SCS TC3", "value": "", "um": "AF" },
		"AIY": { "label": "Temperatura Fuel TC3", "value": "", "um": "AE" },
		"AIZ": { "label": "stato valvola L33FV1_C", "value": "", "um": "AA" },
		"AI0": { "label": "stato valvola GVNTCLSCMDF", "value": "", "um": "AA" },
		"AI1": { "label": "Burner mode", "value": "", "um": "AA" },
		"AI2": { "label": "Temperatura Linea di alimentazione gas", "value": "", "um": "AE" },
		"AI3": { "label": "Pressione Linea di alimentazione gas", "value": "", "um": "AE" },
		"AI4": { "label": "Sensore A pulsazioni di pressione", "value": "", "um": "A3" },
		"AI5": { "label": "Sensore B pulsazioni di pressione", "value": "", "um": "A3" },
		"AI6": { "label": "stato valvola L33FG1C", "value": "", "um": "AA" },
		"AI7": { "label": "stato valvola L33FG2C", "value": "", "um": "AA" },
		"AI8": { "label": "pressione a monte della valvola interna", "value": "", "um": "A3" },
		"AI9": { "label": "percentuale apertura valvola interna", "value": "", "um": "AC" },
		"AJA": { "label": "pressione a valle della valvola interna", "value": "", "um": "A3" },
		"AJB": { "label": "pressione a monte della valvola pilota", "value": "", "um": "A3" },
		"AJC": { "label": "percentuale apertura valvola pilota", "value": "", "um": "AC" },
		"AJD": { "label": "pressione a valle della valvola pilota", "value": "", "um": "A3" },
		"AJE": { "label": "pressione a monte della valvola esterna", "value": "", "um": "A3" },
		"AJF": { "label": "percentuale apertura valvola esterna", "value": "", "um": "AC" },
		"AJG": { "label": "pressione a valle della valvola esterna", "value": "", "um": "A3" },
		"AJH": { "label": "Concentrazione Gas zona scarico ventola sensore 1", "value": "", "um": "AC" },
		"AJI": { "label": "Concentrazione Gas zona scarico ventola sensore 2", "value": "", "um": "AC" },
		"AJJ": { "label": "Concentrazione Gas zona scarico ventola sensore 3", "value": "", "um": "AC" },
		"AJK": { "label": "Concentrazione Gas zona Valvole Fuel sensore 1", "value": "", "um": "AC" },
		"AJL": { "label": "Concentrazione Gas zona Valvole Fuel sensore 2", "value": "", "um": "AC" },
		"AJM": { "label": "Concentrazione Gas zona Valvole Fuel sensore 3", "value": "", "um": "AC" },
		"AJN": { "label": "Concentrazione Gas zona Valvole Fuel sensore 4", "value": "", "um": "AC" },
		"AJO": { "label": "Lettura termocoppie TTXD1", "value": "", "um": "AE" },
		"AJP": { "label": "Lettura termocoppie TTXD2", "value": "", "um": "AE" },
		"AJQ": { "label": "Lettura termocoppie TTXD3", "value": "", "um": "AE" },
		"AJR": { "label": "Lettura termocoppie TTXD4", "value": "", "um": "AE" },
		"AJS": { "label": "Lettura termocoppie TTXD5", "value": "", "um": "AE" },
		"AJT": { "label": "Lettura termocoppie TTXD6", "value": "", "um": "AE" },
		"AJU": { "label": "Lettura Termocoppie T54_1", "value": "", "um": "AE" },
		"AJV": { "label": "Lettura Termocoppie T54_2", "value": "", "um": "AE" },
		"AJW": { "label": "Lettura Termocoppie T54_3", "value": "", "um": "AE" },
		"AJX": { "label": "Lettura Termocoppie T54_4", "value": "", "um": "AE" },
		"AJY": { "label": "Lettura Termocoppie T54_5", "value": "", "um": "AE" },
		"AJZ": { "label": "Lettura Termocoppie T54_6", "value": "", "um": "AE" },
		"AJ0": { "label": "Lettura Termocoppie T54_7", "value": "", "um": "AE" },
		"AJ1": { "label": "Lettura Termocoppie T54_8", "value": "", "um": "AE" },
		"AJ2": { "label": "Riepilogo turbina T3", "value": "", "um": "AE" },
		"AJ3": { "label": "Riepilogo turbina PS3", "value": "", "um": "AJ" },
		"AJ4": { "label": "Riepilogo turbina T54", "value": "", "um": "AE" },
		"AJ5": { "label": "Anteriore #1/A", "value": "", "um": "AE" },
		"AJ6": { "label": "Anteriore #1/B", "value": "", "um": "AE" },
		"AJ7": { "label": "Differenza Anteriore 1", "value": "", "um": "AE" },
		"AJ8": { "label": "Posteriore #2/A", "value": "", "um": "AE" },
		"AJ9": { "label": "Posteriore #2/B", "value": "", "um": "AE" },
		"AKA": { "label": "Differenza Posteriore 2", "value": "", "um": "AE" },
		"AKB": { "label": "Differenza Temperatura scarico G.G.", "value": "", "um": "AE" },
		"AKC": { "label": "Angolo VSV", "value": "", "um": "AP" },
		"AKD": { "label": "Velocità corretta G.G.", "value": "", "um": "AB" },
		"AKE": { "label": "Rendimento isoentropico Calcolato", "value": "", "um": "AC" },
		"AKF": { "label": "Rendimento Isoentropico Atteso", "value": "", "um": "AC" },
		"AKG": { "label": "Rendimento Isoentropico Differenza ", "value": "", "um": "AC" },
		"AKH": { "label": "Stato Spazi ruota nel disegno", "value": "", "um": "AA" },
		"AKI": { "label": "Pressione Mandata G.G.", "value": "", "um": "AJ" },
		"AKJ": { "label": "Temperatura Media Scarico Turbina", "value": "", "um": "AE" },
		"AKK": { "label": "Set-point Contr. Antighiaccio TC3", "value": "", "um": "AE" },
		"AKL": { "label": "Set Velocità Sistema Antighiaccio TC3", "value": "", "um": "AC" },
		"AKM": { "label": "Differenza Pressione Aspirazione Turbina sens. A", "value": "", "um": "AH" },
		"AKN": { "label": "Differenza Pressione Aspirazione Turbina sens. B", "value": "", "um": "AH" },
		"AKO": { "label": "Com. Apert. Antighiaccio", "value": "", "um": "AC" },
		"AKP": { "label": "Com. chiusura. Serr. Antiice", "value": "", "um": "AC" },
		"AKQ": { "label": "Com. chiusura. Serr. Uscita vent.", "value": "", "um": "AC" },
		"AKR": { "label": "Stato Motore", "value": "", "um": "AA" },
		"AKS": { "label": "Pressione diff. ATM/Scar.", "value": "", "um": "AH" },
		"AKT": { "label": "Differenza pressione ATM/Prefiltro sens 1", "value": "", "um": "AH" },
		"AKU": { "label": "Differenza pressione ATM/Prefiltro sens 2", "value": "", "um": "AH" },
		"AKV": { "label": "Differenza pressione Prefiltro sens 1", "value": "", "um": "A4" },
		"AKW": { "label": "Differenza pressione Prefiltro sens 2", "value": "", "um": "A4" },
		"AKX": { "label": "Differenza pressione ATM/Filtro Alta Efficacia ", "value": "", "um": "AH" },
		"AKY": { "label": "Differenza pressione Filtro Alta Efficacia ", "value": "", "um": "A4" },
		"AKZ": { "label": "Pressione diff. ATM/Fab (A)", "value": "", "um": "AH" },
		"AK0": { "label": "Pressione diff. ATM/Fab (B)", "value": "", "um": "AH" },
		"AK1": { "label": "Pressione diff. ATM/Fab (2B)", "value": "", "um": "AH" },
		"AK2": { "label": "Temperatura Fabbricato A", "value": "", "um": "AE" },
		"AK3": { "label": "Temperatura Fabbricato B", "value": "", "um": "AE" },
		"AK4": { "label": "Differenza pressione ATM/Cab. (B)", "value": "", "um": "AH" },
		"AK5": { "label": "Differenza pressione ATM/Cab. (A)", "value": "", "um": "AH" },
		"AK6": { "label": "Percentuale apertura serranda antighiaccio ", "value": "", "um": "AC" },
		"AK7": { "label": "Temperatura ingresso Cabinato ", "value": "", "um": "AE" },
		"AK8": { "label": "Temperatura uscita Cabinato ", "value": "", "um": "AE" },
		"AK9": { "label": "Temperatura Interna Cabinato sens 1", "value": "", "um": "AE" },
		"ALA": { "label": "Temperatura Interna Cabinato sens 2", "value": "", "um": "AE" },
		"ALB": { "label": "Umidita esterna da TC", "value": "", "um": "AC" },
		"ALC": { "label": "Temperatura esterna da TC", "value": "", "um": "AE" },
		"ALD": { "label": "Pressione differenziale ventilazione turbina ", "value": "", "um": "AH" },
		"ALE": { "label": "Gas detector rivelatori IR Sensore 1", "value": "", "um": "AC" },
		"ALF": { "label": "Gas detector rivelatori IR Sensore 2", "value": "", "um": "AC" },
		"ALG": { "label": "Gas detector rivelatori IR Sensore 3", "value": "", "um": "AC" },
		"ALH": { "label": "Gas detector rivelatori IR Sensore 4", "value": "", "um": "AC" },
		"ALI": { "label": "Gas detector rivelatori IR Sensore 5", "value": "", "um": "AC" },
		"ALJ": { "label": "Gas detector rivelatori IR Sensore 6", "value": "", "um": "AC" },
		"ALK": { "label": "Pressione HP Recoup 1 TC3", "value": "", "um": "AJ" },
		"ALL": { "label": "Pressione HP Recoup 2 TC3", "value": "", "um": "AJ" },
		"ALM": { "label": "Agg. Richiesto orifizio TC3", "value": "", "um": "A5" },
		"ALN": { "label": "Pressione Turbina - P2SEL", "value": "", "um": "A6" },
		"ALO": { "label": "Velocità-XNGG_REF", "value": "", "um": "AB" },
		"ALP": { "label": "Velocità-XNPT_REF", "value": "", "um": "AB" },
		"ALQ": { "label": "Modo controllo turbina - WF36_CNTRL", "value": "", "um": "AA" },
		"ALR": { "label": "Parametri Combustibile - LHVSEL", "value": "", "um": "A7" },
		"ALS": { "label": "Parametri Combustibile - CP_CV_SEL", "value": "", "um": "AA" },
		"ALT": { "label": "Parametri Combustibile - SGSEL", "value": "", "um": "AA" },
		"ALU": { "label": "Parametri Combustibile -ZGASSEL", "value": "", "um": "AA" },
		"ALV": { "label": "Parametri Combustibile -MFCO2", "value": "", "um": "AA" },
		"ALW": { "label": "Parametri Combustibile -MFN2", "value": "", "um": "AA" },
		"ALX": { "label": "Parametri Combustore - BRNDMD", "value": "", "um": "A8" },
		"ALY": { "label": "Parametri Combustore - BRNREQ", "value": "", "um": "A8" },
		"ALZ": { "label": "Parametri Combustore - TFLAMEPCT", "value": "", "um": "A9" },
		"AL0": { "label": "Parametri Combustore - TFLPDFS", "value": "", "um": "BA" },
		"AL1": { "label": "Parametri Combustore - TFLIDFS", "value": "", "um": "BA" },
		"AL2": { "label": "Parametri Combustore - TFLODFS", "value": "", "um": "BA" },
		"AL3": { "label": "Parametri Combustore - WFQPERRCOR", "value": "", "um": "A9" },
		"AL4": { "label": "Parametri Combustore - PX36SEL", "value": "", "um": "A6" },
		"AL5": { "label": "Parametri Combustore - P_ACSTICJ", "value": "", "um": "A6" },
		"AL6": { "label": "Parametri Combustore - BWFQPERRSP", "value": "", "um": "A6" },
		"AL7": { "label": "Parametri Combustore - LABCINHIB", "value": "", "um": "BB" },
		"AL8": { "label": "Dwb36 Adj-DWB36", "value": "", "um": "BC" },
		"AL9": { "label": "Dwb36 Adj-DWB36MAN", "value": "", "um": "AA" },
		"AMA": { "label": "Parametri di Flusso- DWB36PCT", "value": "", "um": "A9" },
		"AMB": { "label": "Parametri di Flusso- DWB36MAX", "value": "", "um": "BD" },
		"AMC": { "label": "Parametri di Flusso- WB3", "value": "", "um": "BD" },
		"AMD": { "label": "Parametri di Flusso- WB26", "value": "", "um": "BD" },
		"AME": { "label": "Parametri Sistema Fuel - WF36DMD", "value": "", "um": "BE" },
		"AMF": { "label": "Parametri Sistema Fuel - WFMAX", "value": "", "um": "BE" },
		"AMG": { "label": "Parametri Sistema Fuel - WFLBO", "value": "", "um": "BE" },
		"AMH": { "label": "Parametri Sistema Fuel - WFPLTDMD", "value": "", "um": "BE" },
		"AMI": { "label": "Parametri Sistema Fuel - WFPILM", "value": "", "um": "BE" },
		"AMJ": { "label": "Parametri Sistema Fuel - WFINRDMD", "value": "", "um": "BE" },
		"AMK": { "label": "Parametri Sistema Fuel - WFINRM", "value": "", "um": "BE" },
		"AML": { "label": "Parametri Sistema Fuel - WFOTRDMD", "value": "", "um": "BE" },
		"AMM": { "label": "Parametri Sistema Fuel - WFOTRM", "value": "", "um": "BE" },
		"AMN": { "label": "Parametri Sistema Fuel - PLTSEL", "value": "", "um": "AC" },
		"AMO": { "label": "Parametri Sistema Fuel - INRSEL", "value": "", "um": "AC" },
		"AMP": { "label": "Parametri Sistema Fuel - OTRSEL", "value": "", "um": "AC" },
		"AMQ": { "label": "Tflame adj - TFLMAX", "value": "", "um": "BA" },
		"AMR": { "label": "Tflame adj - ABAL (TFLMAX)", "value": "", "um": "BA" },
		"AMS": { "label": "Tflame adj - BIAS (TFLMAX)", "value": "", "um": "BA" },
		"AMT": { "label": "Tflame adj - TFLCYCS", "value": "", "um": "BA" },
		"AMU": { "label": "Tflame adj - BIAS (TFLCYCS)", "value": "", "um": "BA" },
		"AMV": { "label": "Tflame adj - TFLMIN", "value": "", "um": "BA" },
		"AMW": { "label": "Tflame adj - ABAL  (TFLMIN)", "value": "", "um": "BA" },
		"AMX": { "label": "Tflame adj - BIAS  (TFLMIN)", "value": "", "um": "BA" },
		"AMY": { "label": "Trim adj - TFLIREF", "value": "", "um": "BA" },
		"AMZ": { "label": "Trim adj - ABAL (TFLIREF)", "value": "", "um": "BA" },
		"AM0": { "label": "Trim adj - BIAS (TFLIREF)", "value": "", "um": "BA" },
		"AM1": { "label": "Trim adj - TFLOREF", "value": "", "um": "BA" },
		"AM2": { "label": "Trim adj - ABAL (TFLOREF)", "value": "", "um": "BA" },
		"AM3": { "label": "Trim adj - BIAS (TFLOREF)", "value": "", "um": "BA" }
	}]