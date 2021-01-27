import React from 'react';
import PropTypes from "prop-types";

import { SelectUI } from './style';

const Select = ({ options, valueActive, onChange, bgSelect, colorBorder }) => {
	const [toggle, changeToggle] = React.useState(false);
	const [optionSelected, changeoptionSelected] = React.useState(valueActive);

	React.useEffect(() => {
		const val = options.find(el => el.key === valueActive);
		if (val) {
			changeoptionSelected(val);
		}
	}, [valueActive, options]);

	return (
		<SelectUI
			className="select-ui"
			bgSelect={bgSelect}
			colorBorder={colorBorder}
		>
			<div
				className={`value dflex dflex__center ${toggle ? 'open' : ''}`}
				onClick={() => changeToggle(!toggle)}
			>
				{optionSelected && optionSelected.value}
				<span className="icon-select" />
			</div>
			{toggle &&
				<React.Fragment>
					<div className="layer" onClick={() => changeToggle(false)}/>
					<ul className="container-option">
						{options && options.map(option =>
							<li
								key={option.key}
								className={`dflex dflex__center ${option.key === optionSelected.key ? 'active' : ''}`}
								onClick={() => {
									changeoptionSelected(option);
									changeToggle(!toggle);
									onChange(option.key);
								}}
							>
								{option.value}
							</li>
						)}
					</ul>
				</React.Fragment>
			}
		</SelectUI>
	)
}

Select.propTypes = {
	options: PropTypes.array,
	valueActive: PropTypes.string,
	bgSelect: PropTypes.string,
	colorBorder: PropTypes.string
};

Select.defaultProps = {
	options: [],
	valueActive: '',
	bgSelect: '#223045',
	colorBorder: 'rgba(255, 255, 255, 0.2)'
};

export default Select;