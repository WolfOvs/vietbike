import React from 'react';
import PropTypes from "prop-types";

import { WrapperBreadcrumb, TresholdLayer } from './styles';

const BreadcrumbWithActionBar = ({ children, showNotification, showTreshold }) => {

	const [isShowNotification, changeIsShowNotification] = React.useState(showNotification.show);
	const [layerTimeout, changelayerTimeout] = React.useState(null);

	React.useEffect(() => {
		if (showNotification.show) {
			changeIsShowNotification(showNotification.show);
			let tmp = setTimeout(() => {
				changeIsShowNotification(false);
				showNotification.resetNotifications();
			}, 200);
			changelayerTimeout(tmp);
		}
		return (() => {
			if (layerTimeout) {
				clearTimeout(layerTimeout);
			}
		});
	}, [showNotification, layerTimeout, changelayerTimeout]);

	return (
		<React.Fragment>
			<WrapperBreadcrumb className="dflex dflex__center dflex__center--space-between">
				{children}
			</WrapperBreadcrumb>
			{isShowNotification &&
				<TresholdLayer type={showNotification.type}>{showNotification.message}</TresholdLayer>
			}
			{showTreshold.show &&
				<TresholdLayer>{showTreshold.message}</TresholdLayer>
			}
		</React.Fragment>
	);
}

BreadcrumbWithActionBar.propTypes = {
	showNotification: PropTypes.object,
	showTreshold: PropTypes.object
};

BreadcrumbWithActionBar.defaultProps = {
	showNotification: { show: false, message: '', type: null },
	showTreshold: { show: false, message: '' }
}

export default BreadcrumbWithActionBar;