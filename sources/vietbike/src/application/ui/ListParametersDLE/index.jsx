

import React from 'react';
import PropTypes from "prop-types";

import { ListUL, SubListUL, Value } from './style';

const ListParameters = ({ data, keyList }) => {
	return(
		<ListUL>
		{
			data.map((el, index) => {
				return (
					<React.Fragment key={`${index}-${keyList}`}>
						{getLi(el, index)}
						{el.children &&
							<SubListUL>
								{el.children.map((children, index) => getLi(children, index, true))}
							</SubListUL> 
						}
					</React.Fragment>
				);
			})
		}
		</ListUL>
	)
}

const getLi = (el, index, subList) => (
	<li
		className={`dflex dflex__center dflex__center--space-between`}
		key={el.label + index}
	>
		<span className={`text-uppercase ${subList && 'sublist'}`} dangerouslySetInnerHTML={{__html: el.label}}/>
		<span>
			<Value>
				{el.value}
				{el.unitOfmeasure &&
					<span>
						{el.unitOfmeasure}
					</span>
				}
			</Value>
		</span>
	</li>
);

ListParameters.propTypes = { 
	data: PropTypes.array
};

ListParameters.defaultProps = {
	data: []
};

export default ListParameters;