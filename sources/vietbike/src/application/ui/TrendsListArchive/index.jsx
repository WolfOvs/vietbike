import React from 'react';

import { Input } from '../base';
import ChartHeader from '../ChartHeader';
import { WrapperList, Item } from './style';

const TrendsListArchive = (props) => {

	const { trends } = props;

	return (
		<div className="padding-left-16 padding-right-16 padding-top-32 padding-bottom-32">
			<div className="dflex margin-bottom-16">
				<Input
				/>
			</div>
			<WrapperList>
				{trends && trends.map(trend => (
					<Item className="dflex">
						<div className="title">{trend.name}</div>
						<div className="detail">
							<ChartHeader
								values={{
									dateFrom: trend.dateFrom,
									dateTo: trend.dateTo
								}}
							/>
						</div>
					</Item>
				))}
			</WrapperList>
		</div>
	)
}

export default TrendsListArchive;