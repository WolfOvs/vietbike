import React from "react";
import PropTypes from "prop-types";

import CardTable from "./../CardTable";
import SensorInfo from "./../SensorInfo";
import { WrapperTablesChart } from './style';

const TablePems = ({ data, isThresholds, changeOpenModal }) => {
	return (
		<WrapperTablesChart className="dflex padding-left-16 padding-top-32 padding-right-16">
			{data.map((el, index) => {
				return (
					<div className="masonry-with-columns" key={`${el.title}-container-${index}`}>
						{el.map((info, i) => (
							<div className="item-masonry" key={`${info.title}-${i}`} >
								<CardTable title={info.title}>
									<SensorInfo info={info.info} isThresholds={isThresholds} onClick={changeOpenModal} />
								</CardTable>
							</div>
						))}
					</div>
				)
			})}
		</WrapperTablesChart>
	);
}

TablePems.defaultProps = {
	data: []
};

TablePems.propTypes = {
	data: PropTypes.array
};

export default TablePems;