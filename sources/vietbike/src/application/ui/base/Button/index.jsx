import React from 'react';
import PropTypes from "prop-types";

import { ButtonStyle } from './style';
import Icon from '../Icon';

const Button = ({ action, text, tooltip, icon, height, width, padding, sizeIcon, shake, className }) => {
	return (
	<ButtonStyle onClick={action} height={height} width={width} padding={padding} className={className}>
		{text}
		{icon && <Icon className={shake ? 'icon-button shake' : 'icon-button'} iconKey={icon} size={sizeIcon} />}
		{tooltip && <div className="tooltip">{tooltip}</div>}
	</ButtonStyle>
	);
};

Button.propTypes = {
	action: PropTypes.func,
	text: PropTypes.string,
	tooltip: PropTypes.string,
	icon: PropTypes.string,
	height: PropTypes.string,
	width: PropTypes.string,
	padding: PropTypes.string,
	sizeIcon: PropTypes.number,
	className: PropTypes.string
};

Button.defaultProps = {
	action: () => { },
	text: '',
	tooltip: '',
	icon: '',
	height: '32px',
	width: '60px',
	padding: '0 16px',
	sizeIcon: 16,
	className: ''
};

export default Button;