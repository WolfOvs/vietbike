import React from 'react';

import {
	Column,
	Header,
	Body
} from './style';

const TrendsSelectTag = (props) => {
	const { title, children } = props;

	return (
		<Column>
			<Header>{title}</Header>
			<Body>
				{children}
			</Body>
		</Column>
	)
}

export default TrendsSelectTag;