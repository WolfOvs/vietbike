import styled, { css } from 'styled-components';

const InfoCell = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 35px;
	padding: ${props => props.paddingBottom ? '8px 4px' : '6px 4px'};
	border-bottom: 1px solid ${props => props.theme.colors.colorChambray};
	border-left: 1px solid ${props => props.theme.colors.colorChambray};
	border-right: 1px solid ${props => props.theme.colors.colorChambray};
	background-color: ${props => props.theme.colors.colorTarawera};
	${props => props.isActiveClick && css`
		cursor: pointer;
	`};}
  &:last-child {
		border-radius: 0 0 4px 4px;
  }
  @keyframes changeBck {
    from {
			background-color: ${props => props.theme.colors.colorTransparent({ r: 62, g: 183, b: 234, a: 0.1 })};
			box-shadow: inset 0px 0px 0px 1px rgba(255,255,255,0.8);
		}
    to {
			background-color: ${props => props.theme.colors.colorTransparent({ r: 62, g: 183, b: 234, a: 0.3 })};
			box-shadow: inset 0px 0px 0px 1px rgba(255,255,255,0.8);
		}
  }
  &.highlight {
    animation-name: changeBck;
		animation-duration: 4s;
		.highlight {
			box-shadow: none;
		}
	}
	.container-value {
		height: 35px;
		padding: 0px 4px;
		&.pems-alert {
			border-bottom: 1px solid ${props => props.theme.colors.colorTransparent({a: .2})};
		}
	}

	&.pems {
		padding: 0px 8px;
		&:last-of-type {
			border-bottom: 1px solid ${props => props.theme.colors.colorChambray};
			.pems-alert {
				border-bottom: 0;
			}
		}
		border-bottom: 0;
	}

	&.not-trusted {
		border:1px solid ${props => props.theme.colors.white};
		animation: opacity 1s infinite; 
		background-color: ${props => props.theme.colors.colorTransparent({a: .1})};
	}

	&.block {
		border:1px solid ${props => props.theme.colors.persianRed};
		background-color: ${props => props.theme.colors.colorTransparent({r: 255, g: 37, b: 37, a: .1})};
	}

	&.alarm {
		border:1px solid ${props => props.theme.colors.colorDarkOrange};
		background-color: ${props => props.theme.colors.colorTransparent({r: 255, g: 141, b: 0, a: .1})};
	}

	&.pre-alarm {
		border:1px solid ${props => props.theme.colors.colorDandelion};
		background-color: ${props => props.theme.colors.colorTransparent({r: 255, g: 255, b: 108, a: .1})};
	}

	@keyframes opacity {
		0%   { opacity: 0.6; }
		50% { opacity: 0.8; }
		100% { opacity: 1; }
	}
`;



const Title = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.colorTransparent({ a: 0.9 })};
	font-size: .9em;
	margin-bottom: 2px;
	&.alert {
		color: ${props => props.theme.colors.amaranth};
	}
	&.warning {
		color: ${props => props.theme.colors.sunflower};
	}

	img {
		width: 10px;
		height: 10px;
	}

	&.not-trusted {
		color: ${props => props.theme.colors.white};
	}

	&.block {
		color: ${props => props.theme.colors.persianRed};
	}

	&.alarm {
		color: ${props => props.theme.colors.colorDarkOrange};;
	}

	&.workstate {
		color: ${props => props.theme.colors.colorSalmon};
	}

	&.multiAlert {
		color: ${props => props.theme.colors.colorDarkOrange};
	}

	&.pre-alarm {
		color: ${props => props.theme.colors.colorDandelion};;
	}

	&.pems-title {
		font-size: 1.2em;
		span {
			font-size: .8em;
			margin-left: 5px;
			&:
		}
	}
`;

const Tag = styled.div`
	font-size: .9em;
	text-transform: uppercase;
	color: ${props => props.theme.colors.white};
	opacity: .6;
`;

export { InfoCell, Title, Tag }

