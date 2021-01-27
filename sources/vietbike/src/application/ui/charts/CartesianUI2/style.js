import styled from 'styled-components';

const Cartesian = styled.div`
	text-align: center;

	.container-svg {
		display: inline-block;
		position: relative;
	}
	
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

	.circle {
		pointer-events: none;
	}

	.popover {
		pointer-events: none;
	}
	
	/* Style the lines by removing the fill and applying a stroke */
	.line {
		fill: none;
		stroke-width: 2;
		cursor: pointer;
	}
	.line-hover {
		fill: none;
		stroke: transparent;
		stroke-width: 10;
		cursor: pointer;
	}
`;

export {
	Cartesian
}