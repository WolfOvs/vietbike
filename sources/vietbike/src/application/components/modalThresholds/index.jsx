import React from 'react';
import PropTypes from "prop-types";

import {
	Modal,
	BoxThresholds
} from "../../ui";
import { getUomByTag } from '../../../utils';
import { WrapperBoxThresholds, ErrorMessage } from './style';

const ModalThresholds = ({ showModal, closeModal, searchTag, thresholds, onSave, statusResponse, resetResponseApi, userRole, labels, typeTag }) => {

	const [thresholdsData, changeThresholdsData] = React.useState([]);
	const [lablesThresholds, changeLabelsThresholds] = React.useState([]);

	const boxTag = document.getElementById(searchTag);
	const wrapBox = document.getElementById('wrapper-box');

	React.useEffect(() => {
		if (JSON.stringify(thresholds) !== JSON.stringify(thresholdsData)) {
			changeThresholdsData(thresholds);
		}
	}, [thresholds, thresholdsData]);

	React.useEffect(() => {
		if (JSON.stringify(labels) !== JSON.stringify(lablesThresholds)) {
			changeLabelsThresholds(labels);
		}
	}, [labels, lablesThresholds]);

	React.useEffect(() => {
		if (searchTag && wrapBox && boxTag) {
			wrapBox.scrollTo({
				top: boxTag.offsetTop - wrapBox.offsetTop - 16,
				behavior: 'smooth'
			});
		}
	}, [searchTag, boxTag, wrapBox]);

	const renderThresholdsBox = (thresholdsData) => {
		const findIndex = thresholdsData.findIndex(threshold => threshold.tag === searchTag);
		switch (true) {
			case findIndex < 0:
				return <ErrorMessage className="dflex dflex__center dflex__center--space-cente">Dato su cui non è possibile impostare le soglie</ErrorMessage>;
			case findIndex >= 0:
				return thresholdsData.map(threshold => {
					const label = lablesThresholds.find(el => el.tagAcn === threshold.tag) || { labelTooltip: '', uom: '', tagCliente: '', tagVendor: '' };
					const uom = getUomByTag(label.uom);
					return (
						<BoxThresholds
							key={threshold.tag}
							focus={threshold.tag === searchTag}
							data={threshold}
							label={label.labelTrend}
							labelTag={label[typeTag]}
							text={'Aggiorna'}
							action={onSave}
							status={statusResponse}
							uom={uom}
							userRole={userRole}
						/>
					);
				})
			default:
				return null;
		}
	}

	return (
		<Modal
			showModal={showModal}
			classStyle={'modal-thresholds'}
			title={'Gestione Soglie'}
			onClose={() => {
				resetResponseApi();
				closeModal(false)
			}}
		>
			<WrapperBoxThresholds id={'wrapper-box'}>
				{thresholdsData && renderThresholdsBox(thresholdsData)}
			</WrapperBoxThresholds>
		</Modal>
	)
}

ModalThresholds.propTypes = {
	showModal: PropTypes.bool,
	closeModal: PropTypes.func,
	searchTag: PropTypes.string,
	thresholds: PropTypes.array,
	onSave: PropTypes.func,
	statusResponse: PropTypes.object,
	resetResponseApi: PropTypes.func,
	userRole: PropTypes.string,
	labels: PropTypes.array,
	typeTag: PropTypes.string
};

ModalThresholds.defaultProps = {
	showModal: false,
	closeModal: () => { },
	searchTag: null,
	thresholds: [],
	onSave: () => { },
	statusResponse: null,
	resetResponseApi: () => { },
	userRole: null,
	labels: [],
	typeTag: 'tagCliente'
};

export default ModalThresholds;