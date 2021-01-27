import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { CartesianUI2, WrapperTables, Loading, LabelWorkPoint } from "../../../ui";

import { isEqualToObject, getUomByTag, getValueByTag } from "./../../../../utils";

function CurvesChart(props) {

	const { idSelector, data, curves, configureTable, workPointers, isThresholds, changeOpenModal } = props;

	if (configureTable && workPointers && curves) {

		const valuesY = curves.map(el => el.values.map(el => el.y));
		let maxValuesY = valuesY.map(element => Math.max(...element));
		const maxValueY = Math.max(...maxValuesY);
		let minValuesY = valuesY.map(element => Math.min(...element));
		const minDomainY = Math.min(...minValuesY);

		const valuesX = curves.map(el => el.values.map(el => el.x));
		let maxValuesX = valuesX.map(element => Math.max(...element));
		const maxValueX = Math.max(...maxValuesX);
		let minValuesX = valuesX.map(element => Math.min(...element));
		const minDomainX = Math.min(...minValuesX);

		const xLabel = `Q [${data[workPointers[0].tagValue] && getUomByTag(data[workPointers[0].tagValue].U)}]`;
		const yLabel = `H [${data[workPointers[1].tagValue] && getUomByTag(data[workPointers[1].tagValue].U)}]`;
		const xUnit = data[workPointers[0].tagValue] && getUomByTag(data[workPointers[0].tagValue].U)
		const yUnit = data[workPointers[1].tagValue] && getUomByTag(data[workPointers[1].tagValue].U)

		const xPoint = getValueByTag(data, workPointers[0].tagValue);
		const yPoint = getValueByTag(data, workPointers[1].tagValue);
		const scaleX = xPoint > maxValueX ? xPoint / maxValueX : 1;
		const scaleY = yPoint > maxValueY ? yPoint / maxValueY : 1;
		let maxDomainX = maxValueX;
		let maxDomainY = maxValueY;
		if (scaleX !== 1 && scaleY !== 1) {
			if (scaleX > scaleY) {
				maxDomainY = maxDomainY * scaleX
			} else {
				maxDomainY = maxDomainY * scaleY;
			}
		}

		return (
			<React.Fragment>
				<CartesianUI2
					idSelector={idSelector}
					data={curves}
					width={600}
					height={400}
					xDomain={[minDomainX - 1, maxDomainX + 1]}
					yDomain={[minDomainY - 1, maxDomainY + 1]}
					xLabel={xLabel}
					yLabel={yLabel}
					xUnit={xUnit}
					yUnit={yUnit}
					xWorkPoint={workPointers && getValueByTag(data, workPointers[0].tagValue)}
					yWorkPoint={workPointers && getValueByTag(data, workPointers[1].tagValue)}
					margin={{ top: 52, right: 35, bottom: 20, left: 20 }}
				/>
				<LabelWorkPoint workPointer={workPointers}/>
				<WrapperTables
					data={configureTable}
					isThresholds={isThresholds} 
					changeOpenModal={changeOpenModal}
				/>
			</React.Fragment>
		);
	}
	return <Loading />;
}

// const pointIsRed = ({ x, y }) => {
// 	if (y > x * 0.177999 - 1.83517) return false;
// 	if (y < Math.pow(x, 2) * 0.00183) return false;
// 	return true;
// }

CurvesChart.defaultProps = {
	idSelector: 'text-chart',
	data: {},
	turbochargerId: null,
	activeTab: 'coce1',
	labels: null,
	curves: [],
};

CurvesChart.propTypes = {
	idSelector: PropTypes.string,
	data: PropTypes.object,
	turbochargerId: PropTypes.string,
	activeTab: PropTypes.string,
	curves: PropTypes.array,
	labels: PropTypes.object,
};


export default withRouter(
	React.memo(CurvesChart, (prevProps, nextProps) =>
		isEqualToObject(prevProps, nextProps)
	)
);
