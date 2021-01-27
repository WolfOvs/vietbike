import React from 'react';
import PropTypes from "prop-types";

import { Tooltip } from '../base';
import { List } from './style';
import ItemLegend from '../ItemLegend';

const ChartTable = ({ itemsTable, dataTable }) => {
	return (
		<div className="dflex">
			<List className="dflex__grow">
				<li className="li-sliders">Misura</li>
				{itemsTable.map((item, index) =>
					<li key={`chart-table-${index}`} className="li-sliders">
						<ItemLegend item={item} />
					</li>
				)}
			</List>
			{dataTable &&
				<div className="dflex overflow_y">
					{dataTable.map((item, index) => {
						const date = new Date(item.value);
						const time = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()} : ${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}	: ${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`;
						const dateSlider = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}/${date.getFullYear()}`;

						return (
							<List key={`chart-table-list-${index}`}>
								<li key={`header-${index}`} className="li-sliders param">
									{`${item.name}(${time})`}
									<div className="tooltip-slider-table">
										<Tooltip content={[dateSlider]} />
									</div>
								</li>
								{itemsTable.map(itemTable => {
									const findIndex = item.listParam.findIndex(el => el.param === itemTable.tag);
									if (findIndex >= 0) {
										const uom = itemsTable.find(el => el.tag === item.listParam[findIndex].param);
										return (
											<li key={`list-data-${item.listParam[findIndex].param}`} className="li-sliders param">{item.listParam[findIndex].value ? `${Number(item.listParam[findIndex].value).toFixed(4)} ${uom && uom.uom}` : ' - '}</li>
										)
									}
									return <li> - </li>
								})}
							</List>
						);
					})}
				</div>
			}
		</div>
	)
};

ChartTable.propTypes = {
	itemsTable: PropTypes.array
};

ChartTable.defaultProps = {
	itemsTable: [
		{
			color: '#000000',
			label: ''
		},
	]
};

export default ChartTable;