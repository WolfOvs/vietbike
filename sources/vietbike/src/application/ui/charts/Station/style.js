import styled from 'styled-components';

const Station = styled.div`
	position: relative;
	height: 100%;
	@media(max-width: ${props => props.theme.constants.BREAKPOINT_MOBILE}px) {
		width: 100%;
		height: auto;
	}
`;

export {
  Station
}