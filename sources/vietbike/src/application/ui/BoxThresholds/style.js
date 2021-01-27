import styled, { css } from 'styled-components';

const Box = styled.div`
@keyframes mymove {
	0% {border: solid 2px ${props => props.theme.colors.white};}
  100% { border: solid 2px ${props => props.theme.colors.colorChambray};}
}
	border-radius: 4px;
  border: solid 2px ${props => props.theme.colors.colorChambray};
	background-color: ${props => props.theme.colors.colorTarawera};
	${props => props.focus && css`
	animation: mymove 5s;
	`}
	
`

const Header = styled.div`
	height: 27px;
	background: ${props => props.theme.colors.colorChambray};
  font-size: 1.2em;
  font-weight: 500;
  text-transform: uppercase;
	color: ${props => props.theme.colors.white};
	padding: 0 16px;
`

const ContainerBody = styled.div`
	padding: 16px;
	.container-column {
		@media(max-width: ${props => props.theme.constants.BREAKPOINT_TABLET}px) {
			flex-direction: column;
		}
	}
	.column {
		flex: 1;
		.border-right {
			border-right: 1px solid ${props => props.theme.colors.colorTransparent({ a: 0.2 })};
		}
		.border-left {
			border-left: 1px solid ${props => props.theme.colors.colorTransparent({ a: 0.2 })};
		}
	}
	.column-xs {
		flex-basis: 10%;
		@media(max-width: ${props => props.theme.constants.BREAKPOINT_TABLET}px) {
			display: none;
		}
	}
	p {
		font-size: 1.2em;
		font-weight: normal;
		text-align: center;
		color: ${props => props.theme.colors.colorPoloBlue};
		margin-bottom: 9px;
		margin-top: 0;
	}
	.arrow {
		flex-grow: 0;
		width: 0;
		height: 0;
		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
		border-left: 10px solid ${props => props.theme.colors.colorTransparent({ a: 0.2 })};
		&.left {
			transform: rotate(180deg);
		}
	}
	.line {
		flex-grow: 1;
		border: 1px dashed ${props => props.theme.colors.colorTransparent({ a: 0.2 })};
		height: 0px;
	}
	.container-accordion {
		padding: 10px 0;
	}
	textarea {
		display: block;
		padding: 12px 8px;
		resize: none;
		width: 100%;
		height: 100px;
    border-radius: 4px;
    border: solid 1px ${props => props.theme.colors.colorTransparent({ r: 255, g: 255, b: 255, a: 0.2 })};
		background-color: ${props => props.theme.colors.colorMidnight};
		font-size: 1.2em;
		line-height: 1.42;
		color: ${props => props.theme.colors.white};

		&:disabled {
			opacity: 0.7;
		}
	}
`;

