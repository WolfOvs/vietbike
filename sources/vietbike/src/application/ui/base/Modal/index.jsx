import React from 'react';
import PropTypes from "prop-types";

import {  Icon, Toggle } from '../../base';
import { 
	ModalWindow, 
	Header, 
	BodyModal, 
	Title, 
	ButtonWrapper, 
	SubtitleMap, 
	SubtitleNotification,
	Footer,
	Cancel,
	Confirm,
	Text,
	OptionsWrapper,
	RadioWrapper,
	Label,
	ErrorText
} from './style';
import { Radio } from '../../base';

const Modal = ({ showModal, onClose, filters, toggleAction, setLimiti, setLimitiAction, changesetLimiti, maxWidth, cancel, confirm, confirmLimits, confirmLimitsAction }) => {

	const [checkOption, setCheckOption] = React.useState(null);

	React.useEffect(()=>{
		if(confirmLimits) {
			if(confirmLimits.status === 'OK') {
				onClose();
			}
		}
	}, [confirmLimits])


	const limitiOptions = [{
			id: 1,
			name: "limit rejection",
			value: "Limite suggerito non corretto",
			checked: false,
			action: (i) => {setCheckOption(i); confirmLimitsAction({}); setLimitiAction(false);}
		},
		{
			id: 2,
			name: "limit rejection",
			value: "Dati insufficienti alla valutazione",
			checked: false,
			action: (i) => {setCheckOption(i); confirmLimitsAction({}); setLimitiAction(false);}
		},
		{
			id: 3,
			name: "limit rejection",
			value: "Valutazione da effettuare successivamente",
			checked: false,
			action: (i) => {setCheckOption(i); confirmLimitsAction({}); setLimitiAction(false);}
		}
	];

	

	const getTime = (time) => {
		if(time) {
			var week = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
			var month = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

			let dd = time.split("-")[0].padStart(2, "0");
			let mm = time.split("-")[1].padStart(2, "0");
			let yyyy = time.split("-")[2].split(" ")[0];
			let hh = time.split("-")[2].split(" ")[1].split(":")[0].padStart(2, "0");
			let mi = time.split("-")[2].split(" ")[1].split(":")[1].padStart(2, "0");
			let secs = time.split("-")[2].split(" ")[1].split(":")[2].padStart(2, "0");
		
			mm = (parseInt(mm) - 1).toString(); // January is 0
		
			const date = new Date(yyyy, mm, dd, hh, mi, secs); 
			var dateFormatted =  week[date.getDay()] + ', ' + date.getDate() + ' ' + month[date.getMonth()] + ' ' +  date.getFullYear() + ' ' + date.getHours() + ':' + (date.getUTCMinutes().toString().length <= 1 ? '0' : '') + date.getUTCMinutes();
			return dateFormatted;
		}
	  }

	  const rejectLimit = () => {
		setLimiti.note = limitiOptions[checkOption].value;
		changesetLimiti(setLimiti);
		setLimitiAction(true);
		if(confirmLimits.status === 'OK'){
			setCheckOption(null);
			onClose();
		}else {
			setCheckOption(null);
		}
	  }

	  const closeLimitsModal = () => {
		setCheckOption(null);
		confirmLimitsAction({});
		onClose();
	  }


	return (
	<ModalWindow maxWidth={maxWidth} className={`${showModal && 'show'}`}>
		{filters && <div className="modal">
			<Header>
				<div></div>
				<Title>Aggiungi filtri</Title>
				<div className="dflex dflex__center">
					<ButtonWrapper onClick={onClose}>
						<Icon iconKey={'closeX'} size={30} />
					</ButtonWrapper>
				</div>
			</Header>
			<BodyModal>
				<SubtitleMap >Mappa</SubtitleMap>
				{
					filters.map.map((item) => {
						return (
							<Toggle
								key={item.name}
								toggleTitle={item.name}
								toggleValue={item.value}
								toggleChange={toggleAction}
								type={'map'}
							/>
						);
					})
				}
				<SubtitleNotification>Notification Center</SubtitleNotification>
				{
					filters.notifications.map((item) => {
						return (
							<Toggle
								key={item.name}
								toggleTitle={item.name}
								toggleValue={item.value}
								toggleChange={toggleAction}
								type={'notifications'}
							/>
						);
					})
				}
				<Footer>
					<Cancel onClick={() => cancel(filters)}>Cancella filtri</Cancel>
					<Confirm onClick={() => confirm(filters)}>Mostra dashboard aggiornata</Confirm>
				</Footer>
			</BodyModal>
		</div>}

		{setLimiti && <div className="modal">
			<Header>
				<div></div>
				<Title>Rifiuta limite consigliato</Title>
				<div className="dflex dflex__center">
					<ButtonWrapper onClick={() => {closeLimitsModal();}}>
						<Icon iconKey={'closeX'} size={30} />
					</ButtonWrapper>
				</div>
			</Header>
			<BodyModal>
			{setLimiti.name && <Text>Punto di riduzione {setLimiti.name.toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase()).replace(/(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$|^\d/g, x => x.toUpperCase()) + ' ' + setLimiti.cabin  + ' - ' + getTime(setLimiti.date)}</Text>}
			<OptionsWrapper>
				<SubtitleMap>Seleziona motivo del rifiuto </SubtitleMap>
				{
					limitiOptions.map((item, index) => {
						return(
							<RadioWrapper className="dflex dflex__center" key={index}>
								<Radio 
									id={item.id}
									name={item.name}
									checked={checkOption === index.toString()}
									onClick={() => {item.action(index.toString());}} />
								<Label>{item.value}</Label>
							</RadioWrapper>
						);
					})
				}
			</OptionsWrapper>
			{(confirmLimits.status === 'KO' && confirmLimits.id === setLimiti.id) && <ErrorText>Non è stato possibile rifiutare il limite, si prega di riprovare</ErrorText>}
			<Footer>
				<Confirm onClick={() => {closeLimitsModal();}}>Annulla</Confirm>
				<Confirm disabled={!checkOption} onClick={() => {rejectLimit();}}>Conferma</Confirm>
			</Footer>
			</BodyModal>
		</div>}		
	</ModalWindow>
	);
};

Modal.propTypes = {
	showModal: PropTypes.bool,
	onClose: PropTypes.func,
	maxWidth: PropTypes.string
};

Modal.defaultProps = {
	showModal: false,
	onClose: () => { },
	maxWidth: '95%'
};

export default Modal;