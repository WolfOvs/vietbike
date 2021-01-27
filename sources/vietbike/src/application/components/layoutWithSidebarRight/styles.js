import styled from 'styled-components';

const WrapperWithSidebar = styled.div`
	height: 100%;
	@media(max-width: ${props => props.theme.constants.BREAKPOINT_MOBILE}px) {
		flex-direction: column;		
	}
`;

const WrapperBody = styled.div`
	position: relative;
	overflow-y: auto;
	overflow-x: hidden;
	flex-grow: 1;
	height: calc(100vh - 96px);
	width: calc(100vw - 220px);
	@media(max-width: ${props => props.theme.constants.BREAKPOINT_MOBILE}px) {
		width: 100%;
    height: 100%;
	}
`;

export {
	WrapperWithSidebar,
	WrapperBody
}