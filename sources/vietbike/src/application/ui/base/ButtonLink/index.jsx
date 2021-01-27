import React from 'react';
import PropTypes from "prop-types";

import { ButtonStyle } from './style';
import Icon from '../Icon';

const ButtonLink = ({ action, text, tooltip, icon, padding, sizeIcon }) => (
	<ButtonStyle onClick={action} padding={padding}>
		{text}
		{icon && <Icon className="icon-button" iconKey={icon} size={sizeIcon} />}
		{tooltip && <div className="tooltip">{tooltip}</div>}
	</ButtonStyle>
);

ButtonLink.propTypes = {
	action: PropTypes.func,
	text: PropTypes.string,
	tooltip: PropTypes.string,
	icon: PropTypes.string,
	padding: PropTypes.string,
	sizeIcon: PropTypes.number
};

ButtonLink.defaultProps = {
	action: () => { },
	text: '',
	tooltip: '',
	icon: '',
	padding: '0 0 8px 0',
	sizeIcon: 10,
};

export default ButtonLink;