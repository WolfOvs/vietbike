import styled from 'styled-components';

const CustomInput = styled.input`
	width: 100%;
	min-width: 200px;
	height: ${props => props.height}px;
	background-color: ${props => props.theme.colors.colorMidnight};
	border: 1px solid ${props => {
		if(props.errorInput) {
			return props.theme.colors.persianRed;
		}else {
			return props.theme.colors.white;
		}
	}};
	border-radius: 5px;
	font-size: 1em;
	color: ${props => props.theme.colors.white};	
	padding: 5px;
	&::placeholder {
		opacity: 0.5;
		font-size: 1em;
		font-style: italic;
	}
	${props => props.isLogin && `
		background-color: ${props.theme.colors.white};
		border: 1px solid #BABABA;
		border-radius: 0px;
		margin-bottom: 8px;
		height: 28px;
		padding: 4px 3px 0px 3px;
		font-size: 16px;
		width: 342px;
		color: ${props.theme.colors.black};
		border-radius: 2px;
		&::placeholder {
			color: #424949;
			font-style: normal;
		}
		&:focus {
			border: 2px solid ${props.theme.colors.black};
			border-radius: 2px;
			padding: 3px 2px 0px 2px;
		}
  `}
`;


export {
	CustomInput
}