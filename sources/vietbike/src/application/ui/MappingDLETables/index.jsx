import React from 'react';
import PropTypes from "prop-types";

import CardTable from '../CardTable';
import ListParametersDLE from '../ListParametersDLE';
import { Wrapper } from './style';

const getCards = (column) => {
	return column.map(item => (
		<CardTable 
			title={item.title}
			key={item.title}
		>
			<ListParametersDLE data={item.data} keyList={item.title} styleParam={item.title === "CEMS" && 'style-grey'}/>
		</CardTable>
	))
}
	

const renderColumn = (column) => (
	<div className="dflex__grow dflex--same-width">{getCards(column)}</div>
)

const MappingDLETables = ({ column1, column2, column3, column4 }) => {
	return (
		<Wrapper className="dflex">
			<div className="dflex dflex__row">
				{column1 && renderColumn(column1)}
				{column2 && renderColumn(column2)}
				{column3 && renderColumn(column3)}
				{column4 && renderColumn(column4)}
			</div>
		</Wrapper>
	);
}

MappingDLETables.propTypes = { 
	column1: PropTypes.array,
	column2: PropTypes.array, 
	column3: PropTypes.array, 
	column4: PropTypes.array
};

MappingDLETables.defaultProps = {
	column1: null,
	column2: null, 
	column3: null, 
	column4: null
};

export default MappingDLETables;