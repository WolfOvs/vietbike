import styled from 'styled-components';

const WrappereLoading = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	height: ${props => props.type === 'component' ? '100%' : '100vh'};
	opacity: 0.9;
  background-color: ${props => props.theme.colors.blueWhale};
	z-index: ${props => props.theme.zIndex.tooltip};
	@media(max-width: ${props => props.theme.constants.BREAKPOINT_TABLET}px) {
		height: 100%;
	}
`;

export {
	WrappereLoading
}