import styled from 'styled-components';

const IstoChart = styled.div`
text-align: center;

svg {
	overflow: visible !important;

	&:nth-child(1) {
		overflow: hidden;
	}
}

.axis {
	.tick {
		text {
			color: ${props => props.theme.colors.white};
			font-size: 9px;
			font-weight: 500;
		}
		line {
			stroke: ${props => props.theme.colors.colorBlumine};
			stroke-dasharray: 3,1;
		}
	}
	.domain {
		display: none;
	}
}

.simpleLine {
	stroke: ${props => props.theme.colors.colorTransparent({r: 0, g: 76, b: 151, a: 0.3})};
}

.curve, .simpleLine {
	cursor: pointer;
}

.circle {
	pointer-events: none;
}

.popover {
	pointer-events: none;
}

@keyframes changeBckBar {
	from {
		fill: ${props => props.theme.colors.colorTransparent({ r: 255, g: 255, b: 255, a: 0.3 })};
		stroke: ${props => props.theme.colors.colorTransparent({ r: 255, g: 255, b: 255, a: 0.3 })};
	}
	to {
		fill: ${props => props.theme.colors.colorTransparent({ r: 255, g: 255, b: 255, a: 0.5 })};
		stroke: ${props => props.theme.colors.colorTransparent({ r: 255, g: 255, b: 255, a: 0.5 })};
	}
}

.bar {
  &.highlight {
    animation-name: changeBckBar;
		animation-duration: 4s;
	}
}
`;

export {
	IstoChart
}