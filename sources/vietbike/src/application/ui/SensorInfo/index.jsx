import React from "react";
import PropTypes from "prop-types";

import { InfoCell, Title, Tag } from "./style";
import ProgressBar from "../ProgressBar";
import Icon from './../base/Icon';

const SensorInfo = ({ info, isThresholds, onClick }) => {
	return (
		<div>
			{info.map((row, i) => (
				<InfoCell
					className={row.class}
					key={`infocell-${i}`}
					data-reference-table={row.metadata}
					paddingBottom={row.progressbar}
					data-modal={row.metaTagAcn}
					data-tag-ui={row.metaTagUi}
					onClick={() => { if (isThresholds) onClick(row.metaTagAcn) }}
					isActiveClick={isThresholds}
				>
					{row.progressbar && (
						<ProgressBar
							noPadding
							progress={row.progressbar[0]}
							steps={row.progressbar[1]}
							withAxis={row.progressbar[2] === "axis"}
						/>
					)}
					{row && renderInfo(row)}
				</InfoCell>
			))}
		</div>
	);
};

/**
 * Function o select the right class depend on the limits of a value
 * @param {*} row data of the table line
 */
const getClassColor = row => {
	if (row.limits) {
		let classColor = "";
		row.limits.forEach(l => {
			if (row.value <= l.max && row.value >= l.min) classColor = l.classColor;
		});
		return classColor;
	}
	return '';
};

/**
 * Function to select the right icon (if necessary) to put on the right
 * of the value
 * @param {*} row 
 */
const getClassIcon = row => {
	if (row.limits) {
		let classIcon = "";
		row.limits.forEach(l => {
			if (row.value <= l.max && row.value >= l.min) classIcon = l.classIcon;
		});
		return classIcon;
	}
	return '';
};

const renderInfo = (row) => {
	switch (row.type) {
		case 'pems': {
			return (
				<div>
					{row.value && <Title className='pems-title'>{row.value}{row.scale && <span>({row.scale})</span>}</Title>}
					{row.label && <Tag>{row.label}</Tag>}
				</div>
			);
		}
		case 'alert': {
			return (
				<div className="dflex dflex__center container-value pems-alert">
					<div className="dflex__grow">
						{row.title && <Title>{row.title}</Title>}
					</div>
					<Title className={`dflex__grow text-right ${row.class}`}>{row.value}</Title>
				</div>
			);
		}
		default: {
			return (
				<div className="dflex dflex__center container-value">
					<div className="dflex__grow">
						{row.title && <Title>{row.title}</Title>}
						{row.label && <Tag>{row.label}</Tag>}
					</div>
					<Title className={`dflex__grow text-right ${row.class} ${getClassColor(row)}`}>
						{row.value} {getClassIcon(row) ? <Icon iconKey={getClassIcon(row)} /> : ''}
					</Title>
				</div>
			);
		}
	}
}

SensorInfo.defaultProps = {
	info: [
		{
			title: "Title",
			label: "Label Tag",
			value: "value"
		}
	]
};

SensorInfo.propTypes = {
	info: PropTypes.array
};

export default SensorInfo;
