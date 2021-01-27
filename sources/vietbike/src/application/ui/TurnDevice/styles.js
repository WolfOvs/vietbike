import styled from 'styled-components';

const TurnDeviseWrapper = styled.div`
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: ${props => props.theme.colors.darkishBlue};
`;

export { 
	TurnDeviseWrapper
}