const ContainerThresholds = styled.div`
	@media(max-width: ${props => props.theme.constants.BREAKPOINT_TABLET}px) {
		flex-direction: column;
		.arrow {
			&.left {
				transform: rotate(-90deg);
			}
			transform: rotate(90deg);
		}
	}	
	padding: 16px 0;
	flex-wrap: wrap;
	& > div {
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 20%;
		position:relative;
		@media(max-width: ${props => props.theme.constants.BREAKPOINT_TABLET}px) {
			width: auto;
			padding-right: 15px;
			padding-bottom: 10px;
		}
	}
	label {
		display: block;
		font-size: 1em;
		font-weight: 500;
		color: ${props => props.theme.colors.white};
		margin-bottom: 5px;
		@media(max-width: ${props => props.theme.constants.BREAKPOINT_TABLET}px) {
			text-align: right;
		}
	}
	input {
		padding: 0 25px 0 8px;
		height: 42px;
		border-radius: 4px;
		background-color: ${props => props.theme.colors.colorMidnight};
		font-weight: 500;
		font-size: 1em;
		color: ${props => props.theme.colors.white};
		&.left {
			margin-left: 20px;
		}
		&.right {
			margin-right: 20px;
		}
		+ span {
			display:none;
		}

		&:not(:placeholder-shown) {
			+ span {
				display:block;
				position: absolute;
				right: 5px;
				top: 47px;
				color: #fff;
			}
		}

		&:disabled {
			opacity: 0.7;
		}

		&.not-trusted {
			border: solid 1px ${props => props.theme.colors.white};
		}
		&.block {
			border: solid 1px ${props => props.theme.colors.colorRedOrange};
		}
		&.alarm {
			border: solid 1px ${props => props.theme.colors.colorDarkOrange};
		}
		&.warning {
			border: solid 1px ${props => props.theme.colors.colorDandelion};
		}
		&::placeholder {
			font-style: italic;
		}
	}

	.container-arrow {
		@media(max-width: ${props => props.theme.constants.BREAKPOINT_TABLET}px) {
			flex-direction: column;
			position: absolute;
			right: 0;
			top: 0;
			height: 100%;
			margin-bottom: 0;
		}
		margin-bottom: 5px;
		position: relative;
		height: 10px;
		.bool {
			width: 8px;
			height: 8px;
			background-color: white;
			border-radius: 8px;
		}
		&.not-trusted {
			.arrow {
				border-left: 10px solid ${props => props.theme.colors.white};
			}
			.line {
				border: 1px solid ${props => props.theme.colors.white};
			}
			.bool {
				background-color: ${props => props.theme.colors.white};
			}
		}
		&.block {
			.arrow {
				border-left: 10px solid ${props => props.theme.colors.colorRedOrange};
			}
			.line {
				border: solid 1px ${props => props.theme.colors.colorRedOrange};
			}
			.bool {
				background-color: ${props => props.theme.colors.colorRedOrange};
			}
		}
		&.alarm {
			.arrow {
				border-left: 10px solid ${props => props.theme.colors.colorDarkOrange};
			}
			.line {
				border: solid 1px ${props => props.theme.colors.colorDarkOrange};
			}
			.bool {
				background-color: ${props => props.theme.colors.colorDarkOrange};
			}
		}
		&.warning {
			.arrow {
				border-left: 10px solid ${props => props.theme.colors.colorDandelion};
			}
			.line {
				border: solid 1px ${props => props.theme.colors.colorDandelion};
			}
			.bool {
				background-color: ${props => props.theme.colors.colorDandelion};
			}
		}
	}
`;

const FooterWrap = styled.div`
	height: 68px;
	justify-content: center;
	border-top: solid 1px ${props => props.theme.colors.colorChambray};
`;

const ErrorMessage = styled.div`
	color: red;
	font-weight:bold;
	margin-bottom:10px;
`;

const BoxStatus = styled.div`
	${props => {
		switch(props.status){
			case 'success':
				return css`background-color: ${props => props.theme.colors.active}`;
			case 'failed':
				return css`background-color: ${props => props.theme.colors.persianRed}`;
			default:
				return css`background-color: transparent`;
		}
	}}

	&.fail {
		background-color: ${props => props.theme.colors.persianRed};
	}
	background-color: ${props => props.theme.colors.active};
	height: 32px;
	border-radius: 0 0 3px 3px;
	font-size: 1.2em;
	color: ${props => props.theme.colors.white};
	.cancel {
		background-color:transparent;
   	border:none;
		cursor: pointer;
		position: relative;
		width: 14px;
		height: 14px;
		padding: 0;
		&:before, &:after {
			position: absolute;
			left: 7px;
			top: 0;
			content: ' ';
			height: 14px;
			width: 2px;
			background-color: ${props => props.theme.colors.white};;
		}
		&:before {
			transform: rotate(45deg);
		}
		&:after {
			transform: rotate(-45deg);
		}
	}
`;

export {
	Header,
	Box,
	ContainerBody,
	ContainerThresholds,
	FooterWrap,
	BoxStatus,
	ErrorMessage
}