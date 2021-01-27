import styled from 'styled-components';

const CustomCheckbox = styled.input`
	width: 20px;
	height: 20px;
	position: relative;
	cursor: pointer;
	border-radius: 4px;
	border: 2px solid ${props => props.theme.colors.colorCeruleanBlue};
	appearance: none;

	&:checked {
		background-image: linear-gradient(to right,#1295d4 0%,#11a0c4 20%,#0cce83 100%);
		border: none;
	}

	&:checked:after {
		content: '✔';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: ${props => props.theme.colors.white};
		font-size: 14px;
	}
`;

export {
	CustomCheckbox
}