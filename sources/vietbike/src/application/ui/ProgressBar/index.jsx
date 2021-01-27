import React from "react";
import PropTypes from "prop-types";

import {
	ProgressBarUI,
	Progress,
	WrapperProgressBar,
	StepItem,
	BarrettineContainer,
	StepBarrettina,
	ContainerSteps
} from "./style";

const ProgressBar = ({ progress, steps, noPadding, withAxis }) => {
	let progr = 0;
	if (steps) {
		if (withAxis) {
			progr = (progress * 100) / (steps[steps.length - 1] - steps[0]);
		} else {
			progr = ((progress - steps[0]) * 100) / (steps[steps.length - 1] - steps[0]);
		}
	}
	return (
		<WrapperProgressBar noPadding={noPadding}>
			<ProgressBarUI withAxis={withAxis}>
				<Progress width={progr} withAxis={withAxis} />
			</ProgressBarUI>
			<div>
				<BarrettineContainer className="dflex">
					{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((el, index) => (
						<StepBarrettina key={`barContainer - ${index}`} />
					))}
				</BarrettineContainer>
				{!withAxis && (
					<ContainerSteps>
						{steps && steps.map((step, index) => (
							<StepItem key={`step - ${index}`} left={((step - steps[0]) * 100) / (steps[steps.length - 1] - steps[0])}>
								<div>{step}</div>
							</StepItem>
						))}
					</ContainerSteps>
				)}
				{withAxis && (
					<ContainerSteps>
						{steps && steps.map((step, index) => (
							<StepItem key={`step - ${index}`} left={50 + ((step * 100) / (steps[steps.length - 1] - steps[0]))}>
								<div>{step}</div>
							</StepItem>
						))}
					</ContainerSteps>
				)}
			</div>
		</WrapperProgressBar>
	);
}

ProgressBar.defaultProps = {
	progress: 0,
	steps: null,
	withAxis: false
};

ProgressBar.propTypes = {
	progress: PropTypes.number,
	steps: PropTypes.array,
	withAxis: PropTypes.bool
};

export default ProgressBar;
