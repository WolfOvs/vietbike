import styled from 'styled-components';

const SelectUI = styled.div`
	display: block;
	position: relative;
	min-width: 140px;
	.value {
		padding: 0 25px 0 5px;
		position: relative;
		border-radius: 4px;
		border: solid 1px ${props => props.colorBorder};
		background-color: ${props => props.bgSelect};
		height: 28px;
		cursor: pointer;
		font-size: 1em;
		font-weight: 500;
		text-transform: uppercase;
		color: ${props => props.theme.colors.white}
		.icon-select{
			position: absolute;
			top: 10px;
			right: 8px;
			width: 6px;
			height: 6px;
			transform: rotate(45deg);
			:after {
				content: '';
				display: block;
				top: 50%;
				right: 0;
				border-right: 1px solid ${props => props.theme.colors.white};
				border-bottom: 1px solid ${props => props.theme.colors.white};
				width: 6px;
				height: 6px;
			}
		}
		&.open {
			border-radius:  4px 4px 0 0;
			.icon-select {
				top: 12px;
				transform: rotate(-134deg);
			}
		}
		&:hover {
			background-color: ${props => props.theme.colors.colorSummerSky};
		}
	}

	.layer {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: ${props => props.theme.zIndex.modal};
	}

	.container-option {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: ${props => props.theme.zIndex.modal};
		li {
			font-size: 1em;
			font-weight: 500;
			height: 28px;
			color: ${props => props.theme.colors.white}
			cursor: pointer;
			padding: 0 5px;
			border-bottom: solid 1px ${props => props.theme.colors.white};
			border-right: solid 1px ${props => props.theme.colors.white};
			border-left: solid 1px ${props => props.theme.colors.white};
			background-color: ${props => props.theme.colors.colorMidnight};
			text-transform: uppercase;
			&:last-of-type {
				border-radius: 0 0 4px 4px;
			}
			&:first-of-type {
				border-top: solid 1px ${props => props.theme.colors.white};
				border-radius: 4px 4px 0 0;
			}
			&:hover {
				background-color: ${props => props.theme.colors.colorSummerSky};
			}
			&.active {
				background-color: ${props => props.theme.colors.colorWedgewood};
			}
		}
	}
`

SelectUI.defaultProps = {
	bgSelect: props => props.theme.colors.colorMidnight,
	colorBorder: props => props.theme.colors.colorTransparent({ a: 0.2 })
}

export { SelectUI };