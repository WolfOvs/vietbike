import React from 'react';
import PropTypes from "prop-types";

import { 
	WrapperLabel, 
	Pointer,
	Label,
	Value,
	Tag
} from './style';

const LabelWorkPoint = ({workPointer, padding}) => (
	<WrapperLabel className="dflex" padding={padding}>
		{workPointer && workPointer.map((point, index) => (
			<Pointer key={`${point.tag}-${index}`} className="dflex dflex__center dflex__center--space-between">
			<div>
				<div><Label>{point.label}</Label><Value>{point.title}</Value></div>
				<Tag>{point.tag}</Tag>
			</div>
			<Value>{point.value}</Value>
		</Pointer>
		))}
	</WrapperLabel>
);

LabelWorkPoint.propTypes = { 
	workPointer: PropTypes.array,
	padding: PropTypes.string
};

LabelWorkPoint.defaultProps = {
	workPointer: [
		{ label: '', title: '', tag: 'Label tag', value: '' },
		{ label: '', title: '', tag: 'label tag', value: '' }
	],
	padding: '32px 16px'
};

export default LabelWorkPoint;