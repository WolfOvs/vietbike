import React from 'react';
import PropTypes from "prop-types";

import { CustomCheckbox } from './style';

const Checkbox = (props) => {

	const { id, name, defaultChecked, onClick, className } = props;

	return (
		<CustomCheckbox
			type="checkbox"
			className={className}
			id={id}
			name={name}
			defaultChecked={defaultChecked}
			onClick={onClick}
		/>
	);
}


Checkbox.propTypes = {
	id: PropTypes.string, 
	name: PropTypes.string, 
	defaultChecked: PropTypes.bool, 
	onClick: PropTypes.func,
	className: PropTypes.string
};

Checkbox.defaultProps = {
	id: '', 
	name: '', 
	defaultChecked: false, 
	onClick: () => {},
	className: ''
};

export default Checkbox;