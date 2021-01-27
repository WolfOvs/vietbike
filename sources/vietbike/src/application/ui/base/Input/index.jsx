import React from 'react';
import PropTypes from "prop-types";

import { CustomInput } from './style';

const Input = (props) => {

	const { type, id, name, placeholder, onChange, className, height, value, readOnly, error, isLogin } = props;
	
	const [valueInput, changeValueInput] = React.useState(value);

	return (
		<CustomInput
			type={type}
			id={id}
			name={name}
			className={className}
			height={height}
			placeholder={placeholder}
			value={valueInput}
			onChange={e => {
				changeValueInput(e.target.value);
				onChange(e);
			}}
			readOnly={readOnly}
			errorInput={error}
			isLogin={isLogin}
		/>

	);
}

Input.propTypes = {
	type: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	height: PropTypes.number,
	value: PropTypes.string,
	readOnly: PropTypes.bool,
	error: PropTypes.bool,
	isLogin: PropTypes.bool,
	required: PropTypes.bool
};

Input.defaultProps = {
	type: 'text',
	id: '',
	name: '',
	placeholder: '',
	onChange: () => { },
	height: 30,
	value: '',
	readOnly: false,
	error: false,
	isLogin: false,
	required: false
};

export default Input;