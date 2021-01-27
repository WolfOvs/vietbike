import styled from 'styled-components';

const TooltipStyle = styled.div`
	position: absolute;
	left: 0;
	top: -2px;
	transform: translate(0, -100%);
	background: ${props => props.theme.colors.colorMidnight};
	border: 1px solid ${props => props.theme.colors.colorTransparent({ a: .2 })};
	z-index: ${props => props.theme.zIndex.modal};
	border-radius: 4px;
	font-size: 0.9em;
	color: ${props => props.theme.colors.white};
	text-align: left;
	font-size: 1em;
	&::after {
		content: "";
		position: absolute;
		width: 8px;
		height: 8px;
		background-color: ${props => props.theme.colors.colorMidnight};
		transform: translate(-50%, -50%) rotate(45deg);
		top: 100%;
		left: 50%;
		border-bottom: 1px solid ${props => props.theme.colors.colorTransparent({ a: .2 })};
		border-right: 1px solid ${props => props.theme.colors.colorTransparent({ a: .2 })};
	}
	ul {
		padding: 8px;
		li {
			padding: 0 5px;
			font-size: .9em;
			font-weight: 500;
			color: ${props => props.theme.colors.white};
			margin-bottom: 5px;
			&:last-of-type {
				margin-bottom: 0;
			}
			&:first-of-type {
				border-top: none;
			}
			img {
				margin-left:5px;
			}
		}
	}
`;

const HeaderTooltip = styled.div`
	background-color: ${props => props.theme.colors.colorBlueOpaque};
	padding: 8px;
	font-size: .9em;
	line-height: 1.22;
	text-transform: uppercase;
	color: ${props => props.theme.colors.white};
	border-radius: 4px 4px 0 0;
	text-align: left;
`

export {
	TooltipStyle,
	HeaderTooltip
};