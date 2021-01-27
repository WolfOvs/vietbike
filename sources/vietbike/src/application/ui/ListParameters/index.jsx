

import React from 'react';
import PropTypes from "prop-types";

import { ListUL, SubListUL, Value } from './style';
import { Tooltip } from '../base';

const ListParameters = ({ data, keyList, styleParam, isThresholds, actionClick }) => {
	return (
		<ListUL>
			{
				data.map((el, index) => {
					return (
						<React.Fragment key={`${index}-${keyList}`}>
							{getLi(el, index, styleParam, isThresholds, actionClick)}
							{el.children &&
								<SubListUL>
									{el.children.map((children, index) => getLi(children, index, styleParam, isThresholds, actionClick))}
								</SubListUL>
							}
						</React.Fragment>
					);
				})
			}
		</ListUL>
	)
}

const getLi = (el, index, styleParam, isThresholds, actionClick) => {
	return (
		<li
			data-modal={el.tag}
			className={`dflex dflex__center dflex__center--space-between ${styleParam ? styleParam : ''} ${isThresholds ? 'click-threshold' : ''}`}
			key={el.label + index}
			onClick={() => { if (isThresholds) actionClick(el.tag) }}
		>
			<span className="text-uppercase" dangerouslySetInnerHTML={{ __html: el.label }} />
			<span>
				<Value link={el.tooltip ? true : false} className={el.class}>
					{el.value}
					{el.unitOfmeasure &&
						<span className={el.class}>
							{el.unitOfmeasure}
						</span>
					}
					{el.tooltip && <div className="tooltip"><Tooltip title={el.label} content={el.tooltip} /></div>}
				</Value>
			</span>
		</li>
	);
}

ListParameters.propTypes = {
	data: PropTypes.array
};

ListParameters.defaultProps = {
	data: []
};

export default ListParameters;