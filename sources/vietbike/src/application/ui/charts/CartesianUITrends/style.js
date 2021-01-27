import styled from 'styled-components';

const Cartesian = styled.div`
	text-align: center;
	
	.container-svg {
		display: inline-block;
		position: relative;
		width: 100%;
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
				font-size: 11px;
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

	.comments-chart-cartesian {
		display: none;
		margin-top: 32px;
		position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
		.comments-chart-item {
			position: absolute;
			cursor: pointer;
			.comment-points {
				display: flex;
				align-items: center;
				justify-content: center;
				color: white;
				height: 20px;
				width: 20px;
				border: 2px solid ${props => props.theme.colors.white};
				background: ${props => props.theme.colors.colorChambray};
				border-radius: 50%;
			}			
		}
	}

	.tooltip-chart-comments {
		position: absolute;
		transform: translate(-50%, -50%);
		padding: 5px;
		background: ${props => props.theme.colors.colorMidnight};
		border: 1px solid ${props => props.theme.colors.colorTransparent({a:.2})};
		z-index: ${props => props.theme.zIndex.modal};
		border-radius: 4px;
		font-size: 0.9em;
		color: ${props => props.theme.colors.white};
		text-align: left;
		font-size: 1em;
		p {
			margin: 0 0 10px 0;
		}
		&::after {
			content: "";
			position: absolute;
			width: 8px;
			height: 8px;
			background-color: ${props => props.theme.colors.colorMidnight};
			transform: translate(-50%, -50%) rotate(45deg);
			top: 100%;
			left: 50%;
			border-bottom: 1px solid ${props => props.theme.colors.colorTransparent({a:.2})};
			border-right: 1px solid ${props => props.theme.colors.colorTransparent({a:.2})};
		}
	}

	.tooltip-create-comments {
		position: absolute;
		padding: 8px;
		background: ${props => props.theme.colors.colorMidnight};
		border: 1px solid ${props => props.theme.colors.colorTransparent({a: .2})};
		z-index: ${props => props.theme.zIndex.modal};
		border-radius: 4px;
		font-size: 0.9em;
		color: ${props => props.theme.colors.white};
		text-align: left;	
		&::after {
			content: "";
			position: absolute;
			width: 8px;
			height: 8px;
			background-color: ${props => props.theme.colors.colorMidnight};
			transform: translate(-50%, -50%) rotate(45deg);
			top: 10px;
			left: 0;
			border-bottom: 1px solid ${props => props.theme.colors.colorTransparent({a: .2})};
			border-left: 1px solid ${props => props.theme.colors.colorTransparent({a: .2})};
		}
	}

	.title-mode {
		position: absolute;
    top: 8px;
    left: 50%;
		transform: translate(-50%, 0%);
		padding: 0 16px;
    height: 24px;
    border-radius: 4px 4px 0 0;
    background-color: ${props => props.theme.colors.colorSummerSky};
    display: flex;
    align-items: center;
		justify-content: center;
		color: ${props => props.theme.colors.white};
	}

	.slider {
		text {
			fill: #FFFFFF;
			font-size: 10px;
			text-anchor: middle;
		}
		path {
			stroke-dasharray: 3,1;
		}
	}
`;

const Layer = styled.div `
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: ${props => props.theme.zIndex.modal};
`;

export {
	Cartesian,
	Layer
}