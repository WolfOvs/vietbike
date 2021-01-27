import styled from 'styled-components';

const WrapperBoxThresholds = styled.div`
	position: relative;
	padding: 20px 16px;
	max-height: 500px;
	overflow-y: auto;
	overflow-x: hidden;
	& > div {
		margin-bottom: 16px;
		&:last-of-type {
			margin-bottom: 0;
		}
	}
`

const ErrorMessage = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 32px;
	border-radius: 0 0 3px 3px;
	font-size: 1.2em;
	color: ${props => props.theme.colors.white};
	background-color: ${props => props.theme.colors.persianRed};
`;

export {
	WrapperBoxThresholds,
	ErrorMessage
}