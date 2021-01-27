import styled from 'styled-components';

const WrapperContent = styled.ul`
	li {
		border-top: 1px solid ${props => props.colorBorder};
		border-left: 1px solid ${props => props.colorBorder};
		background: ${props => props.bgColor};
		cursor: pointer;
		&:first-child {
			border-top: none;
		}
		a {
			height: 40px;
			align-items: center;
			display: flex;
			width: 100%;
			color: ${props => props.theme.colors.paleGrey};
			font-size: 1em;
			text-transform: uppercase;
			padding: ${props => props.padding};
			&.active {
				position: relative;
				&:before {
					content: '';
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					width: 2px;
					background: ${props => props.theme.colors.softBlue};
				}
			}
		}
	}
`;

export {
	WrapperContent
}
