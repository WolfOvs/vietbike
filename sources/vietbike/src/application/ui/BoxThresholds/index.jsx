import React from 'react';
import PropTypes from "prop-types";

import { Header, Box, ContainerBody, ContainerThresholds, FooterWrap, BoxStatus } from './style';
import Accordion from '../Accordion';
import { Button } from '../base';
import { isEqualToObject } from '../Utils';

const BoxThresholds = ({ data, text, action, focus, status, uom, userRole, label, labelTag }) => {
	const disabled = userRole === 'admin' ? false : true;

	const [showButton, changeShowButton] = React.useState(false);
	const [comments, changeComments] = React.useState('');
	const [valid, changeValid] = React.useState(null);
	const [activeStatus, changeActiveStatus] = React.useState(false);

	const refThreshold1 = React.useRef(null);
	const refThreshold2 = React.useRef(null);
	const refThreshold3 = React.useRef(null);
	const refThreshold4 = React.useRef(null);
	const refThreshold5 = React.useRef(null);
	const refThreshold6 = React.useRef(null);
	const refThreshold7 = React.useRef(null);
	const refThreshold8 = React.useRef(null);

	React.useEffect(() => {
		refThreshold1.current.value = data.threshold1 || '';
		refThreshold2.current.value = data.threshold2 || '';
		refThreshold3.current.value = data.threshold3 || '';
		refThreshold4.current.value = data.threshold4 || '';
		refThreshold5.current.value = data.threshold5 || '';
		refThreshold6.current.value = data.threshold6 || '';
		refThreshold7.current.value = data.threshold7 || '';
		refThreshold8.current.value = data.threshold8 || '';
		changeComments(data.comment || '')
	}, [data]);

	React.useEffect(() => {
		if (status) {
			changeActiveStatus(status.tag === data.tag);
			setTimeout(() => changeActiveStatus(false), 1000);
		}
	}, [status, data])

	const validate = () => {

		if (refThreshold1.current.value !== '') {
			if (refThreshold2.current.value !== '' && Number(refThreshold1.current.value) >= Number(refThreshold2.current.value))
				return false;
			if (refThreshold3.current.value !== '' && Number(refThreshold1.current.value) >= Number(refThreshold3.current.value))
				return false
			if (refThreshold4.current.value !== '' && Number(refThreshold1.current.value) >= Number(refThreshold4.current.value))
				return false;
			if (refThreshold5.current.value !== '' && Number(refThreshold1.current.value) >= Number(refThreshold5.current.value))
				return false;
			if (refThreshold6.current.value !== '' && Number(refThreshold1.current.value) >= Number(refThreshold6.current.value))
				return false;
			if (refThreshold7.current.value !== '' && Number(refThreshold1.current.value) >= Number(refThreshold7.current.value))
				return false;
			if (refThreshold8.current.value !== '' && Number(refThreshold1.current.value) >= Number(refThreshold8.current.value))
				return false;
		}

		if (refThreshold2.current.value !== '') {
			if (refThreshold1.current.value !== '' && Number(refThreshold2.current.value) <= Number(refThreshold1.current.value))
				return false;
			if (refThreshold3.current.value !== '' && Number(refThreshold2.current.value) >= Number(refThreshold3.current.value))
				return false;
			if (refThreshold4.current.value !== '' && Number(refThreshold2.current.value) >= Number(refThreshold4.current.value))
				return false;
			if (refThreshold5.current.value !== '' && Number(refThreshold2.current.value) >= Number(refThreshold5.current.value))
				return false;
			if (refThreshold6.current.value !== '' && Number(refThreshold2.current.value) >= Number(refThreshold6.current.value))
				return false;
			if (refThreshold7.current.value !== '' && Number(refThreshold2.current.value) >= Number(refThreshold7.current.value))
				return false;
			if (refThreshold8.current.value !== '' && Number(refThreshold2.current.value) >= Number(refThreshold8.current.value))
				return false;
		}

		if (refThreshold3.current.value !== '') {
			if (refThreshold2.current.value !== '' && Number(refThreshold3.current.value) <= Number(refThreshold2.current.value))
				return false;
			if (refThreshold1.current.value !== '' && Number(refThreshold3.current.value) <= Number(refThreshold1.current.value))
				return false;
			if (refThreshold4.current.value !== '' && Number(refThreshold3.current.value) >= Number(refThreshold4.current.value))
				return false;
			if (refThreshold5.current.value !== '' && Number(refThreshold3.current.value) >= Number(refThreshold5.current.value))
				return false;
			if (refThreshold6.current.value !== '' && Number(refThreshold3.current.value) >= Number(refThreshold6.current.value))
				return false;
			if (refThreshold7.current.value !== '' && Number(refThreshold3.current.value) >= Number(refThreshold7.current.value))
				return false;
			if (refThreshold8.current.value !== '' && Number(refThreshold3.current.value) >= Number(refThreshold8.current.value))
				return false;
		}

		if (refThreshold4.current.value !== '') {
			if (refThreshold3.current.value !== '' && Number(refThreshold4.current.value) <= Number(refThreshold3.current.value))
				return false;
			if (refThreshold2.current.value !== '' && Number(refThreshold4.current.value) <= Number(refThreshold2.current.value))
				return false;
			if (refThreshold1.current.value !== '' && Number(refThreshold4.current.value) <= Number(refThreshold1.current.value))
				return false;
			if (refThreshold5.current.value !== '' && Number(refThreshold4.current.value) >= Number(refThreshold5.current.value))
				return false;
			if (refThreshold6.current.value !== '' && Number(refThreshold4.current.value) >= Number(refThreshold6.current.value))
				return false;
			if (refThreshold7.current.value !== '' && Number(refThreshold4.current.value) >= Number(refThreshold7.current.value))
				return false;
			if (refThreshold8.current.value !== '' && Number(refThreshold4.current.value) >= Number(refThreshold8.current.value))
				return false;
		}

		if (refThreshold5.current.value !== '') {
			if (refThreshold4.current.value !== '' && Number(refThreshold5.current.value) <= Number(refThreshold4.current.value))
				return false;
			if (refThreshold3.current.value !== '' && Number(refThreshold5.current.value) <= Number(refThreshold3.current.value))
				return false;
			if (refThreshold2.current.value !== '' && Number(refThreshold5.current.value) <= Number(refThreshold2.current.value))
				return false;
			if (refThreshold1.current.value !== '' && Number(refThreshold5.current.value) <= Number(refThreshold1.current.value))
				return false;
			if (refThreshold6.current.value !== '' && Number(refThreshold5.current.value) >= Number(refThreshold6.current.value))
				return false;
			if (refThreshold7.current.value !== '' && Number(refThreshold5.current.value) >= Number(refThreshold7.current.value))
				return false;
			if (refThreshold8.current.value !== '' && Number(refThreshold5.current.value) >= Number(refThreshold8.current.value))
				return false;
		}

		if (refThreshold6.current.value !== '') {
			if (refThreshold5.current.value !== '' && Number(refThreshold6.current.value) <= Number(refThreshold5.current.value))
				return false;
			if (refThreshold4.current.value !== '' && Number(refThreshold6.current.value) <= Number(refThreshold4.current.value))
				return false;
			if (refThreshold3.current.value !== '' && Number(refThreshold6.current.value) <= Number(refThreshold3.current.value))
				return false;
			if (refThreshold2.current.value !== '' && Number(refThreshold6.current.value) <= Number(refThreshold2.current.value))
				return false;
			if (refThreshold1.current.value !== '' && Number(refThreshold6.current.value) <= Number(refThreshold1.current.value))
				return false;
			if (refThreshold7.current.value !== '' && Number(refThreshold6.current.value) >= Number(refThreshold7.current.value))
				return false;
			if (refThreshold8.current.value !== '' && Number(refThreshold6.current.value) >= Number(refThreshold8.current.value))
				return false;
		}

		if (refThreshold7.current.value !== '') {
			if (refThreshold6.current.value !== '' && Number(refThreshold7.current.value) <= Number(refThreshold6.current.value))
				return false;
			if (refThreshold5.current.value !== '' && Number(refThreshold7.current.value) <= Number(refThreshold5.current.value))
				return false;
			if (refThreshold4.current.value !== '' && Number(refThreshold7.current.value) <= Number(refThreshold4.current.value))
				return false;
			if (refThreshold3.current.value !== '' && Number(refThreshold7.current.value) <= Number(refThreshold3.current.value))
				return false;
			if (refThreshold2.current.value !== '' && Number(refThreshold7.current.value) <= Number(refThreshold2.current.value))
				return false;
			if (refThreshold1.current.value !== '' && Number(refThreshold7.current.value) <= Number(refThreshold1.current.value))
				return false;
			if (refThreshold8.current.value !== '' && Number(refThreshold7.current.value) >= Number(refThreshold8.current.value))
				return false;
		}

		if (refThreshold8.current.value !== '') {
			if (refThreshold7.current.value !== '' && Number(refThreshold8.current.value) <= Number(refThreshold7.current.value))
				return false;
			if (refThreshold6.current.value !== '' && Number(refThreshold8.current.value) <= Number(refThreshold6.current.value))
				return false;
			if (refThreshold5.current.value !== '' && Number(refThreshold8.current.value) <= Number(refThreshold5.current.value))
				return false;
			if (refThreshold4.current.value !== '' && Number(refThreshold8.current.value) <= Number(refThreshold4.current.value))
				return false;
			if (refThreshold3.current.value !== '' && Number(refThreshold8.current.value) <= Number(refThreshold3.current.value))
				return false;
			if (refThreshold2.current.value !== '' && Number(refThreshold8.current.value) <= Number(refThreshold2.current.value))
				return false;
			if (refThreshold1.current.value !== '' && Number(refThreshold8.current.value) <= Number(refThreshold1.current.value))
				return false;
		}

		return true;
	}

	const saveThreshold = () => {
		const threshold = { ...data };
		changeValid(validate())
		if (validate()) {
			threshold.threshold1 = refThreshold1.current.value === '' ? null : refThreshold1.current.value;
			threshold.threshold2 = refThreshold2.current.value === '' ? null : refThreshold2.current.value;
			threshold.threshold3 = refThreshold3.current.value === '' ? null : refThreshold3.current.value;
			threshold.threshold4 = refThreshold4.current.value === '' ? null : refThreshold4.current.value;
			threshold.threshold5 = refThreshold5.current.value === '' ? null : refThreshold5.current.value;
			threshold.threshold6 = refThreshold6.current.value === '' ? null : refThreshold6.current.value;
			threshold.threshold7 = refThreshold7.current.value === '' ? null : refThreshold7.current.value;
			threshold.threshold8 = refThreshold8.current.value === '' ? null : refThreshold8.current.value;
			threshold.comment = comments;
			action(threshold);
		}
	}

	const showButtonSubmit = () => {
		if (!showButton) {
			changeShowButton(true);
		}
		if (!valid) {
			changeValid(true);
		}
		if (activeStatus) {
			changeActiveStatus(false);
		}
	}

	return (
		<Box focus={focus} id={data.tag}>
			<Header className="dflex dflex__center dflex__center--space-between">
				<p>{label}</p>
				<p>{labelTag}</p>
			</Header>
			<ContainerBody>
				<div className="dflex dflex__wrap container-column">
					<div className="column">
						<p>Soglie Basse</p>
						<div className="dflex dflex__center border-right">
							<div className="arrow left"></div>
							<div className="line"></div>
						</div>
						<ContainerThresholds className="dflex dflex__center--space-between">
							<div>
								<label className="text-right">Non Attendibile</label>
								<div className="dflex dflex__center container-arrow not-trusted">
									<div className="arrow left"></div>
									<div className="line"></div>
									<div className="bool"></div>
								</div>
								<input
									disabled={disabled}
									type="text"
									className="margin-left-20 not-trusted"
									name="threshold1"
									ref={refThreshold1}
									placeholder={`${uom}`}
									onKeyDown={showButtonSubmit}
								/>
								<span>{uom}</span>
							</div>
							<div>
								<label className="text-right">Blocco</label>
								<div className="dflex dflex__center container-arrow block">
									<div className="line"></div>
									<div className="bool"></div>
								</div>
								<input
									disabled={disabled}
									type="text"
									className="margin-left-20 block"
									name="threshold2"
									ref={refThreshold2}
									placeholder={`${uom}`}
									onKeyDown={showButtonSubmit}
								/>
								<span>{uom}</span>
							</div>
							<div>
								<label className="text-right">Allarme</label>
								<div className="dflex dflex__center container-arrow alarm">
									<div className="line"></div>
									<div className="bool"></div>
								</div>
								<input
									disabled={disabled}
									type="text"
									className="margin-left-20 alarm"
									name="threshold3"
									ref={refThreshold3}
									placeholder={`${uom}`}
									onKeyDown={showButtonSubmit}
								/>
								<span>{uom}</span>
							</div>
							<div>
								<label className="text-right">Preallarme</label>
								<div className="dflex dflex__center container-arrow warning">
									<div className="line"></div>
									<div className="bool"></div>
								</div>
								<input
									disabled={disabled}
									className="margin-left-20 warning"
									name="threshold4"
									ref={refThreshold4}
									placeholder={`${uom}`}
									onKeyDown={showButtonSubmit}
								/>
								<span>{uom}</span>
							</div>
						</ContainerThresholds>
					</div>
					<div className="column-xs">
						<div className="line margin-top-73" />
					</div>
					<div className="column">
						<p>Soglie Alte</p>
						<div className="dflex dflex__center border-left">
							<div className="line"></div>
							<div className="arrow"></div>
						</div>
						<ContainerThresholds className="dflex dflex__center--space-between">
							<div>
								<label>Preallarme</label>
								<div className="dflex dflex__center container-arrow warning">
									<div className="bool"></div>
									<div className="line"></div>
								</div>
								<input
									disabled={disabled}
									type="text"
									className="margin-right-20 warning"
									name="threshold5"
									ref={refThreshold5}
									placeholder={`${uom}`}
									onKeyDown={showButtonSubmit}
								/>
								<span className="margin-right-25">{uom}</span>
							</div>
							<div>
								<label>Allarme</label>
								<div className="dflex dflex__center container-arrow alarm">
									<div className="bool"></div>
									<div className="line"></div>
								</div>
								<input
									disabled={disabled}
									type="text"
									className="margin-right-20 alarm"
									name="threshold6"
									ref={refThreshold6}
									placeholder={`${uom}`}
									onKeyDown={showButtonSubmit}
								/>
								<span  className="margin-right-25">{uom}</span>
							</div>
							<div>
								<label>Blocco</label>
								<div className="dflex dflex__center container-arrow block">
									<div className="bool"></div>
									<div className="line"></div>
								</div>
								<input
									disabled={disabled}
									type="text"
									className="margin-right-20 block"
									name="threshold7"
									ref={refThreshold7}
									placeholder={`${uom}`}
									onKeyDown={showButtonSubmit}
								/>
								<span  className="margin-right-25">{uom}</span>
							</div>
							<div>
								<label>Non Attendibile</label>
								<div className="dflex dflex__center container-arrow not-trusted">
									<div className="bool"></div>
									<div className="line"></div>
									<div className="arrow"></div>
								</div>
								<input
									disabled={disabled}
									type="text"
									className="margin-right-20 not-trusted"
									name="threshold8"
									ref={refThreshold8}
									placeholder={`${uom}`}
									onKeyDown={showButtonSubmit}
								/>
								<span  className="margin-right-25">{uom}</span>
							</div>
						</ContainerThresholds>
					</div>
				</div>
				<Accordion
					title={'Visualizza o Aggiungi Commenti'}
					iconTitle={data.comment ? { key: 'iconaCommentiPallino', size: 22 } : { key: 'iconaCommenti', size: 16 }}
					typeStyle={'accordion-grey'}
					iconAccordion={'arrowDown'}
					isOpen={false}
				>
					<div className="dflex container-accordion">
						<textarea
							name="comment"
							disabled={disabled}
							value={comments}
							onChange={e => changeComments(e.target.value)}
							onKeyDown={showButtonSubmit}
						/>
					</div>
				</Accordion>
			</ContainerBody>
			{showButton &&
				<FooterWrap className="dflex dflex__center">
					<Button action={saveThreshold} text={text} height={'42px'} padding={'0 8px'} />
				</FooterWrap>
			}
			{activeStatus && status &&
				<BoxStatus
					className="dflex dflex__center dflex__center--space-center"
					status={status.data.status === 200 ? 'success' : 'failed'}
				>
					{status.data.status === 200 ? 'Modifica aggiornata correttamenete' : 'Errore'}
				</BoxStatus>
			}
			{valid === false &&
				<BoxStatus
					className="dflex dflex__center dflex__center--space-center fail"
				>
					I valori delle soglie devono essere progressivi
				</BoxStatus>
			}
		</Box>
	)
}


BoxThresholds.propTypes = {
	data: PropTypes.object,
	text: PropTypes.string,
	action: PropTypes.func,
	focus: PropTypes.bool,
	status: PropTypes.object,
	uom: PropTypes.string,
	userRole: PropTypes.string,
	label: PropTypes.string, 
	labelTag: PropTypes.string
};

BoxThresholds.defaultProps = {
	data: null,
	text: '',
	action: () => { },
	focus: false,
	status: null,
	uom: '',
	userRole: null,
	label: '', 
	labelTag: ''
}

export default React.memo(BoxThresholds, (prevProps, nextProps) => isEqualToObject(prevProps, nextProps))