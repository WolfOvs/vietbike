import React from 'react';
import PropTypes from "prop-types";

import { CustomRadio } from './style';

const Radio = (props) => {

	const { id, name, checked, onClick, className } = props;

	return (
		<CustomRadio
			type="radio"
			className={className}
			id={id}
			name={name}
			checked={checked}
			onChange={onClick}
		/>
	);
}


Radio.propTypes = {
	id: PropTypes.number, 
	name: PropTypes.string, 
	checked: PropTypes.bool, 
	onClick: PropTypes.func,
	className: PropTypes.string
};

Radio.defaultProps = {
	id: '', 
	name: '', 
	checked: false, 
	onClick: () => {},
	className: ''
};

export default Radio;