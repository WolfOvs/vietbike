import styled from 'styled-components';

const MenuSidebarContainer = styled.ul`
	li {
		position: relative;
		background: ${props => props.theme.colors.colorBlueOpaque};
		border-top: 1px solid ${props => props.theme.colors.colorBlueLight};
		border-left: 1px solid ${props => props.theme.colors.colorBlueLight};
		cursor: pointer;
		color: ${props => props.theme.colors.white};
		text-transform: uppercase;
		padding: 0 16px;
		a {
			height: 39px;
			color: ${props => props.theme.colors.white};
			font-size: .9em;
			font-weight: 500;
		}
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
		.arrow-rotate {
			img {
				transform: rotate(-90deg);
			}
		}
	}
`;

export { 
	MenuSidebarContainer 
};