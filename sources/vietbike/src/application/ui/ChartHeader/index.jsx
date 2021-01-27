import React from 'react';
import PropTypes from "prop-types";

import { Icon, TooltipMenu } from '../base';
import { ChartHeaderWrapper, Label, Input, Row, Value, ActionButton } from "./style";

const ChartHeader = ({ values, actionBar, classStyle }) => {

	return (
		<ChartHeaderWrapper className={classStyle}>
			<Row>
				<Label>Dati dal</Label>
				<Input>{values.dateFrom}</Input>

				<Label>al</Label>
				<Input>{values.dateTo}</Input>

				{actionBar &&
					actionBar.map(el => {
						return (
							<ActionButton key={el.label} onClick={el.onAction}>
								{el.tooltipMenu &&
									<div className="tooltip-chart-header">
										<TooltipMenu content={el.tooltipMenu} />
									</div>
								}
								<Icon iconKey={el.icon} size={10} />
								<span>
									{el.label}
								</span>
							</ActionButton>
						);
					})
				}
			</Row>
			{
				values.AsseX && values.AsseY &&
				<Row>
					<Label>Asse X</Label>
					<Value>{values.AsseX}</Value>

					<Label>Asse Y</Label>
					<Value>{values.AsseY}</Value>
				</Row>
			}
		</ChartHeaderWrapper>
	);
};

ChartHeader.propTypes = {
	values: PropTypes.object,
	actionBar: PropTypes.array,
	classStyle: PropTypes.string
};

ChartHeader.defaultProps = {
	values: {
		dateFrom: new Date(),
		dateTo: new Date()
	},
	actionBar: null,
	classStyle: ''
};


export default ChartHeader;