import styled from 'styled-components';

const ButtonStyle = styled.button`
	display: flex;
	align-items: center;
	cursor: pointer;
	font-size: 0.9em;
	color: ${props => props.theme.colors.white};
	border: none;
	white-space: nowrap;
  background-color: transparent;
	border-radius: 4px;
	padding: ${props => props.padding};
	font-weight: 500;
	.tooltip {
		display: none;
		width: 100%;
		height: 100%;
	}
	.icon-button {
		margin-left: 5px;
	}
	&:hover {
		.tooltip {
			display: block;
		}
	}
	&:last-of-type {
		padding: 0;
	}
`;

export {
	ButtonStyle,
};