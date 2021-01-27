import styled from 'styled-components';

const Label = styled.div`
	position: relative;
	display: flex;
  align-items: center;
	background-color: ${props => props.theme.colors.colorChambray};
	color: ${props => props.theme.colors.white};
	cursor: pointer;
	height: 40px;
	padding: 0 8px;
	margin: 0;
	font-size: .9em;
	font-weight: 500;
	text-transform: uppercase;
	&:hover {
		.tooltip {
			width: 170px;
			display: block;
			position: absolute;
			bottom: 100%;
			left: 50%;
			transform: translate(-50%, 0);
			margin-bottom: 10px;
		}
	}
	.tooltip {
		display: none;
	}
`;

const Value = styled.div`
	display: flex;
  align-items: center;
	color: ${props => props.theme.colors.white};
	height: 22px;
	padding: 8px;
	margin: 0;
	font-size: .9em;
	font-weight: 500;
	text-transform: uppercase;
`;

export {
	Label, 
	Value
};