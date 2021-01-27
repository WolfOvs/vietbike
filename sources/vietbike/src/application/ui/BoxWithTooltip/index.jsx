import React from 'react';

import { Label, Value } from './styles';

const BoxWithtooltip = ({ label, value, tooltip }) => (
	<div>
		<Label>
			{label}		
			<div className="tooltip">{tooltip}</div>
		</Label>
		<Value>{value}</Value>
	</div>
);

export default BoxWithtooltip;